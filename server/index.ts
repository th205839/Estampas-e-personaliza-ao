import { createServer, type IncomingMessage, type ServerResponse } from 'node:http'
import { resolve } from 'node:path'

import { FileWorkspaceStore, type StoredWorkspace } from './workspace-store'

const port = Number(process.env.PORT ?? 8080)
const allowedOrigin = process.env.API_ALLOWED_ORIGIN ?? '*'
const accessToken = process.env.API_ACCESS_TOKEN
const store = new FileWorkspaceStore(
  resolve(process.env.DATA_DIRECTORY ?? './data', 'workspaces.json'),
)

function writeJson(
  response: ServerResponse,
  statusCode: number,
  body: Record<string, unknown>,
): void {
  response.writeHead(statusCode, {
    'Access-Control-Allow-Headers': 'Authorization, Content-Type',
    'Access-Control-Allow-Methods': 'GET, PUT, OPTIONS',
    'Access-Control-Allow-Origin': allowedOrigin,
    'Content-Type': 'application/json; charset=utf-8',
  })
  response.end(JSON.stringify(body))
}

function isAuthorized(request: IncomingMessage): boolean {
  if (!accessToken) {
    return true
  }

  return request.headers.authorization === `Bearer ${accessToken}`
}

async function readBody(request: IncomingMessage): Promise<unknown> {
  const chunks: Buffer[] = []
  let totalBytes = 0

  for await (const chunk of request) {
    totalBytes += chunk.length

    if (totalBytes > 1_000_000) {
      throw new Error('Payload excede o limite de 1 MB.')
    }

    chunks.push(chunk)
  }

  return JSON.parse(Buffer.concat(chunks).toString('utf8')) as unknown
}

function isWorkspace(value: unknown): value is StoredWorkspace {
  if (!value || typeof value !== 'object') {
    return false
  }

  const workspace = value as Record<string, unknown>

  return (
    typeof workspace.id === 'string' &&
    typeof workspace.name === 'string' &&
    typeof workspace.organizationName === 'string' &&
    Array.isArray(workspace.assets)
  )
}

const server = createServer(async (request, response) => {
  const url = new URL(request.url ?? '/', `http://${request.headers.host}`)

  if (request.method === 'OPTIONS') {
    writeJson(response, 204, {})
    return
  }

  if (url.pathname === '/api/health') {
    writeJson(response, 200, { status: 'ok' })
    return
  }

  if (!isAuthorized(request)) {
    writeJson(response, 401, { error: 'Não autorizado.' })
    return
  }

  const workspaceMatch = url.pathname.match(/^\/api\/v1\/workspaces\/([^/]+)$/)

  if (!workspaceMatch) {
    writeJson(response, 404, { error: 'Rota não encontrada.' })
    return
  }

  const workspaceId = decodeURIComponent(workspaceMatch[1])

  try {
    if (request.method === 'GET') {
      writeJson(response, 200, await store.get(workspaceId))
      return
    }

    if (request.method === 'PUT') {
      const workspace = await readBody(request)

      if (!isWorkspace(workspace) || workspace.id !== workspaceId) {
        writeJson(response, 400, { error: 'Workspace inválido.' })
        return
      }

      writeJson(response, 200, await store.save(workspace))
      return
    }

    writeJson(response, 405, { error: 'Método não permitido.' })
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Erro inesperado no servidor.'
    writeJson(response, 400, { error: message })
  }
})

server.listen(port, () => {
  console.log(`Estampa Operations API disponível na porta ${port}.`)
})
