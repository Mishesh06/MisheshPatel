/**
 * CareerGapMockup — 3-slide interactive conceptual vector mockup for Career Gap Analyzer.
 *
 * Implements:
 *  - Slide 0: Resume ingestion, entity extraction & timeline reconstruction
 *  - Slide 1: Interactive ATS Resume Scan Simulation (live radar scan, sound feedback, 94.2% match)
 *  - Slide 2: High-leverage bridge skills & vector similarity alignment
 *  - Seamless vertical sliding transition driven by currentSlide prop
 */

import { useState } from 'react'
import { sound } from '@/utils/sound'

interface CareerGapMockupProps {
  currentSlide?: number
}

export default function CareerGapMockup({ currentSlide = 0 }: CareerGapMockupProps) {
  const [scanning, setScanning] = useState(false)
  const [scanned, setScanned] = useState(false)
  const [matchScore, setMatchScore] = useState(78)

  const handleSimulateScan = () => {
    if (scanning) return
    setScanning(true)
    sound.playPop(520)

    let progress = 78
    const interval = setInterval(() => {
      progress += 2
      if (progress >= 94) {
        clearInterval(interval)
        setMatchScore(94.2)
        setScanning(false)
        setScanned(true)
        sound.playChime()
      } else {
        setMatchScore(progress)
      }
    }, 60)
  }

  return (
    <div className="relative w-full h-[460px] bg-white text-ink overflow-hidden font-display select-none">
      {/* ── Slide Track (Slides vertically by -100% * currentSlide) ── */}
      <div
        className="w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col"
        style={{ transform: `translateY(-${currentSlide * 100}%)` }}
      >
        {/* ═════════════════════════════════════════════════════════
            SLIDE 0: Document Ingestion & Semantic Skill Parsing
        ═════════════════════════════════════════════════════════ */}
        <div className="w-full h-full shrink-0 p-6 flex flex-col justify-between bg-paper/50">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-ink/10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue animate-pulse" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-ink">
                  Document Ingestion Pipeline // PyTorch
                </span>
              </div>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-blue/10 text-blue font-semibold">
                [ CONCEPTUAL MOCKUP ]
              </span>
            </div>

            <div className="grid grid-cols-12 gap-4">
              {/* Parsed Resume Specimen */}
              <div className="col-span-7 bg-white p-4 rounded-xl border border-ink/10 shadow-sm space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-ink/50 pb-2 border-b border-ink/5">
                  <span>Candidate_Specimen.pdf</span>
                  <span className="text-emerald-600 font-semibold">OCR Verified</span>
                </div>
                <div className="space-y-1.5 text-xs text-ink/70">
                  <p className="font-semibold text-ink">Senior ML Systems Engineer</p>
                  <p className="text-[11px] leading-relaxed">
                    Designed distributed inference microservices using FastAPI and PyTorch. Implemented real-time semantic caching with Redis.
                  </p>
                </div>
                <div className="pt-2 flex flex-wrap gap-1.5">
                  <span className="px-2 py-0.5 rounded bg-blue/10 text-blue font-mono text-[10px]">PyTorch</span>
                  <span className="px-2 py-0.5 rounded bg-blue/10 text-blue font-mono text-[10px]">FastAPI</span>
                  <span className="px-2 py-0.5 rounded bg-blue/10 text-blue font-mono text-[10px]">Redis</span>
                  <span className="px-2 py-0.5 rounded bg-blue/10 text-blue font-mono text-[10px]">Docker</span>
                </div>
              </div>

              {/* Extraction Diagnostics */}
              <div className="col-span-5 bg-white p-4 rounded-xl border border-ink/10 shadow-sm flex flex-col justify-between">
                <div>
                  <span className="font-mono text-[11px] text-ink/50 uppercase tracking-wider block mb-2">
                    Entity Reconstruction
                  </span>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-ink/70">Extracted Skills</span>
                      <span className="font-mono font-bold text-ink">28 Verified</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-ink/70">Timeline Breaks</span>
                      <span className="font-mono font-bold text-amber-600">1 Detected (6mo)</span>
                    </div>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-[11px] text-amber-800 font-mono">
                  Gap identified: Career transition into Distributed AI topologies.
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs font-mono text-ink/40 pt-3 border-t border-ink/5">
            <span>Scroll to simulate ATS evaluation</span>
            <span>Screen 1 of 3</span>
          </div>
        </div>

        {/* ═════════════════════════════════════════════════════════
            SLIDE 1: Interactive ATS Resume Scan Simulation
        ═════════════════════════════════════════════════════════ */}
        <div className="w-full h-full shrink-0 p-6 flex flex-col justify-between bg-paper relative">
          {/* Laser scanning radar animation */}
          {scanning && (
            <div
              className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-blue to-transparent z-20 animate-pulse pointer-events-none"
              style={{
                top: `${(matchScore % 100)}%`,
                boxShadow: '0 0 16px rgba(34, 97, 233, 0.8)',
              }}
            />
          )}

          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-ink/10">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-ink flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                ATS Compatibility Simulation Engine
              </span>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                {scanned ? 'SIMULATION COMPLETED' : 'READY FOR SCAN'}
              </span>
            </div>

            <div className="grid grid-cols-12 gap-4">
              {/* Score Meter */}
              <div className="col-span-6 bg-white p-5 rounded-xl border border-ink/10 shadow-sm flex flex-col items-center justify-center text-center">
                <span className="font-mono text-xs text-ink/50 uppercase tracking-wider mb-1">
                  Vector Match Score
                </span>
                <span className="font-display font-black text-5xl tracking-tight text-blue">
                  {matchScore}%
                </span>
                <span className="mt-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-mono text-xs font-semibold">
                  {scanned ? '✓ Low Gap Risk // Target Ready' : 'Baseline Alignment'}
                </span>
              </div>

              {/* Interactive Simulation Controls */}
              <div className="col-span-6 bg-white p-5 rounded-xl border border-ink/10 shadow-sm flex flex-col justify-between">
                <div>
                  <span className="font-mono text-xs text-ink/50 uppercase tracking-wider block mb-2">
                    Market Benchmark
                  </span>
                  <p className="font-display text-xs text-ink/80 leading-relaxed mb-3">
                    Click below to trigger the probabilistic vector scoring model against 10,000+ senior machine learning job profiles.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleSimulateScan}
                  disabled={scanning}
                  className={`w-full py-3 px-4 rounded-xl font-display font-bold text-xs transition-all cursor-pointer shadow-md active:scale-95 flex items-center justify-center gap-2 ${
                    scanning
                      ? 'bg-ink/10 text-ink/50 cursor-not-allowed'
                      : 'bg-blue text-white hover:bg-blue/90'
                  }`}
                >
                  {scanning ? (
                    <>
                      <span className="w-3 h-3 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      <span>Evaluating Neural Vectors...</span>
                    </>
                  ) : scanned ? (
                    <span>Re-Run ATS Scan Simulation ↺</span>
                  ) : (
                    <span>Simulate ATS Resume Scan ⚡</span>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs font-mono text-ink/40 pt-3 border-t border-ink/5">
            <span>Probabilistic Gap Risk Model</span>
            <span>Screen 2 of 3</span>
          </div>
        </div>

        {/* ═════════════════════════════════════════════════════════
            SLIDE 2: High-Leverage Bridge Skills Roadmap
        ═════════════════════════════════════════════════════════ */}
        <div className="w-full h-full shrink-0 p-6 flex flex-col justify-between bg-paper/60">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-ink/10">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-ink flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue" />
                Strategic Bridge Skill Recommendation
              </span>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-blue/10 text-blue font-bold">
                TRANSITION PATHWAY
              </span>
            </div>

            <div className="space-y-3">
              <div className="bg-white p-3.5 rounded-xl border border-ink/10 shadow-sm flex items-center justify-between">
                <div>
                  <p className="font-display font-bold text-sm text-ink">Distributed Model Inference (Triton / TensorRT)</p>
                  <p className="text-xs text-ink/60">High-leverage bridge competency closes 68% of role gap.</p>
                </div>
                <span className="px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 font-mono text-xs font-bold">
                  +16.4% Match
                </span>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-ink/10 shadow-sm flex items-center justify-between">
                <div>
                  <p className="font-display font-bold text-sm text-ink">Vector Embeddings &amp; Milvus / Qdrant</p>
                  <p className="text-xs text-ink/60">Reinforces search indexing and RAG pipeline proficiency.</p>
                </div>
                <span className="px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 font-mono text-xs font-bold">
                  +12.1% Match
                </span>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-ink/10 shadow-sm flex items-center justify-between">
                <div>
                  <p className="font-display font-bold text-sm text-ink">Kubernetes AI Operator Orchestration</p>
                  <p className="text-xs text-ink/60">Production GPU cluster scheduling and workload isolation.</p>
                </div>
                <span className="px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 font-mono text-xs font-bold">
                  +9.5% Match
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs font-mono text-ink/40 pt-3 border-t border-ink/5">
            <span>Curated Skill Alignment Matrix</span>
            <span>Screen 3 of 3</span>
          </div>
        </div>
      </div>
    </div>
  )
}
