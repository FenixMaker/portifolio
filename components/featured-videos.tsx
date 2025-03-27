"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { VideoModal } from "@/components/video-modal"
import { VideoCard } from "@/components/video-card"
import { motion } from "framer-motion"
import { ArrowRight, Loader2, AlertTriangle, Youtube } from "lucide-react"
import TikTokIcon from "@/components/icons/tiktok-icon"
import { timeAgo } from "@/lib/youtube"

export function FeaturedVideos() {
  const [videoModal, setVideoModal] = useState({
    isOpen: false,
    videoId: "",
    title: "",
  })

  const [youtubeVideos, setYoutubeVideos] = useState<any[]>([])
  const [tiktokVideos, setTiktokVideos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [usingFallback, setUsingFallback] = useState(false)
  
  const [activeTab, setActiveTab] = useState("youtube")

  useEffect(() => {
    async function fetchVideos() {
      try {
        setLoading(true)
        setError(null)
        setUsingFallback(false)

        const youtubeResponse = await fetch("/api/youtube?channelId=UCzb-8Ly6KmZOMbpQCDYJs_g&maxResults=6")
        const tiktokResponse = await fetch("/api/tiktok?username=fenixposts")

        if (youtubeResponse.ok && tiktokResponse.ok) {
          const youtubeData = await youtubeResponse.json()
          const tiktokData = await tiktokResponse.json()

          if (youtubeData.success && youtubeData.data.length > 0) {
            const processedYoutubeVideos = youtubeData.data.map((video: any) => ({
              ...video,
              date: video.publishedAt ? timeAgo(video.publishedAt) : "",
            }))
            setYoutubeVideos(processedYoutubeVideos)
          } else {
            throw new Error("Nenhum vídeo do YouTube encontrado")
          }

          if (tiktokData.success && tiktokData.data.length > 0) {
            setTiktokVideos(tiktokData.data)
          } else {
            throw new Error("Nenhum vídeo do TikTok encontrado")
          }

          if (youtubeData.message) {
            console.log(youtubeData.message)
            setUsingFallback(true)
            setError("Usando dados de exemplo. Para ver seus vídeos reais, verifique a chave de API do YouTube.")
          }
        } else {
          throw new Error("Falha ao buscar vídeos")
        }
      } catch (error) {
        console.error("Erro ao buscar vídeos:", error)
        setError("Não foi possível carregar os vídeos do YouTube. Usando dados de exemplo.")
        setUsingFallback(true)

        setYoutubeVideos([
          {
            id: 1,
            title: "COMPILADO DE MELHORES MOMENTOS DAS LIVES",
            description: "Uma seleção dos momentos mais engraçados e incríveis das lives",
            thumbnail: "/placeholder.svg?height=400&width=600",
            views: "171",
            likes: "24",
            category: "Compilação",
            date: "1 ano atrás",
            publishedAt: new Date("2022-01-01").toISOString(),
            videoId: "dQw4w9WgXcQ",
          },
          {
            id: 2,
            title: "TUTORIAL: COMO FAZER UMA FARM AUTOMÁTICA NO MINECRAFT",
            description: "Aprenda a construir uma farm eficiente e automática",
            thumbnail: "/placeholder.svg?height=400&width=600",
            views: "342",
            likes: "56",
            category: "Tutorial",
            date: "8 meses atrás",
            publishedAt: new Date("2022-06-01").toISOString(),
            videoId: "dQw4w9WgXcQ",
          },
          {
            id: 3,
            title: "JOGANDO MINECRAFT COM MODS INSANOS",
            description: "Explorando os mods mais loucos da comunidade",
            thumbnail: "/placeholder.svg?height=400&width=600",
            views: "215",
            likes: "38",
            category: "Gameplay",
            date: "6 meses atrás",
            publishedAt: new Date("2022-08-01").toISOString(),
            videoId: "dQw4w9WgXcQ",
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchVideos()
  }, [])

  const openVideoModal = (videoId: string, title: string) => {
    setVideoModal({
      isOpen: true,
      videoId,
      title,
    })
  }

  const closeVideoModal = () => {
    setVideoModal({
      ...videoModal,
      isOpen: false,
    })
  }

  const recentVideos = [...youtubeVideos].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  ).slice(0, 6)

  const videosToDisplay = activeTab === "youtube" ? youtubeVideos : tiktokVideos

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-zinc-950 to-zinc-900">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Conteúdo em Destaque
          </h2>
          <p className="mt-4 text-zinc-400">Confira meus últimos vídeos e conteúdos</p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="flex items-center p-1 border border-zinc-800 rounded-lg bg-zinc-900/50 backdrop-blur-sm">
            <button
              onClick={() => setActiveTab("youtube")}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                activeTab === "youtube"
                  ? "bg-red-500/10 text-red-500"
                  : "text-zinc-400 hover:text-zinc-300"
              }`}
            >
              <Youtube className="h-5 w-5" />
              <span>YouTube</span>
            </button>
            <button
              onClick={() => setActiveTab("tiktok")}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                activeTab === "tiktok"
                  ? "bg-cyan-500/10 text-cyan-400"
                  : "text-zinc-400 hover:text-zinc-300"
              }`}
            >
              <TikTokIcon className="h-5 w-5" />
              <span>TikTok</span>
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 text-red-500 animate-spin" />
          </div>
        ) : (
          <div>
            <div className="text-center mb-6">
              {activeTab === "youtube" && (
                <p className="text-zinc-300 italic">Mostrando vídeos do YouTube</p>
              )}
              {activeTab === "tiktok" && (
                <p className="text-zinc-300 italic">Mostrando vídeos do TikTok</p>
              )}
            </div>
            
            {activeTab === "youtube" && recentVideos.length > 0 ? (
              <div className="mx-auto grid max-w-5xl grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {recentVideos.map((video, index) => (
                  <VideoCard key={video.id} video={video} onPlay={openVideoModal} index={index} />
                ))}
              </div>
            ) : activeTab === "tiktok" && tiktokVideos.length > 0 ? (
              <div className="mx-auto grid max-w-5xl grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {tiktokVideos.map((video, index) => (
                  <VideoCard key={video.id} video={video} onPlay={openVideoModal} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-zinc-400">Nenhum vídeo encontrado nesta categoria.</p>
              </div>
            )}
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center mt-8">
            <AlertTriangle className="h-5 w-5 text-amber-400" />
            <p className="mt-2 text-sm text-amber-400">{error}</p>
          </div>
        )}

        <VideoModal
          videoId={videoModal.videoId || ""}
          isOpen={videoModal.isOpen}
          onClose={closeVideoModal}
          title={videoModal.title || "Vídeo indisponível"}
        />
      </div>
    </section>
  )
}

