import type { Workspace, WorkspaceRepository } from '../domain/workspace'

export class HttpWorkspaceRepository implements WorkspaceRepository {
  constructor(private readonly baseUrl: string) {}

  async getActiveWorkspace(): Promise<Workspace> {
    const response = await fetch(`${this.baseUrl}/api/v1/workspaces/default`)

    if (!response.ok) {
      throw new Error('Não foi possível carregar o workspace corporativo.')
    }

    return (await response.json()) as Workspace
  }

  async saveActiveWorkspace(workspace: Workspace): Promise<void> {
    const response = await fetch(
      `${this.baseUrl}/api/v1/workspaces/${workspace.id}`,
      {
        body: JSON.stringify(workspace),
        headers: { 'Content-Type': 'application/json' },
        method: 'PUT',
      },
    )

    if (!response.ok) {
      throw new Error('Não foi possível salvar o workspace corporativo.')
    }
  }
}
