"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Youtube, Twitch, Filter, Loader2, AlertTriangle, Instagram } from "lucide-react"
import TikTokIcon from "@/components/icons/tiktok-icon"
import { VideoModal } from "@/components/video-modal"
import { VideoCard } from "@/components/video-card"
import { motion, AnimatePresence } from "framer-motion"
import { timeAgo } from "@/lib/youtube"

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("Todos")
  const [videoModal, setVideoModal] = useState({
    isOpen: false,
    videoId: "",
    title: "",
  })

  const [videos, setVideos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState(["Todos"])
  const [showFilter, setShowFilter] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [usingFallback, setUsingFallback] = useState(false)

  useEffect(() => {
    async function fetchVideos() {
      try {
        setLoading(true)
        setError(null)
        setUsingFallback(false)

        // Usar o ID do canal fornecido
        const response = await fetch("/api/youtube?channelId=UCzb-8Ly6KmZOMbpQCDYJs_g&maxResults=12")

        if (!response.ok) {
          throw new Error("Falha ao buscar vídeos")
        }

        const data = await response.json()

        if (data.success && data.data.length > 0) {
          const fetchedVideos = data.data.map((video: any) => ({
            ...video,
            date: video.publishedAt ? timeAgo(video.publishedAt) : "",
          }))

          // Garantir que o primeiro vídeo tenha dados válidos
          if (!fetchedVideos[0]?.videoId || !fetchedVideos[0]?.thumbnail) {
            fetchedVideos[0] = {
              id: "placeholder",
              title: "Vídeo indisponível",
              description: "Este vídeo não está disponível no momento.",
              thumbnail: "/placeholder.svg?height=400&width=600",
              views: "0",
              likes: "0",
              category: "Indisponível",
              date: "N/A",
              videoId: "",
            }
          }

          setVideos(fetchedVideos)

          // Extrair categorias únicas dos vídeos
          const uniqueCategories = ["Todos", ...new Set<string>(fetchedVideos.map((v: any) => v.category))]
          setCategories(uniqueCategories)

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
        setError("Não foi possível carregar os vídeos. Verifique sua conexão ou desative bloqueadores de anúncios.")
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
            category: "Compilações",
            date: "1 ano atrás",
            videoId: "dQw4w9WgXcQ",
          },
          {
            id: 2,
            title: "TUTORIAL: COMO FAZER UMA FARM AUTOMÁTICA NO MINECRAFT",
            description: "Aprenda a construir uma farm eficiente e automática",
            thumbnail: "/placeholder.svg?height=400&width=600",
            views: "342",
            likes: "56",
            category: "Tutoriais",
            date: "8 meses atrás",
            videoId: "dQw4w9WgXcQ",
          },
          {
            id: 3,
            title: "JOGANDO MINECRAFT COM MODS INSANOS",
            description: "Explorando os mods mais loucos da comunidade",
            thumbnail: "/placeholder.svg?height=400&width=600",
            views: "215",
            likes: "38",
            category: "Minecraft",
            date: "6 meses atrás",
            videoId: "dQw4w9WgXcQ",
          },
          {
            id: 4,
            title: "COMO ENCONTRAR DIAMANTES RAPIDAMENTE NO MINECRAFT",
            description: "Dicas e truques para encontrar diamantes de forma eficiente",
            thumbnail: "/placeholder.svg?height=400&width=600",
            views: "189",
            likes: "32",
            category: "Tutoriais",
            date: "5 meses atrás",
            videoId: "dQw4w9WgXcQ",
          },
          {
            id: 5,
            title: "CONSTRUINDO UMA CASA AUTOMÁTICA NO MINECRAFT",
            description: "Tutorial de construção com redstone e automação",
            thumbnail: "/placeholder.svg?height=400&width=600",
            views: "276",
            likes: "45",
            category: "Minecraft",
            date: "4 meses atrás",
            videoId: "dQw4w9WgXcQ",
          },
          {
            id: 6,
            title: "HIGHLIGHTS DA LIVE DE ONTEM",
            description: "Os melhores momentos da transmissão ao vivo",
            thumbnail: "/placeholder.svg?height=400&width=600",
            views: "124",
            likes: "19",
            category: "Lives",
            date: "3 meses atrás",
            videoId: "dQw4w9WgXcQ",
          },
        ])

        setCategories(["Todos", "Minecraft", "Tutoriais", "Compilações", "Shorts", "Lives"])
      } finally {
        setLoading(false)
      }
    }

    fetchVideos()
  }, [])

  const filteredVideos =
    activeCategory === "Todos" ? videos : videos.filter((video) => video.category === activeCategory)

  const openVideoModal = (videoId: string, title: string) => {
    if (videoId) {
      setVideoModal({
        isOpen: true,
        videoId,
        title,
      })
    } else {
      setError("Este vídeo está indisponível no momento.")
      console.error("Vídeo indisponível.")
    }
  }

  const closeVideoModal = () => {
    setVideoModal({
      ...videoModal,
      isOpen: false,
    })
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-zinc-950 to-zinc-900 text-white">
      <header className="px-4 lg:px-6 h-16 flex items-center justify-between border-b border-zinc-800 backdrop-blur-md bg-zinc-900/80 sticky top-0 z-40">
        <Link className="flex items-center justify-center gap-2" href="/">
          <Image src="/images/logo.png" alt="Fenix Posts Logo" width={32} height={32} className="animate-pulse" />
          <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-orange-500 to-purple-600">
            Fenix Posts
          </span>
        </Link>
        <nav className="flex gap-6">
          <Link className="text-sm font-medium hover:text-red-500 transition-colors" href="/">
            Início
          </Link>
          <Link className="text-sm font-medium text-red-500" href="/portfolio">
            Portfólio
          </Link>
          <Link className="text-sm font-medium hover:text-red-500 transition-colors" href="/about">
            Sobre
          </Link>
          <Link className="text-sm font-medium hover:text-red-500 transition-colors" href="/contact">
            Contato
          </Link>
        </nav>
        <nav className="flex gap-4">
          <Link
            href="https://www.youtube.com/@FenixPosts"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-red-500 transition-colors"
          >
            <Youtube className="h-5 w-5" />
          </Link>
          <Link
            href="https://www.twitch.tv/fenixposts"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-purple-500 transition-colors"
          >
            <Twitch className="h-5 w-5" />
          </Link>
          <Link
            href="https://www.tiktok.com/@fenixposts"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-cyan-400 transition-colors"
          >
            <TikTokIcon className="h-5 w-5" />
          </Link>
          <Link
            href="https://www.instagram.com/fenixposts"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-pink-500 transition-colors"
          >
            <Instagram className="h-5 w-5" />
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <motion.div
              className="flex flex-col items-center justify-center space-y-4 text-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-orange-500 to-purple-600">
                  Meu Portfólio
                </h1>
                <p className="max-w-[900px] text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Confira meus trabalhos em edição de vídeo para Minecraft e outros jogos
                </p>
              </div>
            </motion.div>

            {error && (
              <div className="flex items-center justify-center gap-2 text-amber-400 text-center mt-4 mb-2 text-sm bg-amber-950/30 p-2 rounded-md">
                <AlertTriangle className="h-4 w-4" />
                <span>{error}</span>
              </div>
            )}

            <div className="relative mt-8">
              <div className="flex items-center justify-between mb-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-zinc-700 bg-zinc-800/50 hover:bg-zinc-800 text-white flex items-center gap-2"
                  onClick={() => setShowFilter(!showFilter)}
                >
                  <Filter className="h-4 w-4" /> Filtrar
                </Button>
                <p className="text-sm text-zinc-400">{filteredVideos.length} vídeos encontrados</p>
              </div>

              <AnimatePresence>
                {showFilter && (
                  <motion.div
                    className="flex flex-wrap items-center justify-center gap-2 mb-8"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {categories.map((category, index) => (
                      <Badge
                        key={index}
                        variant={category === activeCategory ? "default" : "outline"}
                        className={`cursor-pointer ${
                          category === activeCategory
                            ? "bg-gradient-to-r from-red-500 via-orange-500 to-purple-600 hover:from-red-600 hover:via-orange-600 hover:to-purple-700"
                            : "hover:bg-zinc-800 border-zinc-700"
                        }`}
                        onClick={() => setActiveCategory(category)}
                      >
                        {category}
                      </Badge>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 text-red-500 animate-spin" />
              </div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4"
                >
                  {filteredVideos.map((video, index) => (
                    <VideoCard
                      key={video.id}
                      video={video}
                      onPlay={video.videoId 
                        ? (videoId, title) => openVideoModal(videoId, title) 
                        : () => setError("Este vídeo está indisponível.")}
                      index={index}
                    />
                  ))}
                </motion.div>
              </AnimatePresence>
            )}

            {filteredVideos.length === 0 && !loading && (
              <div className="text-center py-12">
                <p className="text-zinc-400">Nenhum vídeo encontrado nesta categoria.</p>
              </div>
            )}

            {filteredVideos.length > 0 && filteredVideos.length % 6 === 0 && (
              <motion.div
                className="flex justify-center mt-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <Button className="bg-gradient-to-r from-red-500 via-orange-500 to-purple-600 hover:from-red-600 hover:via-orange-600 hover:to-purple-700 text-white">
                  Carregar Mais Vídeos
                </Button>
              </motion.div>
            )}
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-zinc-800">
        <p className="text-xs text-zinc-400">© 2025 Fenix Posts. Todos os direitos reservados.</p>
        <div className="sm:ml-auto flex items-center gap-4">
          <Link
            href="https://www.youtube.com/channel/UCzb-8Ly6KmZOMbpQCDYJs_g"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-red-500 transition-colors"
          >
            <Youtube className="h-5 w-5" />
          </Link>
          <Link
            href="https://www.twitch.tv/fenixposts"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-purple-500 transition-colors"
          >
            <Twitch className="h-5 w-5" />
          </Link>
          <Link
            href="https://www.tiktok.com/@fenixposts"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-cyan-400 transition-colors"
          >
            <TikTokIcon className="h-5 w-5" />
          </Link>
          <Link
            href="https://www.instagram.com/fenixposts"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-pink-500 transition-colors"
          >
            <Instagram className="h-5 w-5" />
          </Link>
        </div>
      </footer>

      <VideoModal
        videoId={videoModal.videoId}
        isOpen={videoModal.isOpen}
        onClose={closeVideoModal}
        title={videoModal.title}
      />
    </div>
  )
}

