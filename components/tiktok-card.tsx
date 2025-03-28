"use client"

import { useState } from "react"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Eye, ThumbsUp } from "lucide-react"
import { formatNumber } from "@/lib/youtube"
import { motion } from "framer-motion"
import TikTokIcon from "./icons/tiktok-icon"

interface TikTokCardProps {
  video: {
    id: string
    title: string
    description: string
    thumbnail: string
    views: string
    likes: string
    category: string
    date?: string
    videoId: string
  }
  onPlay: (videoId: string, title: string, platform: string) => void
  index: number
}

export function TikTokCard({ video, onPlay, index }: TikTokCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -5 }}
    >
      <Card
        className="overflow-hidden bg-zinc-900 border-zinc-800 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 max-w-[180px] mx-auto p-0"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className="relative overflow-hidden cursor-pointer aspect-[9/16] w-full"
          onClick={() => onPlay(video.videoId, video.title, "tiktok")}
        >
          <Image
            src={video.thumbnail || "/placeholder.svg?height=400&width=600"}
            alt={video.title}
            fill
            className={`object-cover transition-transform duration-700 ${isHovered ? "scale-110" : "scale-100"}`}
          />
          <div
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 bg-gradient-to-t from-black/80 via-black/40 to-transparent ${isHovered ? "opacity-100" : "opacity-70"}`}
          >
            {isHovered && (
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-cyan-600/80 backdrop-blur-sm border-cyan-500/40 hover:bg-cyan-600 transform transition-transform duration-300 hover:scale-110"
              >
                <Play className="h-5 w-5 text-white" />
              </Button>
            )}
          </div>

          {/* Categoria no topo */}
          <div className="absolute top-2 right-2">
            <span className="px-2 py-1 text-xs font-medium bg-cyan-500 text-white rounded-full flex items-center gap-1">
              <TikTokIcon className="h-3 w-3" />
              <span>{video.category}</span>
            </span>
          </div>

          {/* Informações no fundo */}
          <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/90 to-transparent">
            <h3 className="font-bold text-sm line-clamp-1 text-white">{video.title}</h3>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center gap-1 text-xs text-zinc-300">
                <Eye className="h-3 w-3" /> {formatNumber(video.views)}
              </div>
              <div className="flex items-center gap-1 text-xs text-zinc-300">
                <ThumbsUp className="h-3 w-3" /> {formatNumber(video.likes)}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

