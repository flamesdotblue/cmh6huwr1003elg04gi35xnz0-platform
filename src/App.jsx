import React, { useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import ProfileForm from './components/ProfileForm'
import Profiles from './components/Profiles'
import VideoGallery from './components/VideoGallery'

const STORAGE_KEY = 'skillconnect_profiles_v1'

function App() {
  const [profiles, setProfiles] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })
  const [query, setQuery] = useState('')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles))
  }, [profiles])

  const handleAddProfile = async (data, initialVideoFile) => {
    const id = crypto.randomUUID()
    let videos = []
    if (initialVideoFile) {
      const url = await fileToDataUrl(initialVideoFile)
      videos.push({ id: crypto.randomUUID(), name: initialVideoFile.name, dataUrl: url })
    }
    const newProfile = {
      id,
      name: data.name.trim(),
      languages: data.languages
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      email: data.email.trim(),
      phone: data.phone.trim(),
      videos,
      createdAt: Date.now(),
    }
    setProfiles((prev) => [newProfile, ...prev])
  }

  const handleAddVideo = async (profileId, file) => {
    if (!file) return
    const url = await fileToDataUrl(file)
    setProfiles((prev) =>
      prev.map((p) =>
        p.id === profileId
          ? {
              ...p,
              videos: [{ id: crypto.randomUUID(), name: file.name, dataUrl: url }, ...(p.videos || [])],
            }
          : p
      )
    )
  }

  const filteredProfiles = useMemo(() => {
    const q = query.toLowerCase().trim()
    if (!q) return profiles
    return profiles.filter((p) => {
      const langStr = (p.languages || []).join(' ')
      return (
        p.name.toLowerCase().includes(q) ||
        p.email.toLowerCase().includes(q) ||
        p.phone.toLowerCase().includes(q) ||
        langStr.toLowerCase().includes(q)
      )
    })
  }, [profiles, query])

  const allVideos = useMemo(() => {
    return profiles.flatMap((p) => (p.videos || []).map((v) => ({ ...v, ownerName: p.name, ownerId: p.id })))
  }, [profiles])

  return (
    <div className="min-h-screen bg-[radial-gradient(1200px_700px_at_100%_-20%,rgba(40,40,80,0.35),transparent),radial-gradient(1200px_700px_at_-10%_10%,rgba(0,120,255,0.12),transparent)] bg-zinc-950 text-zinc-100">
      <Header />

      <main className="mx-auto max-w-7xl px-4 pb-24">
        <section className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="backdrop-blur-xl rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_20px_60px_rgba(0,0,0,0.6)]">
            <h2 className="text-xl md:text-2xl font-semibold tracking-tight">Add your profile</h2>
            <p className="text-zinc-400 text-sm mt-1">Share what you are great at. Help others learn.</p>
            <div className="mt-6">
              <ProfileForm onAdd={handleAddProfile} />
            </div>
          </div>

          <div className="backdrop-blur-xl rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_20px_60px_rgba(0,0,0,0.6)]">
            <Profiles
              profiles={filteredProfiles}
              totalCount={profiles.length}
              query={query}
              onQueryChange={setQuery}
              onAddVideo={handleAddVideo}
            />
          </div>
        </section>

        <section className="mt-10">
          <VideoGallery videos={allVideos} />
        </section>
      </main>

      <footer className="border-t border-white/10 py-8 text-center text-xs text-zinc-500">
        Skill.Connect • Learn by teaching. Teach by learning.
      </footer>
    </div>
  )
}

export default App

async function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}
