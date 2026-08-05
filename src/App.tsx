import { NavLink, Route, Routes } from 'react-router-dom'

const navigation = [
  { to: '/', label: 'Início' },
  { to: '/catalogo', label: 'Catálogo' },
]

function HomePage() {
  return (
    <section className="hero">
      <p className="eyebrow">Estampas e Personalização</p>
      <h1>Ideias únicas, feitas para você.</h1>
      <p>
        Organize suas estampas, encontre inspiração e transforme produtos em
        peças personalizadas.
      </p>
    </section>
  )
}

function CatalogPage() {
  return (
    <section className="hero">
      <p className="eyebrow">Catálogo</p>
      <h1>Encontre a sua próxima estampa.</h1>
      <p>Em breve, uma seleção de produtos e personalizações disponíveis.</p>
    </section>
  )
}

function NotFoundPage() {
  return (
    <section className="hero">
      <p className="eyebrow">404</p>
      <h1>Página não encontrada.</h1>
      <p>Use o menu para voltar a uma página disponível.</p>
    </section>
  )
}

export default function App() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <NavLink className="brand" to="/">
          Estampas
        </NavLink>
        <nav aria-label="Navegação principal">
          {navigation.map(({ to, label }) => (
            <NavLink
              className={({ isActive }) =>
                isActive ? 'nav-link nav-link--active' : 'nav-link'
              }
              key={to}
              to={to}
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main>
        <Routes>
          <Route element={<HomePage />} path="/" />
          <Route element={<CatalogPage />} path="/catalogo" />
          <Route element={<NotFoundPage />} path="*" />
        </Routes>
      </main>
    </div>
  )
}
