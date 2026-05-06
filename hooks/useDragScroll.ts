'use client'

import { useEffect } from 'react'

export function useDragScroll() {
  useEffect(() => {
    let isDown = false
    let startY = 0
    let startScroll = 0
    let moved = false

    const isInteractive = (target: EventTarget | null): boolean => {
      if (!(target instanceof HTMLElement)) return false
      return !!target.closest('button, a, input, textarea, select, [role="button"]')
    }

    const onMouseDown = (e: MouseEvent) => {
      if (e.button !== 0) return
      if (isInteractive(e.target)) return
      isDown = true
      moved = false
      startY = e.pageY
      startScroll = window.scrollY
      document.body.style.cursor = 'grabbing'
    }
    const onMouseUp = () => {
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
    const onMouseMove = (e: MouseEvent) => {
      if (!isDown) return
      const dy = e.pageY - startY
      if (Math.abs(dy) > 4) moved = true
      window.scrollTo({ top: startScroll - dy * 1.2, behavior: 'auto' })
    }

    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)
    window.addEventListener('mousemove', onMouseMove)

    return () => {
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      window.removeEventListener('mousemove', onMouseMove)
      document.body.style.cursor = ''
    }
  }, [])
}
