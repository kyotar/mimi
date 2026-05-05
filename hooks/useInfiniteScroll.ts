'use client'

import { useEffect, useRef } from 'react'

export function useInfiniteScroll(onLoadMore: () => void, enabled: boolean = true) {
  const sentinelRef = useRef<HTMLDivElement>(null)
  const cbRef = useRef(onLoadMore)
  cbRef.current = onLoadMore

  useEffect(() => {
    if (!enabled) return
    const node = sentinelRef.current
    if (!node) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) cbRef.current()
      },
      { threshold: 0.1, rootMargin: '400px' }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [enabled])

  return sentinelRef
}
