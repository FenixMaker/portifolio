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

  const [videos, setVideos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [usingFallback, setUsingFallback] = useState(false)
  
  // Atualizado para incluir três opções
  const [activeTab, setActiveTab] = useState("recentes")

  useEffect(() => {
    async function fetchVideos() {
      try {
        setLoading(true)
        setError(null)
        setUsingFallback(false)

        // Usar o ID do canal fornecido
        const response = await fetch("/api/youtube?channelId=UCzb-8Ly6KmZOMbpQCDYJs_g&maxResults=6")

        if (!response.ok) {
          throw new Error("Falha ao buscar vídeos")
        }

        const data = await response.json()

        if (data.success && data.data.length > 0) {
          // Guarde o publishedAt original e processe a data para exibição
          const processedVideos = data.data.map((video: any) => ({
            ...video,
            date: video.publishedAt ? timeAgo(video.publishedAt) : "",
          }))

          setVideos(processedVideos)

          if (data.message) {
            console.log(data.message)
            setUsingFallback(true)
            setError("Usando dados de exemplo. Para ver seus vídeos reais, verifique a chave de API do YouTube.")
          }
        } else {
          throw new Error("Nenhum vídeo encontrado")
        }
      } catch (error) {
        console.error("Erro ao buscar vídeos:", error)
        setError("Não foi possível carregar os vídeos do YouTube. Usando dados de exemplo.")
        setUsingFallback(true)

        // Usar dados de exemplo em caso de erro
        setVideos([
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
  const shortVideos = videos.filter(isShort);
  const longVideos = videos.filter(video => !isShort(video));
  
  // Todos os vídeos ordenados por data de publicação (mais recentes primeiro)
  const recentVideos = [...videos].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  ).slice(0, 6) // Limitar aos 6 mais recentes

  // Remover o debug code que estava causando problemas
  useEffect(() => {
    if (!loading && videos.length > 0) {
      console.log("Distribuição de vídeos:");
      console.log("Total de vídeos:", videos.length);
      console.log("Vídeos curtos/shorts:", shortVideos.length);
      console.log("Vídeos longos:", longVideos.length);
    }
  }, [videos, loading]);
  
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-zinc-950 to-zinc-900">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">Meu Conteúdo</h2>
          <p className="mt-3 text-zinc-400 max-w-2xl mx-auto">
            Confira meus vídeos organizados por categoria. Selecione uma opção abaixo para filtrar o conteúdo.
          </p>
        </div>
        
        {/* Navegação de abas atualizada */}
        <div className="flex flex-wrap justify-center mb-10">
          <button
            onClick={() => setActiveTab("recentes")}
            className={`px-4 py-2 mx-2 my-1 rounded ${activeTab === "recentes" ? "bg-red-500 text-white" : "bg-zinc-800 text-zinc-400"}`}
          >
            Vídeos Mais Recentes
          </button>
          <button
            onClick={() => setActiveTab("longos")}
            className={`px-4 py-2 mx-2 my-1 rounded ${activeTab === "longos" ? "bg-red-500 text-white" : "bg-zinc-800 text-zinc-400"}`}
          >
            Vídeos Longos
          </button>
          <button
            onClick={() => setActiveTab("curtos")}
            className={`px-4 py-2 mx-2 my-1 rounded ${activeTab === "curtos" ? "bg-red-500 text-white" : "bg-zinc-800 text-zinc-400"}`}
          >
            Vídeos Curtos
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
            {activeTab === "recentes" && recentVideos.length > 0 ? (
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

