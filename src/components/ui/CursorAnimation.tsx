'use client'

import { useEffect, useRef } from 'react'

export default function CursorAnimation() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canUseCustomCursor =
      window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!canUseCustomCursor) return

    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mx = window.innerWidth / 2
    let my = window.innerHeight / 2
    let rx = mx
    let ry = my
    let raf = 0
    let isHovered = false
    let lastTs = performance.now()

    const setHovered = (next: boolean) => {
      if (isHovered === next) return
      isHovered = next
      dot.classList.toggle('hovered', next)
      ring.classList.toggle('hovered', next)
    }

    const onMove = (e: PointerEvent) => {
      mx = e.clientX
      my = e.clientY
      const target = e.target as Element | null
      setHovered(Boolean(target?.closest('a, button, [role="button"], [data-cursor-hover]')))
    }

    const onClick = () => {
      dot.classList.remove('clicked')
      ring.classList.remove('clicked')
      void dot.offsetWidth
      dot.classList.add('clicked')
      ring.classList.add('clicked')
    }

    const animate = (ts: number) => {
      const dt = Math.min((ts - lastTs) / 16.67, 3)
      lastTs = ts
      const ease = 1 - Math.pow(1 - 0.22, dt)
      rx += (mx - rx) * ease
      ry += (my - ry) * ease
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`
      raf = requestAnimationFrame(animate)
    }

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf)
        raf = 0
      } else if (!raf) {
        lastTs = performance.now()
        raf = requestAnimationFrame(animate)
      }
    }

    document.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerdown', onClick, { passive: true })
    document.addEventListener('visibilitychange', onVisibility)
    raf = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerdown', onClick)
      document.removeEventListener('visibilitychange', onVisibility)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  />
      <div ref={ringRef} className="cursor-ring" />
      <style>{`
        .cursor-dot {
          position: fixed; top: 0; left: 0;
          width: 7px; height: 7px;
          background: var(--black); border-radius: 50%;
          pointer-events: none; z-index: 99999;
          transform: translate3d(-100px, -100px, 0) translate(-50%, -50%);
          transition: width .2s, height .2s, background .15s;
          will-change: transform;
        }
        .cursor-ring {
          position: fixed; top: 0; left: 0;
          width: 34px; height: 34px;
          border: 1.5px solid var(--black); border-radius: 50%;
          pointer-events: none; z-index: 99998;
          transform: translate3d(-100px, -100px, 0) translate(-50%, -50%);
          transition: width .3s, height .3s, border-color .2s;
          will-change: transform;
        }
        .cursor-dot.hovered  { width: 3px; height: 3px; }
        .cursor-ring.hovered { width: 50px; height: 50px; }
        .cursor-dot.clicked { animation: cursorDotClick .24s ease; }
        .cursor-ring.clicked { animation: cursorRingClick .34s ease; }

        @keyframes cursorDotClick {
          0% { width: 7px; height: 7px; }
          50% { width: 11px; height: 11px; }
          100% { width: 7px; height: 7px; }
        }

        @keyframes cursorRingClick {
          0% { width: 34px; height: 34px; opacity: 1; }
          50% { width: 42px; height: 42px; opacity: 0.7; }
          100% { width: 34px; height: 34px; opacity: 1; }
        }
        @media (hover: none), (pointer: coarse) {
          .cursor-dot,
          .cursor-ring {
            display: none !important;
          }
        }
      `}</style>
    </>
  )
}
