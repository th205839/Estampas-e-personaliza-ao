# Bancada de Estampas

Aplicação Vite, React e TypeScript que apresenta a **Bancada de Estampas** original.

A ferramenta permite preparar artes para sublimação: escolher produtos e moldes, enviar e ajustar imagens, calcular a resolução de saída, gerar PNG para prensa, visualizar mockups vetoriais e explorar um protótipo 3D.

## Desenvolvimento

```bash
pnpm install
pnpm dev
```

## Comandos

- `pnpm build` — verifica o TypeScript e gera a versão de produção.
- `pnpm lint` — executa o ESLint.
- `pnpm format:check` — verifica a formatação com Prettier.
- `pnpm format` — formata os arquivos.

## Estrutura

- `src/App.tsx` — ponto de entrada React que exibe a bancada.
- `public/bancada-de-estampas.html` — implementação original completa da ferramenta, incluindo o motor de mockups 3D.
