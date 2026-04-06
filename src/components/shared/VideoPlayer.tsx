"use client"

import { useRef, useState } from "react"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"

interface VideoPlayerProps {
  src: string
  title: string
  duration: string
  className?: string
}

export function VideoPlayer({ src, title, duration, className = "" }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(true)
  const [muted, setMuted] = useState(true)

  const togglePlay = () => {
    if (!videoRef.current) return
    if (videoRef.current.paused) {
      videoRef.current.play()
      setPlaying(true)
    } else {
      videoRef.current.pause()
      setPlaying(false)
    }
  }

  const toggleMute = () => {
    if (!videoRef.current) return
    videoRef.current.muted = !videoRef.current.muted
    setMuted(videoRef.current.muted)
  }

  return (
    <div className={`overflow-hidden rounded-xl border bg-black ${className}`}>
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-white/10 bg-black/80 px-4 py-2.5">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex size-2 rounded-full bg-[#2DD4BF]" />
          <span className="text-sm font-medium text-white/90">{title}</span>
        </div>
        <span className="text-xs text-white/40">{duration}</span>
      </div>

      {/* Video */}
      <div className="relative aspect-video bg-black">
        <video
          ref={videoRef}
          src={src}
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-contain"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />

        {/* Controls overlay */}
        <div className="absolute bottom-0 left-0 right-0 flex items-center gap-3 bg-gradient-to-t from-black/60 to-transparent px-4 py-3 opacity-0 transition-opacity hover:opacity-100">
          <button
            onClick={togglePlay}
            className="flex size-8 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20"
            aria-label={playing ? "Pause" : "Play"}
          >
            {playing ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
          </button>
          <button
            onClick={toggleMute}
            className="flex size-8 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20"
            aria-label={muted ? "Unmute" : "Mute"}
          >
            {muted ? <VolumeX className="size-3.5" /> : <Volume2 className="size-3.5" />}
          </button>
          <span className="ml-auto text-xs text-white/50">uktools</span>
        </div>
      </div>
    </div>
  )
}
