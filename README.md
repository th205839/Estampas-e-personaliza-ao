# Estampa Operations

Base comercial para preparação e gestão de artes de sublimação.

A aplicação combina uma **Bancada de Estampas** para produção com uma camada React responsiva e uma API REST portátil para gestão corporativa.

## O que já está disponível

- Bancada de produção com upload, moldes, DPI, mockups, exportação PNG e SVG;
- Importação e exportação de tabelas de moldes em JSON;
- Painel operacional responsivo;
- API REST para workspaces, com contrato de dados independente de fornecedor;
- Persistência local no navegador ou por API HTTP, selecionada por ambiente;
- CORS configurável e token Bearer opcional na API;
- Docker e Compose para implantação em qualquer plataforma de contêiner.

## Desenvolvimento local

Instale as dependências e inicie a interface:

```bash
pnpm install
pnpm dev
```

Em outro terminal, inicie a API:

```bash
pnpm api:dev
```

Crie um arquivo `.env` a partir de `.env.example`:

```dotenv
VITE_API_BASE_URL=http://localhost:8080
VITE_DEPLOYMENT_TARGET=local
VITE_STORAGE_PROVIDER=file
API_ALLOWED_ORIGIN=http://localhost:5173
API_ACCESS_TOKEN=
```

> `API_ACCESS_TOKEN` é apenas uma proteção de implantação inicial. Para produção corporativa, conecte um provedor OIDC/SSO e valide os tokens no gateway ou na API.

## Implantação com Docker

```bash
docker compose up --build
```

A API passa a responder em `http://localhost:8080/api/health`. O volume `estampas-data` preserva os workspaces entre reinicializações. Em AWS, Azure, Google Cloud ou datacenter próprio, publique a mesma imagem e substitua o armazenamento de arquivo por um adaptador de banco ou objeto corporativo.

## API disponível

| Método | Rota | Finalidade |
| --- | --- | --- |
| `GET` | `/api/health` | Verifica a disponibilidade da API. |
| `GET` | `/api/v1/workspaces/:id` | Lê um workspace. |
| `PUT` | `/api/v1/workspaces/:id` | Cria ou atualiza um workspace. |

Quando `API_ACCESS_TOKEN` estiver definido, envie `Authorization: Bearer <token>`.

## Comandos

- `pnpm build` — verifica o TypeScript e gera a interface de produção.
- `pnpm api` — inicia a API.
- `pnpm api:dev` — inicia a API com recarregamento.
- `pnpm lint` — executa o ESLint.
- `pnpm format:check` — verifica a formatação com Prettier.

## Estrutura

- `src/App.tsx` — shell comercial e áreas operacionais.
- `src/domain/` — contratos de negócio independentes da infraestrutura.
- `src/infrastructure/` — adaptadores de persistência local e HTTP.
- `src/config/` — configuração por ambiente.
- `server/` — API REST e repositório de dados.
- `public/bancada-de-estampas.html` — motor de produção atual, incluindo mockups 3D.

## Próxima etapa corporativa

1. Substituir o token inicial por SSO/OIDC, usuários e permissões.
2. Implementar Postgres ou o banco aprovado pela organização.
3. Armazenar artes em objeto privado com URLs temporárias.
4. Adicionar aprovação, auditoria, retenção, observabilidade e indicadores operacionais.
