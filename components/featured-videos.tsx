"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { VideoModal } from "@/components/video-modal"
import { VideoCard } from "@/components/video-card"
import { ShortCard } from "@/components/short-card"
import { TikTokCard } from "@/components/tiktok-card"
import { motion, AnimatePresence } from "framer-motion"
import { Loader2, AlertTriangle, Youtube, ExternalLink } from "lucide-react"
import TikTokIcon from "@/components/icons/tiktok-icon"
import { timeAgo } from "@/lib/youtube"

export function FeaturedVideos() {
  const [videoModal, setVideoModal] = useState({
    isOpen: false,
    videoId: "",
    title: "",
    platform: "youtube", // youtube ou tiktok
  })

  const [youtubeVideos, setYoutubeVideos] = useState<any[]>([])
  const [youtubeShorts, setYoutubeShorts] = useState<any[]>([])
  const [tiktokVideos, setTiktokVideos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [loadingMore, setLoadingMore] = useState(false)

  const [activeTab, setActiveTab] = useState("youtube")
  const [youtubeView, setYoutubeView] = useState("videos")
  const [page, setPage] = useState(1)
  const videosPerPage = 6

  useEffect(() => {
    async function fetchVideos() {
      try {
        setLoading(true)
        setError(null)

        // Buscar vídeos do YouTube
        const youtubeResponse = await fetch("/api/youtube?channelId=UCzb-8Ly6KmZOMbpQCDYJs_g&maxResults=24")

        // Buscar vídeos do TikTok
        const tiktokResponse = await fetch("/api/tiktok/scrape?username=fenixposts")

        if (youtubeResponse.ok) {
          const youtubeData = await youtubeResponse.json()

          if (youtubeData.success && youtubeData.data.length > 0) {
            const processedYoutubeVideos = youtubeData.data.map((video: any) => ({
              ...video,
              date: video.publishedAt ? timeAgo(video.publishedAt) : "",
              // Melhorar a detecção de shorts
              isShort:
                video.title.toLowerCase().includes("#shorts") ||
                video.description.toLowerCase().includes("#shorts") ||
                video.category === "Shorts" ||
                (video.title.startsWith("#") && video.title.length < 30) ||
                // Verificar proporção da thumbnail (se disponível)
                (video.thumbnailHeight && video.thumbnailWidth && video.thumbnailHeight / video.thumbnailWidth > 1.5),
            }))

            // Separar vídeos normais e shorts corretamente
            const shorts = processedYoutubeVideos.filter((video: any) => video.isShort)
            const regularVideos = processedYoutubeVideos.filter((video: any) => !video.isShort)

            setYoutubeVideos(regularVideos)
            setYoutubeShorts(shorts)
          } else {
            throw new Error("Nenhum vídeo do YouTube encontrado")
          }
        }

        // Processar dados do TikTok
        if (tiktokResponse.ok) {
          const tiktokData = await tiktokResponse.json()

          if (tiktokData.success && tiktokData.videos.length > 0) {
            setTiktokVideos(tiktokData.videos)
          } else {
            console.warn("Nenhum vídeo do TikTok encontrado, usando dados de fallback")
            // Usar dados de fallback para TikTok
            setTiktokVideos(getTikTokFallbackData())
          }
        } else {
          console.warn("Falha ao buscar vídeos do TikTok, usando dados de fallback")
          setTiktokVideos(getTikTokFallbackData())
        }
      } catch (error) {
        console.error("Erro ao buscar vídeos:", error)
        setError("Não foi possível carregar todos os vídeos. Usando dados de exemplo.")

        // Dados de exemplo para vídeos regulares do YouTube
        setYoutubeVideos(getYouTubeVideosFallbackData())

        // Dados de exemplo para shorts do YouTube
        setYoutubeShorts(getYouTubeShortsFallbackData())

        // Dados de exemplo do TikTok
        setTiktokVideos(getTikTokFallbackData())
      } finally {
        setLoading(false)
      }
    }

    fetchVideos()
  }, [])

  const loadMoreVideos = async () => {
    setLoadingMore(true)
    // Simular carregamento de mais vídeos
    setTimeout(() => {
      setPage((prev) => prev + 1)
      setLoadingMore(false)
    }, 1000)
  }

  const openVideoModal = (videoId: string, title: string, platform = "youtube") => {
    setVideoModal({
      isOpen: true,
      videoId,
      title,
      platform,
    })
  }

  const closeVideoModal = () => {
    setVideoModal({
      ...videoModal,
      isOpen: false,
    })
  }

  // Garantir que os vídeos estejam ordenados por data
  const sortedRegularVideos = [...youtubeVideos].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  )

  const sortedShorts = [...youtubeShorts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  )

  const sortedTikTokVideos = [...tiktokVideos].sort(
    (a, b) => new Date(b.publishedAt || b.date).getTime() - new Date(a.publishedAt || a.date).getTime(),
  )

  // Paginação
  const paginatedRegularVideos = sortedRegularVideos
    .filter((video) => !video.isShort) // Garantir que não há shorts aqui
    .slice(0, page * videosPerPage)

  const paginatedShorts = sortedShorts
    .filter((video) => video.isShort) // Garantir que só há shorts aqui
    .slice(0, page * 10) // Mostrar mais shorts por página

  const paginatedTikTokVideos = sortedTikTokVideos.slice(0, page * 10)

  // Verificar se há mais vídeos para carregar
  const hasMoreRegularVideos = paginatedRegularVideos.length < sortedRegularVideos.length
  const hasMoreShorts = paginatedShorts.length < sortedShorts.length
  const hasMoreTikTokVideos = paginatedTikTokVideos.length < sortedTikTokVideos.length

  // Determinar se deve mostrar o botão "Carregar Mais"
  const showLoadMoreButton =
    (activeTab === "youtube" && youtubeView === "videos" && hasMoreRegularVideos) ||
    (activeTab === "youtube" && youtubeView === "shorts" && hasMoreShorts) ||
    (activeTab === "tiktok" && hasMoreTikTokVideos)

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-zinc-950 to-zinc-900">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-orange-500 to-purple-600">
            Conteúdo em Destaque
          </h2>
          <p className="mt-4 text-zinc-400">Confira meus últimos vídeos e conteúdos</p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="flex items-center p-1 border border-zinc-800 rounded-lg bg-zinc-900/50 backdrop-blur-sm">
            <button
              onClick={() => setActiveTab("youtube")}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                activeTab === "youtube" ? "bg-red-500/10 text-red-500" : "text-zinc-400 hover:text-zinc-300"
              }`}
            >
              <Youtube className="h-5 w-5" />
              <span>YouTube</span>
            </button>
            <button
              onClick={() => setActiveTab("tiktok")}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                activeTab === "tiktok" ? "bg-cyan-500/10 text-cyan-400" : "text-zinc-400 hover:text-zinc-300"
              }`}
            >
              <TikTokIcon className="h-5 w-5" />
              <span>TikTok</span>
            </button>
          </div>
        </div>

        {activeTab === "youtube" && (
          <div className="flex justify-center mb-6">
            <div className="flex items-center p-1 border border-zinc-800 rounded-lg bg-zinc-900/50 backdrop-blur-sm">
              <button
                onClick={() => setYoutubeView("videos")}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                  youtubeView === "videos" ? "bg-red-500/10 text-red-500" : "text-zinc-400 hover:text-zinc-300"
                }`}
              >
                <span>Vídeos</span>
              </button>
              <button
                onClick={() => setYoutubeView("shorts")}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                  youtubeView === "shorts" ? "bg-red-500/10 text-red-500" : "text-zinc-400 hover:text-zinc-300"
                }`}
              >
                <span>Shorts</span>
              </button>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 text-red-500 animate-spin" />
          </div>
        ) : (
          <div>
            <div className="text-center mb-6">
              {activeTab === "youtube" && youtubeView === "videos" && (
                <p className="text-zinc-300 italic">Vídeos do YouTube</p>
              )}
              {activeTab === "youtube" && youtubeView === "shorts" && (
                <p className="text-zinc-300 italic">Shorts do YouTube</p>
              )}
              {activeTab === "tiktok" && <p className="text-zinc-300 italic">Vídeos do TikTok</p>}
            </div>

            <AnimatePresence mode="wait">
              {activeTab === "youtube" && youtubeView === "videos" && paginatedRegularVideos.length > 0 ? (
                <motion.div
                  key="youtube-videos"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {paginatedRegularVideos.map((video, index) => (
                    <VideoCard key={video.id} video={video} onPlay={openVideoModal} index={index} />
                  ))}
                </motion.div>
              ) : activeTab === "youtube" && youtubeView === "shorts" && paginatedShorts.length > 0 ? (
                <motion.div
                  key="youtube-shorts"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mx-auto grid max-w-7xl grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3"
                >
                  {paginatedShorts.map((video, index) => (
                    <ShortCard key={video.id} video={video} onPlay={openVideoModal} index={index} />
                  ))}
                </motion.div>
              ) : activeTab === "tiktok" && paginatedTikTokVideos.length > 0 ? (
                <motion.div
                  key="tiktok-videos"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mx-auto grid max-w-7xl grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3"
                >
                  {paginatedTikTokVideos.map((video, index) => (
                    <TikTokCard key={video.id} video={video} onPlay={openVideoModal} index={index} />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="no-videos"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-12"
                >
                  <p className="text-zinc-400">Nenhum vídeo encontrado nesta categoria.</p>
                </motion.div>
              )}
            </AnimatePresence>

            {showLoadMoreButton && (
              <div className="flex justify-center mt-12">
                <Button
                  onClick={loadMoreVideos}
                  disabled={loadingMore}
                  className="bg-gradient-to-r from-red-500 via-orange-500 to-purple-600 hover:from-red-600 hover:via-orange-600 hover:to-purple-700 text-white"
                >
                  {loadingMore ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Carregando...
                    </>
                  ) : (
                    <>Carregar Mais Vídeos</>
                  )}
                </Button>
              </div>
            )}

            {activeTab === "tiktok" && (
              <div className="flex justify-center mt-8">
                <Link
                  href="https://www.tiktok.com/@fenixposts"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  <span>Ver todos os vídeos no TikTok</span>
                  <ExternalLink className="h-4 w-4" />
                </Link>
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
          platform={videoModal.platform}
        />
      </div>
    </section>
  )
}

// Funções para dados de fallback
function getYouTubeVideosFallbackData() {
  return [
    {
      id: "1",
      title: "COMPILADO DE MELHORES MOMENTOS DAS LIVES",
      description: "Uma seleção dos momentos mais engraçados e incríveis das lives",
      thumbnail: "/placeholder.svg?height=400&width=600",
      views: "171",
      likes: "24",
      category: "Compilação",
      date: "1 ano atrás",
      videoId: "dQw4w9WgXcQ",
      publishedAt: new Date("2022-01-01").toISOString(),
      isShort: false,
    },
    {
      id: "2",
      title: "TUTORIAL: COMO FAZER UMA FARM AUTOMÁTICA NO MINECRAFT",
      description: "Aprenda a construir uma farm eficiente e automática",
      thumbnail: "/placeholder.svg?height=400&width=600",
      views: "342",
      likes: "56",
      category: "Tutorial",
      date: "8 meses atrás",
      videoId: "dQw4w9WgXcQ",
      publishedAt: new Date("2022-06-01").toISOString(),
      isShort: false,
    },
    {
      id: "3",
      title: "JOGANDO MINECRAFT COM MODS INSANOS",
      description: "Explorando os mods mais loucos da comunidade",
      thumbnail: "/placeholder.svg?height=400&width=600",
      views: "215",
      likes: "38",
      category: "Gameplay",
      date: "6 meses atrás",
      videoId: "dQw4w9WgXcQ",
      publishedAt: new Date("2022-08-01").toISOString(),
      isShort: false,
    },
    {
      id: "4",
      title: "COMO ENCONTRAR DIAMANTES RAPIDAMENTE NO MINECRAFT",
      description: "Dicas e truques para encontrar diamantes de forma eficiente",
      thumbnail: "/placeholder.svg?height=400&width=600",
      views: "189",
      likes: "32",
      category: "Tutorial",
      date: "5 meses atrás",
      videoId: "dQw4w9WgXcQ",
      publishedAt: new Date("2022-09-01").toISOString(),
      isShort: false,
    },
    {
      id: "5",
      title: "CONSTRUINDO UMA CASA AUTOMÁTICA NO MINECRAFT",
      description: "Tutorial de construção com redstone e automação",
      thumbnail: "/placeholder.svg?height=400&width=600",
      views: "276",
      likes: "45",
      category: "Construção",
      date: "4 meses atrás",
      videoId: "dQw4w9WgXcQ",
      publishedAt: new Date("2022-10-01").toISOString(),
      isShort: false,
    },
    {
      id: "6",
      title: "HIGHLIGHTS DA LIVE DE ONTEM",
      description: "Os melhores momentos da transmissão ao vivo",
      thumbnail: "/placeholder.svg?height=400&width=600",
      views: "124",
      likes: "19",
      category: "Live",
      date: "3 meses atrás",
      videoId: "dQw4w9WgXcQ",
      publishedAt: new Date("2022-11-01").toISOString(),
      isShort: false,
    },
    {
      id: "7",
      title: "TOP 10 CONSTRUÇÕES MAIS INCRÍVEIS NO MINECRAFT",
      description: "As construções mais impressionantes da comunidade",
      thumbnail: "/placeholder.svg?height=400&width=600",
      views: "432",
      likes: "87",
      category: "Compilação",
      date: "2 meses atrás",
      videoId: "dQw4w9WgXcQ",
      publishedAt: new Date("2022-12-01").toISOString(),
      isShort: false,
    },
    {
      id: "8",
      title: "EXPLORANDO A NOVA ATUALIZAÇÃO DO MINECRAFT",
      description: "Todas as novidades da última atualização",
      thumbnail: "/placeholder.svg?height=400&width=600",
      views: "521",
      likes: "103",
      category: "Gameplay",
      date: "1 mês atrás",
      videoId: "dQw4w9WgXcQ",
      publishedAt: new Date("2023-01-01").toISOString(),
      isShort: false,
    },
    {
      id: "9",
      title: "COMO CRIAR UM SERVIDOR DE MINECRAFT COM AMIGOS",
      description: "Tutorial completo para criar e configurar seu servidor",
      thumbnail: "/placeholder.svg?height=400&width=600",
      views: "318",
      likes: "64",
      category: "Tutorial",
      date: "3 semanas atrás",
      videoId: "dQw4w9WgXcQ",
      publishedAt: new Date("2023-01-15").toISOString(),
      isShort: false,
    },
    {
      id: "10",
      title: "DESAFIO: SOBREVIVER COM APENAS 1 CORAÇÃO",
      description: "Tentando completar o jogo com apenas meio coração",
      thumbnail: "/placeholder.svg?height=400&width=600",
      views: "287",
      likes: "52",
      category: "Desafio",
      date: "2 semanas atrás",
      videoId: "dQw4w9WgXcQ",
      publishedAt: new Date("2023-01-22").toISOString(),
      isShort: false,
    },
    {
      id: "11",
      title: "SPEEDRUN DE MINECRAFT EM MENOS DE 30 MINUTOS",
      description: "Tentando completar o jogo o mais rápido possível",
      thumbnail: "/placeholder.svg?height=400&width=600",
      views: "412",
      likes: "78",
      category: "Speedrun",
      date: "1 semana atrás",
      videoId: "dQw4w9WgXcQ",
      publishedAt: new Date("2023-01-29").toISOString(),
      isShort: false,
    },
    {
      id: "12",
      title: "RESPONDENDO PERGUNTAS DOS INSCRITOS",
      description: "Q&A especial de 3K inscritos",
      thumbnail: "/placeholder.svg?height=400&width=600",
      views: "198",
      likes: "43",
      category: "Q&A",
      date: "3 dias atrás",
      videoId: "dQw4w9WgXcQ",
      publishedAt: new Date("2023-02-01").toISOString(),
      isShort: false,
    },
  ]
}

function getYouTubeShortsFallbackData() {
  return [
    {
      id: "s1",
      title: "ESSE JOGO É PERFEITO... #shorts",
      description: "Momentos engraçados no Minecraft #shorts #minecraft #gaming",
      thumbnail:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%7B984687C5-9AFD-405C-AB35-B690722A7AEE%7D-ljyeE4KvDK6yVpKEtVsycrZX1aikGq.png",
      views: "334",
      likes: "33",
      category: "Shorts",
      date: "1 dia atrás",
      publishedAt: new Date("2023-01-20").toISOString(),
      videoId: "dQw4w9WgXcQ",
      isShort: true,
    },
    {
      id: "s2",
      title: "#minecraft #shorts",
      description: "Construção rápida no Minecraft! #minecraft #gaming #shorts",
      thumbnail:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%7BC590197C-7F65-4BD0-911A-B3BD4177A042%7D-eqOoWALbBssLBNzvN0SmhBcSdnuEnS.png",
      views: "863",
      likes: "46",
      category: "Shorts",
      date: "1 mês atrás",
      publishedAt: new Date("2023-01-15").toISOString(),
      videoId: "dQw4w9WgXcQ",
      isShort: true,
    },
    {
      id: "s3",
      title: "#minecraft #shorts",
      description: "Dicas rápidas para iniciantes #minecraft #gaming #tutorial",
      thumbnail:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%7B9573B85B-EB4E-4F1D-8D51-1879C2A32DC0%7D-9ndHfvZmC5PK2O8er0gQyPDpMd9PC9.png",
      views: "1.2K",
      likes: "12",
      category: "Shorts",
      date: "2 meses atrás",
      publishedAt: new Date("2023-01-01").toISOString(),
      videoId: "dQw4w9WgXcQ",
      isShort: true,
    },
    {
      id: "s4",
      title: "#minecraft #shorts",
      description: "Olha o que encontrei! #minecraft #gaming",
      thumbnail:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%7B7A7325E5-243C-4E11-8F69-DCEAEB60A8A7%7D-DjJEEkXza9DMIVOJDrb5ktEckiT941.png",
      views: "863",
      likes: "46",
      category: "Shorts",
      date: "1 mês atrás",
      publishedAt: new Date("2023-01-10").toISOString(),
      videoId: "dQw4w9WgXcQ",
      isShort: true,
    },
    {
      id: "s5",
      title: "#minecraft #shorts",
      description: "Como escapar dessa situação? #minecraft #gaming",
      thumbnail:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%7B9573B85B-EB4E-4F1D-8D51-1879C2A32DC0%7D-9ndHfvZmC5PK2O8er0gQyPDpMd9PC9.png",
      views: "1.8K",
      likes: "18",
      category: "Shorts",
      date: "2 meses atrás",
      publishedAt: new Date("2022-12-15").toISOString(),
      videoId: "dQw4w9WgXcQ",
      isShort: true,
    },
    {
      id: "s6",
      title: "#minecraft #shorts",
      description: "Construção rápida! #minecraft #gaming",
      thumbnail:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%7B7A7325E5-243C-4E11-8F69-DCEAEB60A8A7%7D-DjJEEkXza9DMIVOJDrb5ktEckiT941.png",
      views: "875",
      likes: "82",
      category: "Shorts",
      date: "2 meses atrás",
      publishedAt: new Date("2022-12-10").toISOString(),
      videoId: "dQw4w9WgXcQ",
      isShort: true,
    },
    {
      id: "s7",
      title: "#minecraft #shorts",
      description: "Momentos engraçados no Minecraft #minecraft #gaming",
      thumbnail:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%7B9573B85B-EB4E-4F1D-8D51-1879C2A32DC0%7D-9ndHfvZmC5PK2O8er0gQyPDpMd9PC9.png",
      views: "1.5K",
      likes: "350",
      category: "Shorts",
      date: "3 meses atrás",
      publishedAt: new Date("2022-11-20").toISOString(),
      videoId: "dQw4w9WgXcQ",
      isShort: true,
    },
    {
      id: "s8",
      title: "#minecraft #shorts",
      description: "Dica rápida para farm! #minecraft #gaming",
      thumbnail:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%7B7A7325E5-243C-4E11-8F69-DCEAEB60A8A7%7D-DjJEEkXza9DMIVOJDrb5ktEckiT941.png",
      views: "2.2K",
      likes: "480",
      category: "Shorts",
      date: "3 meses atrás",
      publishedAt: new Date("2022-11-10").toISOString(),
      videoId: "dQw4w9WgXcQ",
      isShort: true,
    },
  ]
}

function getTikTokFallbackData() {
  return [
    {
      id: "t1",
      title: "ESSE JOGO É PERFEITO...",
      description: "SE GOSTAR DO VÍDEO DEIXA SEU LIKE ❤️ ✓ Comenta e curte o vídeo se você...",
      thumbnail:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%7B984687C5-9AFD-405C-AB35-B690722A7AEE%7D-ljyeE4KvDK6yVpKEtVsycrZX1aikGq.png",
      views: "334",
      likes: "33",
      category: "Gaming",
      date: "1 dia atrás",
      videoId: "dQw4w9WgXcQ",
      publishedAt: new Date("2023-01-15").toISOString(),
      isShort: true,
    },
    {
      id: "t2",
      title: "#minecraft",
      description: "Dicas rápidas para melhorar seu jogo! #minecraft #gaming #tips #fenixposts",
      thumbnail:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%7BC590197C-7F65-4BD0-911A-B3BD4177A042%7D-eqOoWALbBssLBNzvN0SmhBcSdnuEnS.png",
      views: "863",
      likes: "46",
      category: "Tutorial",
      date: "1 mês atrás",
      videoId: "dQw4w9WgXcQ",
      publishedAt: new Date("2023-01-01").toISOString(),
      isShort: true,
    },
    {
      id: "t3",
      title: "#minecraft",
      description: "Olha só essas construções insanas! #minecraft #reaction",
      thumbnail:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%7B9573B85B-EB4E-4F1D-8D51-1879C2A32DC0%7D-9ndHfvZmC5PK2O8er0gQyPDpMd9PC9.png",
      views: "1.2K",
      likes: "12",
      category: "Reaction",
      date: "2 meses atrás",
      videoId: "dQw4w9WgXcQ",
      publishedAt: new Date("2022-12-20").toISOString(),
      isShort: true,
    },
    {
      id: "t4",
      title: "#minecraft",
      description: "Tutorial rápido para farm de XP! #minecraft #tutorial",
      thumbnail:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%7B9573B85B-EB4E-4F1D-8D51-1879C2A32DC0%7D-9ndHfvZmC5PK2O8er0gQyPDpMd9PC9.png",
      views: "875",
      likes: "82",
      category: "Tutorial",
      date: "2 meses atrás",
      videoId: "dQw4w9WgXcQ",
      publishedAt: new Date("2022-12-01").toISOString(),
      isShort: true,
    },
    {
      id: "t5",
      title: "#minecraft",
      description: "Compilação de fails e momentos hilários! #minecraft #funny",
      thumbnail:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%7B9573B85B-EB4E-4F1D-8D51-1879C2A32DC0%7D-9ndHfvZmC5PK2O8er0gQyPDpMd9PC9.png",
      views: "1.8K",
      likes: "18",
      category: "Entretenimento",
      date: "2 meses atrás",
      videoId: "dQw4w9WgXcQ",
      publishedAt: new Date("2022-11-15").toISOString(),
      isShort: true,
    },
    {
      id: "t6",
      title: "Transformação de Base em 60 Segundos",
      description: "De cabana a mansão em um minuto! #minecraft #transformation #fenixposts",
      thumbnail:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%7B7A7325E5-243C-4E11-8F69-DCEAEB60A8A7%7D-DjJEEkXza9DMIVOJDranhila5yf.public.blob.vercel-storage.com/%7B7A7325E5-243C-4E11-8F69-DCEAEB60A8A7%7D-DjJEEkXza9DMIVOJDrb5ktEckiT941.png",
      views: "1.8K",
      likes: "420",
      category: "Construção",
      date: "3 meses atrás",
      videoId: "dQw4w9WgXcQ",
      publishedAt: new Date("2022-11-01").toISOString(),
      isShort: true,
    },
    {
      id: "t7",
      title: "Como Fazer uma Farm de XP em 1 Minuto",
      description: "Tutorial rápido para farm de XP! #minecraft #tutorial #fenixposts",
      thumbnail:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%7B9573B85B-EB4E-4F1D-8D51-1879C2A32DC0%7D-9ndHfvZmC5PK2O8er0gQyPDpMd9PC9.png",
      views: "1.5K",
      likes: "350",
      category: "Tutorial",
      date: "2 meses atrás",
      videoId: "dQw4w9WgXcQ",
      publishedAt: new Date("2022-12-01").toISOString(),
      isShort: true,
    },
    {
      id: "t8",
      title: "Momentos Engraçados no Minecraft",
      description: "Compilação de fails e momentos hilários! #minecraft #funny",
      thumbnail:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%7B7A7325E5-243C-4E11-8F69-DCEAEB60A8A7%7D-DjJEEkXza9DMIVOJDrb5ktEckiT941.png",
      views: "2.2K",
      likes: "480",
      category: "Entretenimento",
      date: "3 meses atrás",
      videoId: "dQw4w9WgXcQ",
      publishedAt: new Date("2022-11-15").toISOString(),
      isShort: true,
    },
  ]
}

