'use client'

import { useEffect, useRef } from 'react'

export default function CursorAnimation() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    if (isMobile) return

    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mx = 0, my = 0, rx = 0, ry = 0, raf: number

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY
      dot.style.left = mx + 'px'
      dot.style.top  = my + 'px'
    }

    const animate = () => {
      rx += (mx - rx) * 0.3
      ry += (my - ry) * 0.3
      ring.style.left = rx + 'px'
      ring.style.top  = ry + 'px'
      raf = requestAnimationFrame(animate)
    }

    const enter = () => { dot.classList.add('hovered'); ring.classList.add('hovered') }
    const leave = () => { dot.classList.remove('hovered'); ring.classList.remove('hovered') }

    document.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(animate)

    const attach = () => {
      document.querySelectorAll<Element>('a, button, [role="button"], [data-cursor-hover]').forEach(el => {
        if (el.getAttribute('data-cursor-attached')) return
        el.setAttribute('data-cursor-attached', '1')
        el.addEventListener('mouseenter', enter)
        el.addEventListener('mouseleave', leave)
      })
    }

    setTimeout(attach, 300)
    const mo = new MutationObserver(attach)
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      mo.disconnect()
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
          transform: translate(-50%, -50%);
          transition: width .2s, height .2s, background .15s;
          will-change: left, top;
        }
        .cursor-ring {
          position: fixed; top: 0; left: 0;
          width: 34px; height: 34px;
          border: 1.5px solid var(--black); border-radius: 50%;
          pointer-events: none; z-index: 99998;
          transform: translate(-50%, -50%);
          transition: width .3s, height .3s, border-color .2s;
          will-change: left, top;
        }
        .cursor-dot.hovered  { width: 3px; height: 3px; }
        .cursor-ring.hovered { width: 50px; height: 50px; }
        // @media (max-width: 768px) {
        //   .cursor-dot, .cursor-ring { display: none !important; }
        // }

        @media (max-width: 1024px) {
          // .cursor-dot, .cursor-ring { display: none !important; }
        }

        /* ✨ 데스크톱에서는 기본 커서(화살표, 손모양 등)를 전부 숨김! */
        @media (min-width: 1025px) {
          body, a, button, [role="button"], input, textarea, select, [data-cursor-hover], * {
            cursor: none !important;
          }
        }
      `}</style>
    </>
  )
}
