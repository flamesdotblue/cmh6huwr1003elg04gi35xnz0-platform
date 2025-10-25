import React, { useMemo, useRef } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, Search, Film, Upload } from 'lucide-react'

export default function Profiles({ profiles, totalCount, query, onQueryChange, onAddVideo }) {
  const empty = profiles.length === 0

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between gap-3">
        <div className="text-xl font-semibold">Community</div>
        <div className="text-xs text-zinc-500">{totalCount} total</div>
      </div>

      <div className="mt-4">
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
            <Search className="h-4 w-4 text-zinc-500" />
          </div>
          <input
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search by name, email, phone, or skill..."
            className="w-full bg-zinc-900/60 outline-none rounded-xl border border-white/10 pl-9 pr-3 py-3 text-sm focus:ring-2 focus:ring-sky-500/50"
          />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 max-h-[28rem] overflow-auto pr-1">
        {empty ? (
          <EmptyState />
        ) : (
          profiles.map((p) => <ProfileCard key={p.id} profile={p} onAddVideo={onAddVideo} />)
        )}
      </div>
    </div>
  )
}

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-white/10 bg-zinc-900/40 p-6 text-center"
    >
      <div className="text-sm text-zinc-300">No profiles found</div>
      <div className="text-xs text-zinc-500">Try a different search or create the first profile.</div>
    </motion.div>
  )
}

function ProfileCard({ profile, onAddVideo }) {
  const fileRef = useRef()
  const videos = profile.videos || []
  const initials = useMemo(() =>
    profile.name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((s) => s[0].toUpperCase())
      .join(''), [profile.name])

  const handlePick = () => fileRef.current?.click()
  const handleFile = (e) => {
    const file = e.target.files?.[0]
    if (file) onAddVideo(profile.id, file)
    if (fileRef.current) fileRef.current.value = ''
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_20px_60px_rgba(0,0,0,0.6)]"
    >
      <div className="flex items-start gap-4">
        <div className="relative h-12 w-12 shrink-0 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 text-zinc-50 flex items-center justify-center font-semibold">
          {initials}
          <div className="absolute inset-0 rounded-xl shadow-[inset_0_-8px_16px_rgba(0,0,0,0.25)]" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <div className="text-sm font-semibold leading-none">{profile.name}</div>
            {profile.languages?.length > 0 && (
              <div className="ml-1 flex flex-wrap gap-1">
                {profile.languages.slice(0, 4).map((lang, i) => (
                  <span key={i} className="text-[10px] rounded-md bg-zinc-900/60 border border-white/10 px-2 py-1 text-zinc-300">
                    {lang}
                  </span>
                ))}
                {profile.languages.length > 4 && (
                  <span className="text-[10px] rounded-md bg-zinc-900/60 border border-white/10 px-2 py-1 text-zinc-500">
                    +{profile.languages.length - 4}
                  </span>
                )}
              </div>
            )}
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-zinc-400">
            <span className="inline-flex items-center gap-1"><Mail className="h-3.5 w-3.5" /> {profile.email}</span>
            <span className="inline-flex items-center gap-1"><Phone className="h-3.5 w-3.5" /> {profile.phone}</span>
          </div>
        </div>
        <button onClick={handlePick} className="rounded-lg bg-zinc-900/60 border border-white/10 px-3 py-2 text-xs hover:bg-zinc-900/80">
          <Upload className="mr-1 inline h-3.5 w-3.5 text-sky-400" /> Add video
        </button>
        <input ref={fileRef} className="hidden" type="file" accept="video/*" onChange={handleFile} />
      </div>

      {videos.length > 0 ? (
        <div className="mt-4 grid grid-cols-2 gap-3">
          {videos.slice(0, 2).map((v) => (
            <div key={v.id} className="relative overflow-hidden rounded-lg border border-white/10 bg-black/40">
              <video src={v.dataUrl} controls className="h-28 w-full object-cover" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 text-[10px] text-zinc-300 truncate">
                <Film className="mr-1 inline h-3 w-3 text-sky-400" /> {v.name}
              </div>
            </div>
          ))}
          {videos.length > 2 && (
            <div className="col-span-2 text-[11px] text-zinc-400">+ {videos.length - 2} more in gallery</div>
          )}
        </div>
      ) : (
        <div className="mt-4 rounded-lg border border-dashed border-white/10 p-4 text-center text-xs text-zinc-400">
          No videos yet. Be the first to upload a teaching video.
        </div>
      )}
    </motion.div>
  )
}
