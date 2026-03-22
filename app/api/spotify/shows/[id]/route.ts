import { getShow, getShowEpisodes } from '@/lib/spotify'
import type { NextRequest } from 'next/server'

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const [show, episodes] = await Promise.all([
      getShow(params.id),
      getShowEpisodes(params.id),
    ])
    if (!show) return Response.json({ error: 'Not found' }, { status: 404 })
    return Response.json({ show, episodes })
  } catch (err) {
    console.error('Show detail error:', err)
    return Response.json({ error: 'Failed' }, { status: 500 })
  }
}
