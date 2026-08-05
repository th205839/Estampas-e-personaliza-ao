import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname } from 'node:path'

export interface StoredWorkspace {
  id: string
  name: string
  organizationName: string
  assets: unknown[]
}

type WorkspaceFile = Record<string, StoredWorkspace>

export class FileWorkspaceStore {
  constructor(private readonly filePath: string) {}

  async get(id: string): Promise<StoredWorkspace> {
    const data = await this.read()

    return (
      data[id] ?? {
        id,
        name: 'Operação principal',
        organizationName: 'Sua organização',
        assets: [],
      }
    )
  }

  async save(workspace: StoredWorkspace): Promise<StoredWorkspace> {
    const data = await this.read()
    data[workspace.id] = workspace

    await mkdir(dirname(this.filePath), { recursive: true })
    await writeFile(this.filePath, JSON.stringify(data, null, 2), 'utf8')

    return workspace
  }

  private async read(): Promise<WorkspaceFile> {
    try {
      return JSON.parse(await readFile(this.filePath, 'utf8')) as WorkspaceFile
    } catch {
      return {}
    }
  }
}
