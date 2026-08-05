# Estampa Operations

Base comercial para preparação e gestão de artes de sublimação.

A aplicação combina uma **Bancada de Estampas** para produção com uma camada React responsiva para operação, gestão e futura integração corporativa.

## O que já está disponível

- Bancada de produção com upload, moldes, DPI, mockups, exportação PNG e SVG;
- Importação e exportação de tabelas de moldes em JSON;
- Painel operacional responsivo;
- Contratos de workspace sem dependência de fornecedor;
- Armazenamento local substituível por API corporativa;
- Configuração por ambiente para hospedagem, API e armazenamento.

## Desenvolvimento

```bash
pnpm install
pnpm dev
```

## Configuração de ambiente

Copie `.env.example` para `.env` e ajuste os valores conforme o ambiente:

```dotenv
VITE_API_BASE_URL=https://api.suaempresa.com
VITE_DEPLOYMENT_TARGET=azure
VITE_STORAGE_PROVIDER=blob-storage
```

A interface atual funciona sem API. Quando a API for definida, o contrato em `src/domain/workspace.ts` e o repositório em `src/infrastructure/` permitem conectar autenticação, dados e armazenamento sem trocar a camada de interface.

## Comandos

- `pnpm build` — verifica o TypeScript e gera a versão de produção.
- `pnpm lint` — executa o ESLint.
- `pnpm format:check` — verifica a formatação com Prettier.
- `pnpm format` — formata os arquivos.

## Próxima etapa corporativa

1. Implementar identidade (SSO/OIDC), usuários e permissões.
2. Conectar uma API para workspaces, projetos, artes e catálogo de moldes.
3. Armazenar arquivos em objeto privado com URLs temporárias.
4. Adicionar aprovação, auditoria, retenção e indicadores operacionais.

## Estrutura

- `src/App.tsx` — shell comercial e áreas operacionais.
- `src/domain/` — contratos de negócio independentes da infraestrutura.
- `src/infrastructure/` — adaptadores de persistência.
- `src/config/` — configuração por ambiente.
- `public/bancada-de-estampas.html` — motor de produção atual, incluindo mockups 3D.
