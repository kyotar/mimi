'use client'

import { useState } from 'react'

interface Props {
  text: string
  color: string
}

export default function DescriptionExpand({ text, color }: Props) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="mt-4 max-w-md">
      <p
        className={`font-sans text-sm leading-relaxed opacity-80 ${expanded ? '' : 'line-clamp-3'}`}
        style={{ color }}
      >
        {text}
      </p>
      <button
        onClick={() => setExpanded((v) => !v)}
        className="mt-1.5 font-sans text-xs opacity-50 hover:opacity-80 transition-opacity"
        style={{ color }}
      >
        {expanded ? '閉じる' : 'もっと見る'}
      </button>
    </div>
  )
}
