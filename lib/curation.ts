import { readFile } from 'fs/promises'
import path from 'path'

export interface CurationEntry {
  spotify_id: string
  comment: string
}

export interface Curation {
  week: string
  curator: string
  shows: CurationEntry[]
}

export async function loadCuration(): Promise<Curation | null> {
  try {
    const filePath = path.join(process.cwd(), 'curation.json')
    const raw = await readFile(filePath, 'utf-8')
    return JSON.parse(raw) as Curation
  } catch {
    return null
  }
}
