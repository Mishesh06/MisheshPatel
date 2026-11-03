/**
 * SoundToggle — floating audio toggle matching sebg.ch.
 *
 * Placed at fixed bottom-right (fixed right-4 bottom-4 md:right-6 md:bottom-6 z-40).
 * Toggles synthesized Web Audio API sound effects.
 */

import { useState, useEffect } from 'react'
import { sound } from '@/utils/sound'

export default function SoundToggle() {
  const [enabled, setEnabled] = useState(sound.isEnabled())

  useEffect(() => {
    return sound.subscribe((state) => setEnabled(state))
  }, [])

  return (
    <button
      type="button"
      onClick={() => sound.toggle()}
      aria-pressed={enabled}
      aria-label={enabled ? 'Mute sound effects' : 'Enable sound effects'}
      className="sound-toggle button group select-none"
      title={enabled ? 'Sound effects enabled (Click to mute)' : 'Sound effects muted (Click to enable)'}
    >
      <svg
        viewBox="0 0 16 16"
        className="w-4 h-4 fill-none stroke-current stroke-[1.5]"
        aria-hidden="true"
      >
        {/* Speaker Base */}
        <path d="M1.5 6H4l3.5-3v10L4 10H1.5z" strokeLinejoin="round" />

        {enabled ? (
          /* Sound Waves */
          <>
            <path d="M10 5.5a3.5 3.5 0 0 1 0 5" strokeLinecap="round" />
            <path d="M12 3a6.5 6.5 0 0 1 0 10" strokeLinecap="round" />
          </>
        ) : (
          /* Mute Cross */
          <path d="m10.5 6 4 4m0-4-4 4" strokeLinecap="round" />
        )}
      </svg>
      <span className="sr-only">{enabled ? 'Sound enabled' : 'Sound muted'}</span>
    </button>
  )
}

