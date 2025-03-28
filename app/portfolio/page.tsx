"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Filter, Loader2, AlertTriangle } from "lucide-react"
import { VideoModal } from "@/components/video-modal"
import { VideoCard } from "@/components/video-card"
import { ShortCard } from "@/components/short-card"
import { motion, AnimatePresence } from "framer-motion"
import { timeAgo } from "@/lib/youtube"
import { SocialIcons } from "@/components/social-icons"

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("Todos")
  const [videoModal, setVideoModal] = useState({
    isOpen: false,
    videoId: "",
    title: "",
    platform: "youtube",
  })

  const [videos, setVideos] = useState<any[]>([])
  const [shorts, setShorts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState(["Todos"])
  const [showFilter, setShowFilter] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [usingFallback, setUsingFallback] = useState(false)
  const [activeTab, setActiveTab] = useState("videos")
  const [page, setPage] = useState(1)
  const [loadingMore, setLoadingMore] = useState(false)
  const videosPerPage = 6
  const shortsPerPage = 10

  useEffect(() => {
    async function fetchVideos() {
      try {
        setLoading(true)
        setError(null)
        setUsingFallback(false)

        // Usar o ID do canal fornecido
        const response = await fetch("/api/youtube?channelId=UCzb-8Ly6KmZOMbpQCDYJs_g&maxResults=24")

        if (!response.ok) {
          throw new Error("Falha ao buscar vídeos")
        }

        const data = await response.json()

        if (data.success && data.data.length > 0) {
          const fetchedVideos = data.data.map((video: any) => ({
            ...video,
            date: video.publishedAt ? timeAgo(video.publishedAt) : "",
            // Melhorar a detecção de shorts
            isShort:
              video.title.toLowerCase().includes("#shorts") ||
              video.description.toLowerCase().includes("#shorts") ||
              video.category === "Shorts" ||
              (video.title.startsWith("#") && video.title.length < 30),
          }))

          // Separar vídeos normais e shorts
          const shortsVideos = fetchedVideos.filter((v: any) => v.isShort)
          const regularVideos = fetchedVideos.filter((v: any) => !v.isShort)

          setVideos(regularVideos)
          setShorts(shortsVideos)

          // Extrair categorias únicas dos vídeos regulares
          const uniqueCategories = ["Todos", ...new Set(regularVideos.map((v: any) => v.category))]
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
        setError("Não foi possível carregar os vídeos do YouTube. Usando dados de exemplo.")
        setUsingFallback(true)

        // Usar dados de exemplo em caso de erro
        const exampleData = getExampleVideos()
        setVideos(exampleData.filter((v) => !v.isShort))
        setShorts(exampleData.filter((v) => v.isShort))
        setCategories(["Todos", "Minecraft", "Tutoriais", "Compilações", "Gameplay", "Lives"])
      } finally {
        setLoading(false)
      }
    }

    fetchVideos()
  }, [])

  const loadMoreVideos = () => {
    setLoadingMore(true)
    setTimeout(() => {
      setPage((prev) => prev + 1)
      setLoadingMore(false)
    }, 800)
  }

  // Filtrar vídeos por categoria (apenas para vídeos regulares)
  const filteredVideos =
    activeCategory === "Todos" ? videos : videos.filter((video) => video.category === activeCategory)

  // Ordenar vídeos por data
  const sortedVideos = [...filteredVideos].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  )

  const sortedShorts = [...shorts].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())

  // Paginação
  const paginatedVideos = sortedVideos.slice(0, page * videosPerPage)
  const paginatedShorts = sortedShorts.slice(0, page * shortsPerPage)

  // Verificar se há mais vídeos para carregar
  const hasMoreVideos = paginatedVideos.length < sortedVideos.length
  const hasMoreShorts = paginatedShorts.length < sortedShorts.length

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

            <div className="flex justify-center mb-8 mt-8">
              <div className="flex items-center p-1 border border-zinc-800 rounded-lg bg-zinc-900/50 backdrop-blur-sm">
                <button
                  onClick={() => setActiveTab("videos")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                    activeTab === "videos" ? "bg-red-500/10 text-red-500" : "text-zinc-400 hover:text-zinc-300"
                  }`}
                >
                  <span>Vídeos</span>
                </button>
                <button
                  onClick={() => setActiveTab("shorts")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                    activeTab === "shorts" ? "bg-red-500/10 text-red-500" : "text-zinc-400 hover:text-zinc-300"
                  }`}
                >
                  <span>Shorts</span>
                </button>
              </div>
            </div>

            {activeTab === "videos" && (
              <div className="relative mt-4">
                <div className="flex items-center justify-between mb-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-zinc-700 bg-zinc-800/50 hover:bg-zinc-800 text-white flex items-center gap-2"
                    onClick={() => setShowFilter(!showFilter)}
                  >
                    <Filter className="h-4 w-4" /> Filtrar
                  </Button>
                  <p className="text-sm text-zinc-400">{paginatedVideos.length} vídeos encontrados</p>
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
            )}

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 text-red-500 animate-spin" />
              </div>
            ) : (
              <AnimatePresence mode="wait">
                {activeTab === "videos" ? (
                  <motion.div
                    key="videos"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-center mb-6">
                      <p className="text-zinc-300 italic">Vídeos do YouTube</p>
                    </div>

                    {paginatedVideos.length > 0 ? (
                      <div className="mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
                        {paginatedVideos.map((video, index) => (
                          <VideoCard key={video.id} video={video} onPlay={openVideoModal} index={index} />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <p className="text-zinc-400">Nenhum vídeo encontrado nesta categoria.</p>
                      </div>
                    )}

                    {hasMoreVideos && (
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
                  </motion.div>
                ) : (
                  <motion.div
                    key="shorts"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-center mb-6">
                      <p className="text-zinc-300 italic">Shorts do YouTube</p>
                    </div>

                    {paginatedShorts.length > 0 ? (
                      <div className="mx-auto grid max-w-7xl grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 mt-4">
                        {paginatedShorts.map((video, index) => (
                          <ShortCard key={video.id} video={video} onPlay={openVideoModal} index={index} />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <p className="text-zinc-400">Nenhum short encontrado.</p>
                      </div>
                    )}

                    {hasMoreShorts && (
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
                            <>Carregar Mais Shorts</>
                          )}
                        </Button>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-zinc-800">
        <p className="text-xs text-zinc-400">© 2025 Fenix Posts. Todos os direitos reservados.</p>
        <div className="sm:ml-auto flex items-center gap-4">
          <SocialIcons iconSize={5} />
        </div>
      </footer>

      <VideoModal
        videoId={videoModal.videoId}
        isOpen={videoModal.isOpen}
        onClose={closeVideoModal}
        title={videoModal.title}
        platform={videoModal.platform}
      />
    </div>
  )
}

// Função para gerar dados de exemplo
function getExampleVideos() {
  return [
    {
      id: "1",
      title: "ESSE JOGO É PERFEITO...",
      description: "SE GOSTAR DO VÍDEO DEIXA SEU LIKE ❤️ ✓ Comenta e curte o vídeo se você...",
      thumbnail:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%7BB54D4B2C-8E4C-41A0-A0B7-119DAB8B1488%7D-uXGJjuiQwjbHZ1PC0Tnghnt6Cai06q.png",
      views: "335",
      likes: "33",
      category: "Gameplay",
      date: "1 dia atrás",
      videoId: "dQw4w9WgXcQ",
      publishedAt: new Date("2023-02-01").toISOString(),
      isShort: false,
    },
    {
      id: "2",
      title: "O EVENTO MAIS CAOTICO QUE VOCE VAI VER",
      description: "SE GOSTAR DO VÍDEO DEIXA SEU LIKE ❤️ ✓ Comenta e curte o vídeo se você...",
      thumbnail:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%7BB54D4B2C-8E4C-41A0-A0B7-119DAB8B1488%7D-uXGJjuiQwjbHZ1PC0Tnghnt6Cai06q.png",
      views: "60",
      likes: "7",
      category: "Minecraft",
      date: "2 meses atrás",
      videoId: "dQw4w9WgXcQ",
      publishedAt: new Date("2022-12-01").toISOString(),
      isShort: false,
    },
    {
      id: "3",
      title: "COMO PEGAR A NOVA CAPA DO MINECRAFT",
      description: "SE GOSTAR DO VÍDEO DEIXA SEU LIKE ❤️ ✓ Comenta e curte o vídeo se você...",
      thumbnail:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%7BB54D4B2C-8E4C-41A0-A0B7-119DAB8B1488%7D-uXGJjuiQwjbHZ1PC0Tnghnt6Cai06q.png",
      views: "656",
      likes: "39",
      category: "Tutorial",
      date: "3 meses atrás",
      videoId: "dQw4w9WgXcQ",
      publishedAt: new Date("2022-11-01").toISOString(),
      isShort: false,
    },
    {
      id: "4",
      title: "TELEPORTE DO SAGIUR - Parte 1",
      description: "SE GOSTAR DO VÍDEO DEIXA SEU LIKE ❤️ ✓ Comenta e curte o vídeo se você...",
      thumbnail:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%7BB54D4B2C-8E4C-41A0-A0B7-119DAB8B1488%7D-uXGJjuiQwjbHZ1PC0Tnghnt6Cai06q.png",
      views: "432",
      likes: "87",
      category: "Minecraft",
      date: "2 meses atrás",
      videoId: "dQw4w9WgXcQ",
      publishedAt: new Date("2022-12-15").toISOString(),
      isShort: false,
    },
    {
      id: "5",
      title: "OENDERMAN",
      description: "SE GOSTAR DO VÍDEO DEIXA SEU LIKE ❤️ ✓ Comenta e curte o vídeo se você...",
      thumbnail:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%7BB54D4B2C-8E4C-41A0-A0B7-119DAB8B1488%7D-uXGJjuiQwjbHZ1PC0Tnghnt6Cai06q.png",
      views: "521",
      likes: "103",
      category: "Minecraft",
      date: "1 mês atrás",
      videoId: "dQw4w9WgXcQ",
      publishedAt: new Date("2023-01-01").toISOString(),
      isShort: false,
    },
    {
      id: "6",
      title: "COMO FAZER UMA FARM DE WITHER SKELETON",
      description: "Tutorial completo para criar uma farm eficiente",
      thumbnail:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%7BB54D4B2C-8E4C-41A0-A0B7-119DAB8B1488%7D-uXGJjuiQwjbHZ1PC0Tnghnt6Cai06q.png",
      views: "318",
      likes: "64",
      category: "Tutorial",
      date: "3 semanas atrás",
      videoId: "dQw4w9WgXcQ",
      publishedAt: new Date("2023-01-15").toISOString(),
      isShort: false,
    },
    {
      id: "7",
      title: "EXPLORANDO A NOVA ATUALIZAÇÃO DO MINECRAFT",
      description: "Todas as novidades da última atualização",
      thumbnail:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%7BB54D4B2C-8E4C-41A0-A0B7-119DAB8B1488%7D-uXGJjuiQwjbHZ1PC0Tnghnt6Cai06q.png",
      views: "287",
      likes: "52",
      category: "Gameplay",
      date: "2 semanas atrás",
      videoId: "dQw4w9WgXcQ",
      publishedAt: new Date("2023-01-22").toISOString(),
      isShort: false,
    },
    {
      id: "8",
      title: "CONSTRUINDO UMA CASA AUTOMÁTICA NO MINECRAFT",
      description: "Tutorial de construção com redstone e automação",
      thumbnail:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%7BB54D4B2C-8E4C-41A0-A0B7-119DAB8B1488%7D-uXGJjuiQwjbHZ1PC0Tnghnt6Cai06q.png",
      views: "412",
      likes: "78",
      category: "Tutorial",
      date: "1 semana atrás",
      videoId: "dQw4w9WgXcQ",
      publishedAt: new Date("2023-01-29").toISOString(),
      isShort: false,
    },
    {
      id: "9",
      title: "COMPILADO DE MELHORES MOMENTOS DAS LIVES",
      description: "Uma seleção dos momentos mais engraçados e incríveis das lives",
      thumbnail:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%7BB54D4B2C-8E4C-41A0-A0B7-119DAB8B1488%7D-uXGJjuiQwjbHZ1PC0Tnghnt6Cai06q.png",
      views: "198",
      likes: "43",
      category: "Compilação",
      date: "3 dias atrás",
      videoId: "dQw4w9WgXcQ",
      publishedAt: new Date("2023-02-01").toISOString(),
      isShort: false,
    },
    // Shorts
    {
      id: "s1",
      title: "#minecraft",
      description: "Momentos engraçados no Minecraft #shorts #minecraft #gaming",
      thumbnail:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%7B0EA5FBEE-0977-46F8-892B-52DA7B9685CC%7D-rEkIfkbTSgZ13eZIytNnBGVpBbf6mX.png",
      views: "863",
      likes: "46",
      category: "Shorts",
      date: "1 mês atrás",
      videoId: "dQw4w9WgXcQ",
      publishedAt: new Date("2023-01-15").toISOString(),
      isShort: true,
    },
    {
      id: "s2",
      title: "#minecraft",
      description: "Construção rápida no Minecraft! #minecraft #gaming #shorts",
      thumbnail:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%7B0EA5FBEE-0977-46F8-892B-52DA7B9685CC%7D-rEkIfkbTSgZ13eZIytNnBGVpBbf6mX.png",
      views: "1.2K",
      likes: "12",
      category: "Shorts",
      date: "2 meses atrás",
      videoId: "dQw4w9WgXcQ",
      publishedAt: new Date("2023-01-01").toISOString(),
      isShort: true,
    },
    {
      id: "s3",
      title: "#minecraft",
      description: "Dicas rápidas para iniciantes #minecraft #gaming #tutorial",
      thumbnail:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%7BC593A1F6-BA3B-4009-97BC-0097E55F3EE1%7D-lTqj3aerdlQpwDHtuiE6UkduzEWxqj.png",
      views: "863",
      likes: "46",
      category: "Shorts",
      date: "1 mês atrás",
      videoId: "dQw4w9WgXcQ",
      publishedAt: new Date("2023-01-10").toISOString(),
      isShort: true,
    },
    {
      id: "s4",
      title: "#minecraft",
      description: "Como escapar dessa situação? #minecraft #gaming",
      thumbnail:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%7BC593A1F6-BA3B-4009-97BC-0097E55F3EE1%7D-lTqj3aerdlQpwDHtuiE6UkduzEWxqj.png",
      views: "1.8K",
      likes: "18",
      category: "Shorts",
      date: "2 meses atrás",
      videoId: "dQw4w9WgXcQ",
      publishedAt: new Date("2022-12-15").toISOString(),
      isShort: true,
    },
  ]
}

