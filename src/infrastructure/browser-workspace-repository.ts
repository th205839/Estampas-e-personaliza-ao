import type { Workspace, WorkspaceRepository } from '../domain/workspace'

const storageKey = 'bancada:workspace:v1'

const defaultWorkspace: Workspace = {
  id: 'local-workspace',
  name: 'Operação principal',
  organizationName: 'Sua organização',
  assets: [],
}

export class BrowserWorkspaceRepository implements WorkspaceRepository {
  async getActiveWorkspace(): Promise<Workspace> {
    if (typeof window === 'undefined') {
      return defaultWorkspace
    }

    const value = window.localStorage.getItem(storageKey)

    if (!value) {
      return defaultWorkspace
    }

    try {
      return JSON.parse(value) as Workspace
    } catch {
      return defaultWorkspace
    }
  }

  async saveActiveWorkspace(workspace: Workspace): Promise<void> {
    window.localStorage.setItem(storageKey, JSON.stringify(workspace))
  }
}
