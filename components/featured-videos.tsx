"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { VideoModal } from "@/components/video-modal"
import { VideoCard } from "@/components/video-card"
import { motion } from "framer-motion"
import { ArrowRight, Loader2, AlertTriangle } from "lucide-react"
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
  
  // Atualizado para incluir três opções
  const [activeTab, setActiveTab] = useState("youtube") // Adicionado estado para alternar abas

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

        // Usar dados de exemplo em caso de erro
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

  // Função robusta para identificar vídeos curtos (shorts)
  const isShort = (video: any) => {
    const categoryIsShort = video.category && video.category.toLowerCase() === "shorts";
    const urlIsShort = video.url && video.url.toLowerCase().includes("/shorts/");
    const titleIsShort = video.title && /(#shorts\b|#short\b)/i.test(video.title);
    return categoryIsShort || urlIsShort || titleIsShort;
  }
  
  // Separação dos vídeos em shorts e longos
  const shortVideos = youtubeVideos.filter(isShort);
  const longVideos = youtubeVideos.filter(video => !isShort(video));
  
  // Todos os vídeos ordenados por data de publicação (mais recentes primeiro)
  const recentVideos = [...youtubeVideos].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  ).slice(0, 6) // Limitar aos 6 mais recentes

  // Remover o debug code que estava causando problemas
  useEffect(() => {
    if (!loading && youtubeVideos.length > 0) {
      console.log("Distribuição de vídeos:");
      console.log("Total de vídeos:", youtubeVideos.length);
      console.log("Vídeos curtos/shorts:", shortVideos.length);
      console.log("Vídeos longos:", longVideos.length);
    }
  }, [youtubeVideos, loading]);
  
  const videosToDisplay = activeTab === "youtube" ? youtubeVideos : tiktokVideos

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-zinc-950 to-zinc-900">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">Meu Conteúdo</h2>
          <p className="mt-3 text-zinc-400 max-w-2xl mx-auto">
            Confira meus vídeos organizados por plataforma. Selecione uma opção abaixo para filtrar o conteúdo.
          </p>
        </div>
        
        {/* Navegação de abas atualizada */}
        <div className="flex flex-wrap justify-center mb-10">
          <button
            onClick={() => setActiveTab("youtube")}
            className={`px-4 py-2 mx-2 my-1 rounded ${activeTab === "youtube" ? "bg-red-500 text-white" : "bg-zinc-800 text-zinc-400"}`}
          >
            YouTube
          </button>
          <button
            onClick={() => setActiveTab("tiktok")}
            className={`px-4 py-2 mx-2 my-1 rounded ${activeTab === "tiktok" ? "bg-cyan-500 text-white" : "bg-zinc-800 text-zinc-400"}`}
          >
            TikTok
          </button>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 text-red-500 animate-spin" />
          </div>
        ) : (
          <div>
            {/* Título da categoria atual */}
            <div className="text-center mb-6">
              {activeTab === "recentes" && (
                <p className="text-zinc-300 italic">Mostrando os vídeos mais recentes em ordem cronológica</p>
              )}
              {activeTab === "longos" && (
                <p className="text-zinc-300 italic">Mostrando vídeos longos com conteúdo mais detalhado</p>
              )}
              {activeTab === "curtos" && (
                <p className="text-zinc-300 italic">Mostrando shorts e vídeos rápidos</p>
              )}
            </div>
            
            {/* Renderização condicional com base na aba selecionada */}
            {activeTab === "youtube" && recentVideos.length > 0 ? (
              <div className="mx-auto grid max-w-5xl grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {recentVideos.map((video, index) => (
                  <VideoCard key={video.id} video={video} onPlay={openVideoModal} index={index} />
                ))}
              </div>
            ) : activeTab === "longos" && longVideos.length > 0 ? (
              <div className="mx-auto grid max-w-5xl grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {longVideos.map((video, index) => (
                  <VideoCard key={video.id} video={video} onPlay={openVideoModal} index={index} />
                ))}
              </div>
            ) : activeTab === "curtos" && shortVideos.length > 0 ? (
              <div className="mx-auto grid max-w-5xl grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {shortVideos.map((video, index) => (
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

