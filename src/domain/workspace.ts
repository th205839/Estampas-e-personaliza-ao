export type AssetStatus = 'draft' | 'in_review' | 'approved' | 'archived'

export interface PrintAsset {
  id: string
  name: string
  product: string
  size: string
  status: AssetStatus
  updatedAt: string
}

export interface Workspace {
  id: string
  name: string
  organizationName: string
  assets: PrintAsset[]
}

export interface WorkspaceRepository {
  getActiveWorkspace(): Promise<Workspace>
  saveActiveWorkspace(workspace: Workspace): Promise<void>
}
