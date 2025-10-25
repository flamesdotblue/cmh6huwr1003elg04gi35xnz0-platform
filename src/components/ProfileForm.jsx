import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, User, Globe, Upload } from 'lucide-react'

export default function ProfileForm({ onAdd }) {
  const [name, setName] = useState('')
  const [languages, setLanguages] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [videoFile, setVideoFile] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const fileRef = useRef()

  const canSubmit = name.trim() && languages.trim() && email.trim() && phone.trim()

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!canSubmit || submitting) return
    setSubmitting(true)
    try {
      await onAdd({ name, languages, email, phone }, videoFile)
      setName('')
      setLanguages('')
      setEmail('')
      setPhone('')
      setVideoFile(null)
      if (fileRef.current) fileRef.current.value = ''
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field icon={User} label="Full name">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jane Doe"
            className="w-full bg-zinc-900/60 outline-none rounded-xl border border-white/10 px-4 py-3 text-sm focus:ring-2 focus:ring-sky-500/50"
          />
        </Field>
        <Field icon={Globe} label="Expert in (languages/skills)">
          <input
            value={languages}
            onChange={(e) => setLanguages(e.target.value)}
            placeholder="JavaScript, Python, C++"
            className="w-full bg-zinc-900/60 outline-none rounded-xl border border-white/10 px-4 py-3 text-sm focus:ring-2 focus:ring-sky-500/50"
          />
        </Field>
        <Field icon={Mail} label="Email">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full bg-zinc-900/60 outline-none rounded-xl border border-white/10 px-4 py-3 text-sm focus:ring-2 focus:ring-sky-500/50"
          />
        </Field>
        <Field icon={Phone} label="Contact number">
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="(+91) 98765 43210"
            className="w-full bg-zinc-900/60 outline-none rounded-xl border border-white/10 px-4 py-3 text-sm focus:ring-2 focus:ring-sky-500/50"
          />
        </Field>
      </div>

      <div className="flex items-center gap-3">
        <label className="inline-flex items-center gap-2 cursor-pointer">
          <input ref={fileRef} type="file" accept="video/*" onChange={(e) => setVideoFile(e.target.files?.[0] || null)} className="hidden" />
          <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-zinc-900/60 px-4 py-2 text-sm hover:bg-zinc-900/80">
            <Upload className="h-4 w-4 text-sky-400" />
            {videoFile ? `Selected: ${videoFile.name}` : 'Attach a teaching video (optional)'}
          </span>
        </label>
      </div>

      <motion.button
        whileTap={{ scale: 0.98 }}
        disabled={!canSubmit || submitting}
        className="w-full md:w-auto rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 px-6 py-3 text-sm font-medium shadow-[0_12px_30px_rgba(3,105,161,0.3)] disabled:opacity-60"
      >
        {submitting ? 'Creating...' : 'Create profile'}
      </motion.button>
    </form>
  )
}

function Field({ icon: Icon, label, children }) {
  return (
    <div>
      <label className="mb-1 block text-xs text-zinc-400">{label}</label>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Icon className="h-4 w-4 text-zinc-500" />
        </div>
        <div className="pl-9">{children}</div>
      </div>
    </div>
  )
}
