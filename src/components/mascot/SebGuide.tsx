/**
 * SebGuide — authentic guide character matching https://www.sebg.ch/ as it is.
 *
 * Implements the exact aesthetic from sebg.ch:
 *  - Round head with signature stipple / halftone dither shading pattern
 *  - Iconic curly hair cap (#77573d) with halftone comic texture
 *  - Stubble beard contour (#c49c74)
 *  - Signature sage green sweater (#a4ad9b)
 *  - White cartoon glove hand waving hello
 *  - Expressive eyes: cheerful squinting eyes (^ ^) or tracking pupils with white glint
 *  - 100% crash-proof: clicking or touching plays a delightful spring jump & audio pop
 */

import { useState, useRef, useEffect, useId } from 'react'
import type { SVGProps } from 'react'
import { sound } from '@/utils/sound'

interface SebGuideProps extends SVGProps<SVGSVGElement> {
  size?: number
  isWaving?: boolean
  initialHappy?: boolean
  onClick?: () => void
}

export default function SebGuide({
  size = 160,
  isWaving = true,
  initialHappy = true,
  onClick,
  className = '',
  style,
  ...props
}: SebGuideProps) {
  const uid = useId().replace(/[^a-z0-9]/gi, '')
  const ditherPattern = `dither_${uid}`
  const hairPattern = `dither_hair_${uid}`

  const [isHappy, setIsHappy] = useState(initialHappy)
  const [isBlinking, setIsBlinking] = useState(false)
  const [isJumping, setIsJumping] = useState(false)
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 })
  const guideRef = useRef<SVGSVGElement>(null)

  // Natural blink cycle
  useEffect(() => {
    let blinkTimeout: ReturnType<typeof setTimeout>
    const triggerBlink = () => {
      setIsBlinking(true)
      setTimeout(() => setIsBlinking(false), 140)
      blinkTimeout = setTimeout(triggerBlink, 3000 + Math.random() * 3500)
    }
    blinkTimeout = setTimeout(triggerBlink, 2500)
    return () => clearTimeout(blinkTimeout)
  }, [])

  // Smooth mouse gaze tracking (desktop only, bounded to eye bounds)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!guideRef.current) return
      const rect = guideRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height * 0.45

      const dx = e.clientX - centerX
      const dy = e.clientY - centerY
      const dist = Math.sqrt(dx * dx + dy * dy)
      const maxDist = Math.max(window.innerWidth, window.innerHeight) * 0.4

      const norm = Math.min(dist / maxDist, 1)
      const angle = Math.atan2(dy, dx)

      setPupilOffset({
        x: Math.cos(angle) * norm * 3.5,
        y: Math.sin(angle) * norm * 2,
      })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Interactive Click / Touch Handler (100% crash-proof!)
  const handleClick = (e: React.MouseEvent<SVGSVGElement>) => {
    e.stopPropagation()
    sound.playPop()
    setIsJumping(true)
    setIsHappy(true)

    if (onClick) onClick()

    setTimeout(() => {
      setIsJumping(false)
    }, 450)
  }

  const w = size
  const h = (size / 140) * 165

  return (
    <svg
      ref={guideRef}
      viewBox="0 0 140 165"
      width={w}
      height={h}
      aria-label="Guide Character"
      className={`seb-guide select-none cursor-pointer transition-transform duration-300 ${
        isJumping ? 'scale-105 -translate-y-3' : 'hover:scale-102'
      } ${className}`}
      onClick={handleClick}
      style={{ overflow: 'visible', ...style }}
      {...props}
    >
      <defs>
        {/* ── Signature sebg.ch Halftone Stipple Dither Pattern ── */}
        <pattern id={ditherPattern} width="4" height="4" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.8" fill="#0b0b0c" opacity="0.45" />
          <circle cx="3" cy="3" r="0.8" fill="#0b0b0c" opacity="0.45" />
        </pattern>

        {/* Dense hair stipple */}
        <pattern id={hairPattern} width="3" height="3" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="0.85" fill="#1c1c1c" opacity="0.55" />
        </pattern>
      </defs>

      {/* ── BASE CONTAINER ── */}
      <g className="seb-guide__body" style={{ transformOrigin: '70px 145px' }}>
        
        {/* ══════════════════════════════════════════════════════
            1. SAGE GREEN SWEATER (sebg.ch #a4ad9b)
        ══════════════════════════════════════════════════════ */}
        <g id="sweater">
          {/* Main sweater body */}
          <path
            d="M 28 132 C 30 114, 52 110, 70 110 C 88 110, 110 114, 112 132 C 114 146, 115 162, 115 165 L 25 165 C 25 162, 26 146, 28 132 Z"
            fill="#a4ad9b"
            stroke="#0b0b0c"
            strokeWidth="3.6"
            strokeLinejoin="round"
          />

          {/* Halftone stipple shading on side of sweater */}
          <path
            d="M 28 132 C 30 114, 48 110, 56 114 C 44 126, 38 144, 35 165 L 25 165 C 25 162, 26 146, 28 132 Z"
            fill={`url(#${ditherPattern})`}
          />

          {/* Crewneck collar */}
          <ellipse
            cx="70"
            cy="112"
            rx="16"
            ry="6"
            fill="#8d9784"
            stroke="#0b0b0c"
            strokeWidth="3"
          />
        </g>

        {/* ══════════════════════════════════════════════════════
            2. WAVING WHITE GLOVE HAND (sebg.ch signature wave)
        ══════════════════════════════════════════════════════ */}
        {isWaving && (
          <g
            id="waving-arm"
            className="transition-transform duration-500 ease-out"
            style={{
              transformOrigin: '106px 130px',
              animation: 'sebWave 2.2s ease-in-out infinite alternate',
            }}
          >
            {/* Sweater Arm Sleeve */}
            <path
              d="M 104 130 L 118 102"
              stroke="#a4ad9b"
              strokeWidth="12"
              strokeLinecap="round"
            />
            <path
              d="M 104 130 L 118 102"
              stroke="#0b0b0c"
              strokeWidth="3.6"
              strokeLinecap="round"
              fill="none"
            />

            {/* White Cartoon Glove (from sebg.ch og-image) */}
            <g transform="translate(118, 96) rotate(-10)">
              {/* Palm */}
              <circle cx="0" cy="0" r="10" fill="#fbfbf8" stroke="#0b0b0c" strokeWidth="3" />
              <circle cx="0" cy="0" r="10" fill={`url(#${ditherPattern})`} />
              {/* Fingers */}
              <rect x="-9" y="-14" width="4.5" height="8" rx="2.2" fill="#fbfbf8" stroke="#0b0b0c" strokeWidth="2.5" />
              <rect x="-3.5" y="-17" width="5" height="11" rx="2.5" fill="#fbfbf8" stroke="#0b0b0c" strokeWidth="2.5" />
              <rect x="2.5" y="-15" width="4.5" height="9" rx="2.2" fill="#fbfbf8" stroke="#0b0b0c" strokeWidth="2.5" />
              <rect x="8" y="-11" width="4" height="6.5" rx="2" fill="#fbfbf8" stroke="#0b0b0c" strokeWidth="2.2" />
              {/* Thumb */}
              <path
                d="M -8 -2 C -13 -4, -15 2, -10 6 Z"
                fill="#fbfbf8"
                stroke="#0b0b0c"
                strokeWidth="2.5"
              />
            </g>
          </g>
        )}

        {/* ══════════════════════════════════════════════════════
            3. HEAD, CURLY HAIR & EXPRESSIONS (sebg.ch verbatim)
        ══════════════════════════════════════════════════════ */}
        <g id="head" style={{ transformOrigin: '70px 108px' }}>
          {/* Neck */}
          <rect
            x="64"
            y="98"
            width="12"
            height="15"
            rx="4"
            fill="#fbf3ec"
            stroke="#0b0b0c"
            strokeWidth="3"
          />
          {/* Neck shadow under jaw */}
          <rect x="64" y="98" width="12" height="7" fill={`url(#${ditherPattern})`} />

          {/* Ears */}
          <circle cx="34" cy="70" r="7.5" fill="#fbf3ec" stroke="#0b0b0c" strokeWidth="3.2" />
          <path d="M 34 68 Q 36 70 34 72" stroke="#0b0b0c" strokeWidth="2" fill="none" />
          <circle cx="106" cy="70" r="7.5" fill="#fbf3ec" stroke="#0b0b0c" strokeWidth="3.2" />
          <path d="M 106 68 Q 104 70 106 72" stroke="#0b0b0c" strokeWidth="2" fill="none" />

          {/* Head Sphere (Skin: #fbf3ec) */}
          <circle
            cx="70"
            cy="68"
            r="36"
            fill="#fbf3ec"
            stroke="#0b0b0c"
            strokeWidth="3.6"
          />

          {/* Stipple Halftone Shading on Cheeks & Jawline */}
          <path
            d="M 37 74 C 38 98, 56 104, 70 104 C 84 104, 102 98, 103 74 C 103 88, 88 102, 70 102 C 52 102, 37 88, 37 74 Z"
            fill={`url(#${ditherPattern})`}
          />

          {/* ── STUBBLE BEARD CONTOUR (sebg.ch #c49c74) ── */}
          <path
            d="M 43 78 C 45 99, 57 104, 70 104 C 83 104, 95 99, 97 78 C 95 95, 83 101, 70 101 C 57 101, 45 95, 43 78 Z"
            fill="#c49c74"
            opacity="0.85"
          />
          <path
            d="M 43 78 C 45 99, 57 104, 70 104 C 83 104, 95 99, 97 78 C 95 95, 83 101, 70 101 C 57 101, 45 95, 43 78 Z"
            fill={`url(#${ditherPattern})`}
          />

          {/* ── CURLY HAIR CAP (sebg.ch #77573d) ── */}
          <g id="curly-hair">
            {/* Base hair silhouette */}
            <path
              d="M 34 62 C 32 42, 48 30, 70 30 C 92 30, 108 42, 106 62 C 104 56, 98 50, 92 50 C 86 50, 82 56, 76 52 C 70 48, 64 52, 58 50 C 50 48, 44 56, 34 62 Z"
              fill="#77573d"
              stroke="#0b0b0c"
              strokeWidth="3.6"
              strokeLinejoin="round"
            />

            {/* Signature voluminous round curls */}
            <circle cx="44" cy="40" r="8.5" fill="#77573d" />
            <circle cx="58" cy="33" r="9.5" fill="#77573d" />
            <circle cx="72" cy="31" r="10" fill="#77573d" />
            <circle cx="86" cy="34" r="9" fill="#77573d" />
            <circle cx="98" cy="42" r="8" fill="#77573d" />

            {/* Forehead curl dips */}
            <circle cx="52" cy="50" r="5" fill="#77573d" />
            <circle cx="68" cy="48" r="5.5" fill="#77573d" />
            <circle cx="84" cy="50" r="5" fill="#77573d" />

            {/* Halftone texture overlay on hair */}
            <path
              d="M 34 62 C 32 42, 48 30, 70 30 C 92 30, 108 42, 106 62 C 104 56, 98 50, 92 50 C 86 50, 82 56, 76 52 C 70 48, 64 52, 58 50 C 50 48, 44 56, 34 62 Z"
              fill={`url(#${hairPattern})`}
            />
          </g>

          {/* ── EYEBROWS ── */}
          <path
            d="M 48 53 Q 56 49 63 53"
            stroke="#1c1c1c"
            strokeWidth="3.6"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 77 53 Q 84 49 92 53"
            stroke="#1c1c1c"
            strokeWidth="3.6"
            strokeLinecap="round"
            fill="none"
          />

          {/* ── EYES (Squinting ^ ^ in happy mode, or gaze tracking in neutral) ── */}
          <g id="eyes">
            {isHappy && !isBlinking ? (
              /* Smiling squinting eyes matching sebg.ch og-image (^ ^) */
              <>
                <path
                  d="M 49 67 Q 56 59 63 67"
                  stroke="#0b0b0c"
                  strokeWidth="4"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M 77 67 Q 84 59 91 67"
                  stroke="#0b0b0c"
                  strokeWidth="4"
                  strokeLinecap="round"
                  fill="none"
                />
              </>
            ) : isBlinking ? (
              /* Blinking eyelid slit */
              <>
                <line x1="49" y1="66" x2="63" y2="66" stroke="#0b0b0c" strokeWidth="3.6" strokeLinecap="round" />
                <line x1="77" y1="66" x2="91" y2="66" stroke="#0b0b0c" strokeWidth="3.6" strokeLinecap="round" />
              </>
            ) : (
              /* Round open eyes with tracking pupils and white glint */
              <>
                <ellipse cx="56" cy="66" rx="7" ry="8.5" fill="#fbfbf8" stroke="#0b0b0c" strokeWidth="2.8" />
                <ellipse cx="84" cy="66" rx="7" ry="8.5" fill="#fbfbf8" stroke="#0b0b0c" strokeWidth="2.8" />

                {/* Left Pupil */}
                <g transform={`translate(${pupilOffset.x}, ${pupilOffset.y})`}>
                  <circle cx="56" cy="66" r="4.2" fill="#0b0b0c" />
                  <circle cx="54.5" cy="64.5" r="1.5" fill="#fbfbf8" />
                </g>

                {/* Right Pupil */}
                <g transform={`translate(${pupilOffset.x}, ${pupilOffset.y})`}>
                  <circle cx="84" cy="66" r="4.2" fill="#0b0b0c" />
                  <circle cx="82.5" cy="64.5" r="1.5" fill="#fbfbf8" />
                </g>
              </>
            )}
          </g>

          {/* ── NOSE ── */}
          <path
            d="M 70 68 Q 72 74 68 76"
            stroke="#0b0b0c"
            strokeWidth="2.8"
            strokeLinecap="round"
            fill="none"
          />

          {/* ── MOUTH (Big open cheerful smile from sebg.ch og-image) ── */}
          <g id="mouth">
            <path
              d="M 60 80 Q 70 94 80 80 Z"
              fill="#1c1c1c"
              stroke="#0b0b0c"
              strokeWidth="2.8"
              strokeLinejoin="round"
            />
            {/* Pink tongue */}
            <path
              d="M 64 88 Q 70 93 76 88 Q 70 85 64 88 Z"
              fill="#e26d6d"
            />
          </g>
        </g>
      </g>
    </svg>
  )
}

