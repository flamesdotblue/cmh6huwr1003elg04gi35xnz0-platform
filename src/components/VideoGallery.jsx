import React from 'react'
import { motion } from 'framer-motion'
import { Film, Play } from 'lucide-react'

export default function VideoGallery({ videos }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Teaching videos</h3>
        <div className="text-xs text-zinc-500">{videos.length} total</div>
      </div>
      {videos.length === 0 ? (
        <div className="mt-6 rounded-xl border border-dashed border-white/10 p-6 text-center text-sm text-zinc-400">
          No videos uploaded yet. Upload a video to share your knowledge.
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {videos.map((v) => (
            <VideoCard key={v.id} video={v} />
          ))}
        </div>
      )}
    </div>
  )
}

function VideoCard({ video }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      className="group relative overflow-hidden rounded-xl border border-white/10 bg-black/40 shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_20px_60px_rgba(0,0,0,0.6)]"
    >
      <div className="relative">
        <video src={video.dataUrl} controls className="h-44 w-full object-cover" />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="rounded-full bg-white/10 p-3 backdrop-blur-md">
            <Play className="h-5 w-5 text-white" />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between gap-2 px-3 py-2 text-[11px] text-zinc-300">
        <div className="truncate"><Film className="mr-1 inline h-3 w-3 text-sky-400" /> {video.name}</div>
        <div className="truncate text-zinc-500">by {video.ownerName}</div>
      </div>
    </motion.div>
  )
}
