import { useEffect, useState } from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'

import { platformConfig } from './config/platform'
import { createWorkspaceRepository } from './infrastructure/workspace-repository'

const workspaceRepository = createWorkspaceRepository()

const navigation = [
  { to: '/', label: 'Visão geral' },
  { to: '/bancada', label: 'Bancada' },
  { to: '/operacoes', label: 'Operações' },
]

const metrics = [
  { label: 'Artes em produção', value: '—', detail: 'Conecte sua fonte de dados' },
  { label: 'Aprovações pendentes', value: '—', detail: 'Fluxo pronto para integrar' },
  { label: 'Modelos ativos', value: '10', detail: 'Catálogo inicial disponível' },
]

function Dashboard() {
  const [workspaceName, setWorkspaceName] = useState('Carregando workspace…')
  const [connectionState, setConnectionState] = useState('Verificando dados')

  useEffect(() => {
    workspaceRepository
      .getActiveWorkspace()
      .then((workspace) => {
        setWorkspaceName(workspace.name)
        setConnectionState(
          platformConfig.apiBaseUrl ? 'API corporativa conectada' : 'Modo local',
        )
      })
      .catch(() => {
        setWorkspaceName('Workspace indisponível')
        setConnectionState('Verifique a conexão da API')
      })
  }, [])

  return (
    <section className="page-content">
      <div className="page-heading">
        <div>
          <p className="kicker">{connectionState}</p>
          <h1>Controle de arte, molde e produção em um só lugar.</h1>
          <p className="page-lead">
            Workspace atual: <strong>{workspaceName}</strong>. Uma base preparada
            para operar localmente hoje e se conectar à sua plataforma
            corporativa quando necessário.
          </p>
        </div>
        <NavLink className="button button--primary" to="/bancada">
          Abrir bancada <span aria-hidden="true">→</span>
        </NavLink>
      </div>

      <div className="metrics-grid">
        {metrics.map((metric) => (
          <article className="metric-card" key={metric.label}>
            <p>{metric.label}</p>
            <strong>{metric.value}</strong>
            <span>{metric.detail}</span>
          </article>
        ))}
      </div>

      <section className="feature-panel">
        <div>
          <p className="kicker">Pronto para integração</p>
          <h2>Uma transição segura do protótipo para a operação corporativa.</h2>
        </div>
        <ul className="readiness-list">
          <li>
            <span>01</span>
            <div>
              <strong>Dados portáveis</strong>
              <p>Contratos de workspace independentes de banco ou nuvem.</p>
            </div>
          </li>
          <li>
            <span>02</span>
            <div>
              <strong>Implantação flexível</strong>
              <p>Configuração por ambiente para API e armazenamento corporativos.</p>
            </div>
          </li>
          <li>
            <span>03</span>
            <div>
              <strong>Fluxo operacional</strong>
              <p>Base para aprovações, auditoria e integração com produção.</p>
            </div>
          </li>
        </ul>
      </section>
    </section>
  )
}

function Workstation() {
  return (
    <section className="workstation-page">
      <div className="workstation-heading">
        <div>
          <p className="kicker">Produção</p>
          <h1>Bancada de Estampas</h1>
        </div>
        <p>Prepare a arte, confira o molde e exporte o arquivo para produção.</p>
      </div>
      <iframe
        className="workstation"
        src="/bancada-de-estampas.html"
        title="Bancada de Estampas"
      />
    </section>
  )
}

function Operations() {
  return (
    <section className="page-content">
      <div className="page-heading page-heading--compact">
        <div>
          <p className="kicker">Em preparação</p>
          <h1>Operações corporativas.</h1>
          <p className="page-lead">
            Esta área receberá fila de produção, aprovações, histórico de
            alterações e integrações com ERP, CRM ou sistemas internos.
          </p>
        </div>
      </div>
      <div className="empty-state">
        <span aria-hidden="true">◌</span>
        <h2>Conecte a sua fonte de dados</h2>
        <p>
          Defina <code>VITE_API_BASE_URL</code> para usar a API incluída nesta
          base ou o endpoint corporativo da sua organização.
        </p>
      </div>
    </section>
  )
}

export default function App() {
  const environmentLabel = platformConfig.apiBaseUrl
    ? 'API corporativa'
    : 'Ambiente local'

  return (
    <div className="application-shell">
      <header className="app-header">
        <NavLink className="app-brand" to="/">
          <span className="brand-mark" aria-hidden="true" />
          <span>
            <strong>Estampa</strong>
            <small>operations</small>
          </span>
        </NavLink>

        <nav aria-label="Navegação principal">
          {navigation.map((item) => (
            <NavLink
              className={({ isActive }) =>
                isActive ? 'nav-item nav-item--active' : 'nav-item'
              }
              key={item.to}
              to={item.to}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="app-status">
          <i aria-hidden="true" />
          {environmentLabel}
        </div>
      </header>

      <Routes>
        <Route element={<Dashboard />} path="/" />
        <Route element={<Workstation />} path="/bancada" />
        <Route element={<Operations />} path="/operacoes" />
        <Route element={<Dashboard />} path="*" />
      </Routes>
    </div>
  )
}
