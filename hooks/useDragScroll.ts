'use client'

import { useEffect } from 'react'

export function useDragScroll() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!window.matchMedia('(pointer: fine)').matches) return

    let isDown = false
    let startY = 0
    let startScroll = 0
    let moved = false

    const isInteractive = (target: EventTarget | null): boolean => {
      if (!(target instanceof HTMLElement)) return false
      return !!target.closest('button, a, input, textarea, select, [role="button"]')
    }

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      if (e.button !== 0) return
      if (isInteractive(e.target)) return
      isDown = true
      moved = false
      startY = e.pageY
      startScroll = window.scrollY
    }
    const onPointerUp = () => {
      if (!isDown) return
      isDown = false
      document.body.style.cursor = ''
      if (moved) {
        const blockClick = (ev: MouseEvent) => {
          ev.stopPropagation()
          ev.preventDefault()
          window.removeEventListener('click', blockClick, true)
        }
        window.addEventListener('click', blockClick, true)
      }
    }
    const onPointerMove = (e: PointerEvent) => {
      if (!isDown) return
      if (e.pointerType !== 'mouse') return
      const dy = e.pageY - startY
      if (Math.abs(dy) > 4) {
        moved = true
        document.body.style.cursor = 'grabbing'
      }
      window.scrollTo({ top: startScroll - dy * 1.2, behavior: 'auto' })
    }

    window.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointerup', onPointerUp)
    window.addEventListener('pointercancel', onPointerUp)
    window.addEventListener('pointermove', onPointerMove)

    return () => {
      window.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointerup', onPointerUp)
      window.removeEventListener('pointercancel', onPointerUp)
      window.removeEventListener('pointermove', onPointerMove)
      document.body.style.cursor = ''
    }
  }, [])
}
