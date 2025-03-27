"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Eye, ThumbsUp, Calendar } from "lucide-react"
import { formatNumber } from "@/lib/youtube"
import { motion } from "framer-motion"

interface VideoCardProps {
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
  onPlay: (videoId: string, title: string) => void
  index: number
}

export function VideoCard({ video, onPlay, index }: VideoCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card
        className="overflow-hidden bg-zinc-900 border-zinc-800 hover:border-red-500/50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-red-500/10"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className="relative aspect-video overflow-hidden cursor-pointer"
          onClick={() => onPlay(video.videoId, video.title)}
        >
          <Image
            src={video.thumbnail || "/placeholder.svg?height=400&width=600"}
            alt={video.title}
            width={600}
            height={400}
            className={`object-cover transition-transform duration-700 ${isHovered ? "scale-110" : "scale-100"}`}
          />
          <div
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 bg-black/60 ${isHovered ? "opacity-100" : "opacity-0"}`}
          >
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-red-600/80 backdrop-blur-sm border-red-500/40 hover:bg-red-600 transform transition-transform duration-300 hover:scale-110"
            >
              <Play className="h-6 w-6 text-white" />
            </Button>
          </div>
          <div className="absolute top-2 right-2">
            <span className="px-2 py-1 text-xs font-medium bg-red-500 text-white rounded-full">{video.category}</span>
          </div>
        </div>
        <CardContent className="p-4">
          <div className="space-y-2">
            <h3
              className="font-bold line-clamp-2 cursor-pointer hover:text-red-500 transition-colors"
              onClick={() => onPlay(video.videoId, video.title)}
            >
              {video.title}
            </h3>
            <p className="text-sm text-zinc-400 line-clamp-2">{video.description}</p>
            <div className="flex items-center gap-4 pt-2">
              <div className="flex items-center gap-1 text-xs text-zinc-400">
                <Eye className="h-3 w-3" /> {formatNumber(video.views)}
              </div>
              <div className="flex items-center gap-1 text-xs text-zinc-400">
                <ThumbsUp className="h-3 w-3" /> {formatNumber(video.likes)}
              </div>
              {video.date && (
                <div className="flex items-center gap-1 text-xs text-zinc-400">
                  <Calendar className="h-3 w-3" /> {video.date}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

