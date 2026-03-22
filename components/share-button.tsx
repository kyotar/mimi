'use client'

import { type UIShow } from '@/lib/types'

interface Props {
  show: UIShow
}

function buildTweetText(show: UIShow): string {
  const hashtags = show.description.match(/#[\w\u3040-\u9FFF\u30A0-\u30FF\u4E00-\u9FFF]+/g) ?? []
  const tagStr = hashtags.length > 0 ? ' ' + hashtags.join(' ') : ''
  return `「${show.title}」をmimiで見つけた！\n${show.spotifyUrl}\n\n#mimi_podcast${tagStr}`
}

export default function ShareButton({ show }: Props) {
  const handleShare = () => {
    const text = buildTweetText(show)
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center gap-2 border border-ink/20 text-ink hover:border-ink/60 transition-colors rounded-pill px-5 py-2 font-sans text-sm"
    >
      Xで紹介する
    </button>
  )
}
