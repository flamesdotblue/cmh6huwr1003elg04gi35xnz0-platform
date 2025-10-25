import React from 'react'
import { motion } from 'framer-motion'
import { Rocket } from 'lucide-react'

function LogoS() {
  return (
    <motion.div
      initial={{ rotateX: -15, rotateY: 15, opacity: 0 }}
      animate={{ rotateX: 0, rotateY: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 120, damping: 14, delay: 0.1 }}
      className="relative h-16 w-16 md:h-20 md:w-20"
      style={{ perspective: 800 }}
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-600 shadow-[inset_0_-2px_12px_rgba(0,0,0,0.4),0_8px_40px_rgba(0,150,255,0.35)]"></div>
      <svg className="absolute inset-0" viewBox="0 0 100 100" fill="none">
        <defs>
          <linearGradient id="sgrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#e2e8f0" />
            <stop offset="100%" stopColor="#94a3b8" />
          </linearGradient>
        </defs>
        <path
          d="M70 20c-8-4-20-4-28 0-6 3-9 9-6 14 3 5 11 7 18 8 7 1 12 2 15 5 4 4 2 10-3 13-7 4-18 4-25 1"
          stroke="url(#sgrad)"
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#f1)"
        />
        <defs>
          <filter id="f1" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#0ea5e9" floodOpacity="0.5" />
          </filter>
        </defs>
      </svg>
      <div className="absolute -inset-1 -z-10 blur-2xl opacity-50 bg-[conic-gradient(from_120deg_at_50%_50%,rgba(59,130,246,0.2),rgba(16,185,129,0.2),rgba(59,130,246,0.2))]"></div>
    </motion.div>
  )
}

export default function Header() {
  return (
    <header className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_400px_at_20%_-20%,rgba(59,130,246,0.15),transparent),radial-gradient(700px_300px_at_80%_0%,rgba(16,185,129,0.15),transparent)]" />
      <div className="mx-auto max-w-7xl px-4 pt-12 pb-10 md:pt-16 md:pb-14">
        <div className="flex items-center gap-4">
          <LogoS />
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <h1 className="text-2xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-zinc-50 to-zinc-400">
              Skill.Connect
            </h1>
            <p className="text-zinc-400 text-sm md:text-base">Peer-to-peer learning. Simple. Powerful.</p>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mt-8 md:mt-12"
        >
          <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/0 p-6 md:p-10 shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_40px_120px_rgba(59,130,246,0.15)]">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="max-w-2xl">
                <h2 className="text-xl md:text-2xl font-semibold">Teach what you know. Learn what you love.</h2>
                <p className="text-zinc-400 mt-2">
                  Create a profile with your strengths, upload teaching videos, and let the community find you. Search for peers
                  who can help you grow.
                </p>
              </div>
              <div className="flex items-center gap-3 text-sm text-zinc-300">
                <Rocket className="h-5 w-5 text-sky-400" />
                <span>Launch your learning journey</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </header>
  )
}
