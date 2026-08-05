import { platformConfig } from '../config/platform'
import type { WorkspaceRepository } from '../domain/workspace'
import { BrowserWorkspaceRepository } from './browser-workspace-repository'
import { HttpWorkspaceRepository } from './http-workspace-repository'

export function createWorkspaceRepository(): WorkspaceRepository {
  if (platformConfig.apiBaseUrl) {
    return new HttpWorkspaceRepository(
      platformConfig.apiBaseUrl.replace(/\/$/, ''),
    )
  }

  return new BrowserWorkspaceRepository()
}
