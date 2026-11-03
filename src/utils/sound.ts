/**
 * sound.ts — 100% authentic procedural Web Audio API synthesis engine matching sebg.ch.
 * Sourced directly from sebg.ch's runtime synthesizer.
 *
 * Implements 26 procedural synthesizer instruments without any external audio files:
 *  - blip: Mascot speaking & interactive UI click
 *  - pat: Mascot petting / pleasant chime
 *  - surprise: Upward pitch inflection
 *  - giggle: Laughing arpeggio
 *  - grab: Picking up the mascot
 *  - drop: Dropping the mascot
 *  - sleep: Mascot sleeping/snoring (lowpass filter sweep + sawtooth)
 *  - wake: Waking up rising notes
 *  - dizzy: 7Hz FM modulated wobble
 *  - laugh: 8-note descending laughing scale
 *  - sulk: Sad descending slide
 *  - sniffle: Gentle sniffle
 *  - sneeze: Bandpass filtered white noise burst + pitch bend
 *  - dance: 8-step bouncy dance tune
 *  - panic: Alternating panic alarm beeps
 *  - fly: Flying whoosh tone
 *  - hiccup: Three short hiccup blips
 *  - peekaboo: Cheerful two-stage chime
 *  - selfie: Camera shutter click + flash tone
 *  - vanish: Magic slide up/down
 *  - punch: Punch impact thump
 *  - bonk: Cartoon bonk sound
 *  - bell: Crystal bell chime (1319Hz + 3296Hz harmonic)
 *  - whoosh: Bandpass filtered noise sweep
 *  - scratch: Card scratch texture
 *  - shatter: Glass shatter sound
 */

type SynthFn = (dest: AudioNode, time: number) => void

const createEnv = (dest: AudioNode, time: number, peak: number, dur: number): GainNode => {
  const gain = new GainNode(dest.context, { gain: 0 })
  gain.gain.setValueAtTime(0, time)
  gain.gain.linearRampToValueAtTime(peak, time + 0.008)
  gain.gain.exponentialRampToValueAtTime(0.0001, time + dur)
  gain.connect(dest)
  return gain
}

const oscTone = (
  dest: AudioNode,
  time: number,
  type: OscillatorType,
  fStart: number,
  fEnd: number,
  dur: number,
  vol: number,
): OscillatorNode => {
  const osc = new OscillatorNode(dest.context, { type, frequency: fStart })
  osc.frequency.setValueAtTime(fStart, time)
  osc.frequency.exponentialRampToValueAtTime(Math.max(1, fEnd), time + dur)
  osc.connect(createEnv(dest, time, vol, dur))
  osc.start(time)
  osc.stop(time + dur)
  return osc
}

const modPitch = (
  target: OscillatorNode,
  time: number,
  modFreq: number,
  modDepth: number,
  dur: number,
) => {
  const lfo = new OscillatorNode(target.context, { frequency: modFreq })
  const gain = new GainNode(target.context, { gain: modDepth })
  gain.gain.setValueAtTime(modDepth, time)
  gain.gain.linearRampToValueAtTime(0, time + dur)
  lfo.connect(gain).connect(target.frequency)
  lfo.start(time)
  lfo.stop(time + dur)
}

const noiseBurst = (dest: AudioNode, time: number, dur: number) => {
  const ctx = dest.context
  const count = Math.ceil(ctx.sampleRate * dur)
  const buf = new AudioBuffer({ length: count, sampleRate: ctx.sampleRate })
  const data = buf.getChannelData(0)
  for (let i = 0; i < count; i++) {
    data[i] = Math.random() * 2 - 1
  }
  const src = new AudioBufferSourceNode(ctx, { buffer: buf })
  src.connect(dest)
  src.start(time)
}

export const soundEffects: Record<string, SynthFn> = {
  blip: (n, e) => {
    const t = 392 * 2 ** ((Math.random() * 5) / 12)
    oscTone(n, e, 'triangle', t * 1.25, t, 0.07, 0.1)
  },
  pat: (n, e) => {
    oscTone(n, e, 'sine', 523, 587, 0.16, 0.13)
    oscTone(n, e + 0.13, 'sine', 659, 784, 0.3, 0.12)
  },
  surprise: (n, e) => {
    oscTone(n, e, 'triangle', 330, 990, 0.2, 0.14)
  },
  giggle: (n, e) => {
    ;[988, 880, 932, 784].forEach((t, o) => oscTone(n, e + o * 0.12, 'triangle', t, t * 1.12, 0.1, 0.13))
  },
  grab: (n, e) => {
    modPitch(oscTone(n, e, 'triangle', 196, 523, 0.4, 0.14), e, 14, 14, 0.4)
  },
  drop: (n, e) => {
    modPitch(oscTone(n, e, 'sine', 392, 220, 0.7, 0.15), e, 11, 80, 0.7)
  },
  sleep: (n, e) => {
    const t = new BiquadFilterNode(n.context, { type: 'lowpass', Q: 6 })
    t.frequency.setValueAtTime(400, e)
    t.frequency.linearRampToValueAtTime(1100, e + 0.4)
    t.frequency.linearRampToValueAtTime(300, e + 1.1)
    t.connect(n)

    const o = new GainNode(n.context, { gain: 0 })
    o.gain.setValueAtTime(0, e)
    o.gain.linearRampToValueAtTime(0.075, e + 0.3)
    o.gain.linearRampToValueAtTime(0.06, e + 0.8)
    o.gain.linearRampToValueAtTime(0, e + 1.2)
    o.connect(t)

    const a = new OscillatorNode(n.context, { type: 'sawtooth' })
    a.frequency.setValueAtTime(262, e)
    a.frequency.linearRampToValueAtTime(349, e + 0.35)
    a.frequency.linearRampToValueAtTime(175, e + 1.2)
    a.connect(o)
    a.start(e)
    a.stop(e + 1.2)
  },
  wake: (n, e) => {
    oscTone(n, e, 'triangle', 587, 880, 0.06, 0.14)
    oscTone(n, e + 0.07, 'triangle', 880, 1319, 0.12, 0.14)
  },
  dizzy: (n, e) => {
    modPitch(oscTone(n, e, 'sine', 880, 330, 1.2, 0.13), e, 7, 70, 1.2)
  },
  laugh: (n, e) => {
    ;[988, 932, 880, 831, 784, 740, 698, 659].forEach((t, o) =>
      oscTone(n, e + o * 0.13, 'triangle', t, t * 1.12, 0.1, 0.13),
    )
  },
  sulk: (n, e) => {
    oscTone(n, e, 'triangle', 262, 247, 0.12, 0.12)
    oscTone(n, e + 0.15, 'triangle', 220, 165, 0.3, 0.12)
  },
  sniffle: (n, e) => {
    oscTone(n, e, 'sine', 392, 523, 0.3, 0.1)
    oscTone(n, e + 0.6, 'sine', 440, 659, 0.35, 0.1)
  },
  sneeze: (n, e) => {
    const t = new BiquadFilterNode(n.context, { type: 'bandpass', Q: 1.2 })
    t.frequency.setValueAtTime(2600, e)
    t.frequency.exponentialRampToValueAtTime(700, e + 0.3)
    t.connect(createEnv(n, e, 0.35, 0.3))
    noiseBurst(t, e, 0.3)
    oscTone(n, e, 'triangle', 880, 220, 0.25, 0.1)
  },
  dance: (n, e) => {
    ;[523, 659, 784, 659, 587, 740, 880, 1047].forEach((t, o) =>
      oscTone(n, e + o * 0.2, 'triangle', t, t, 0.12, 0.11),
    )
  },
  panic: (n, e) => {
    ;[988, 740, 988, 740, 988, 740, 988, 740].forEach((t, o) =>
      oscTone(n, e + o * 0.1, 'triangle', t, t, 0.08, 0.1),
    )
  },
  fly: (n, e) => {
    modPitch(oscTone(n, e, 'triangle', 262, 784, 1.9, 0.12), e, 9, 20, 1.9)
  },
  hiccup: (n, e) => {
    ;[0.3, 1.2, 1.8].forEach((t) => oscTone(n, e + t, 'triangle', 700, 1400, 0.07, 0.13))
  },
  peekaboo: (n, e) => {
    oscTone(n, e, 'triangle', 392, 1175, 0.18, 0.14)
    oscTone(n, e + 0.16, 'triangle', 784, 1568, 0.14, 0.12)
  },
  selfie: (n, e) => {
    const t = new BiquadFilterNode(n.context, { type: 'highpass', frequency: 2000 })
    t.connect(createEnv(n, e + 1.1, 0.25, 0.05))
    noiseBurst(t, e + 1.1, 0.05)
    oscTone(n, e + 1.1, 'square', 1800, 1200, 0.03, 0.06)
  },
  vanish: (n, e) => {
    modPitch(oscTone(n, e, 'sine', 880, 110, 1, 0.12), e, 30, 40, 1)
    modPitch(oscTone(n, e + 2, 'sine', 110, 880, 1, 0.12), e + 2, 30, 40, 1)
  },
  punch: (n, e) => {
    oscTone(n, e, 'sine', 160, 50, 0.18, 0.3)
    const t = new BiquadFilterNode(n.context, { type: 'lowpass', frequency: 900 })
    t.connect(createEnv(n, e, 0.3, 0.08))
    noiseBurst(t, e, 0.08)
  },
  bonk: (n, e) => {
    oscTone(n, e, 'triangle', 880, 440, 0.12, 0.2)
    oscTone(n, e, 'sine', 220, 110, 0.15, 0.2)
  },
  bell: (n, e) => {
    ;[0, 0.22].forEach((t) => {
      oscTone(n, e + t, 'sine', 1319, 1319, 0.6, 0.12)
      oscTone(n, e + t, 'sine', 3296, 3296, 0.3, 0.05)
    })
  },
  whoosh: (n, e) => {
    const t = new BiquadFilterNode(n.context, { type: 'bandpass', Q: 0.8 })
    t.frequency.setValueAtTime(300, e)
    t.frequency.exponentialRampToValueAtTime(1800, e + 0.45)
    t.frequency.exponentialRampToValueAtTime(500, e + 0.9)

    const o = new GainNode(n.context, { gain: 0 })
    o.gain.setValueAtTime(0, e)
    o.gain.linearRampToValueAtTime(0.2, e + 0.4)
    o.gain.linearRampToValueAtTime(0, e + 0.9)
    t.connect(o).connect(n)
    noiseBurst(t, e, 0.9)
  },
  scratch: (n, e) => {
    const t = new BiquadFilterNode(n.context, { type: 'bandpass', frequency: 2500 + Math.random() * 2500, Q: 0.9 })
    t.connect(createEnv(n, e, 0.08, 0.05))
    noiseBurst(t, e, 0.05)
  },
  shatter: (n, e) => {
    const t = new BiquadFilterNode(n.context, { type: 'highpass', frequency: 1500 })
    t.connect(createEnv(n, e, 0.2, 0.3))
    noiseBurst(t, e, 0.3)
    ;[523, 659, 784, 1047].forEach((o, a) => oscTone(n, e + 0.08 + a * 0.08, 'triangle', o, o, 0.2, 0.12))
  },
}

class SoundEngine {
  private ctx: AudioContext | null = null
  private enabled: boolean = false
  private listeners: Set<(enabled: boolean) => void> = new Set()
  private lastSayTime = 0

  constructor() {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('sound')
      this.enabled = stored === 'on' || localStorage.getItem('portfolio_sound_enabled') === 'true'

      // Listen to sebg.ch mascot events
      window.addEventListener('mascot:say', () => {
        const now = performance.now()
        if (now - this.lastSayTime < 120) return
        this.lastSayTime = now
        this.play('blip')
      })

      window.addEventListener('mascot:react', (evt: Event) => {
        const custom = evt as CustomEvent<string>
        if (custom.detail) {
          this.play(custom.detail)
        }
      })
    }
  }

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (AudioCtx) {
        this.ctx = new AudioCtx()
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
  }

  public isEnabled(): boolean {
    return this.enabled
  }

  public toggle(): boolean {
    this.enabled = !this.enabled
    if (this.enabled) {
      this.initContext()
      this.play('blip')
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem('sound', this.enabled ? 'on' : 'off')
      localStorage.setItem('portfolio_sound_enabled', String(this.enabled))
    }
    this.listeners.forEach((fn) => fn(this.enabled))
    return this.enabled
  }

  public subscribe(fn: (enabled: boolean) => void): () => void {
    this.listeners.add(fn)
    return () => this.listeners.delete(fn)
  }

  /** Plays any of the 26 sebg.ch procedural synthesizer effects */
  public play(name: string) {
    if (!this.enabled) return
    this.initContext()
    if (!this.ctx || this.ctx.state !== 'running') return

    const synth = soundEffects[name]
    if (synth) {
      try {
        synth(this.ctx.destination, this.ctx.currentTime)
      } catch {
        // AudioContext glitch fallback
      }
    }
  }

  /** Alias methods for existing codebase calls */
  public playPop(_frequency = 420) {
    this.play('blip')
  }

  public playChime() {
    this.play('bell')
  }

  public playTrick() {
    const tricks = ['dance', 'selfie', 'vanish', 'bonk', 'peekaboo']
    const pick = tricks[Math.floor(Math.random() * tricks.length)]
    this.play(pick)
  }

  public playGrab() {
    this.play('grab')
  }

  public playDrop() {
    this.play('drop')
  }
}

export const sound = new SoundEngine()
