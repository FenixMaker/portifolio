"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Youtube, Twitch, Instagram } from "lucide-react"
import TikTokIcon from "./icons/tiktok-icon"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  const [latestVideoId, setLatestVideoId] = useState("CTeETwrKOGk") // Vídeo padrão como fallback
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchLatestVideo() {
      try {
        setLoading(true)
        // Buscar apenas o vídeo mais recente do canal
        const response = await fetch("/api/youtube?channelId=UCzb-8Ly6KmZOMbpQCDYJs_g&maxResults=1")

        if (!response.ok) {
          throw new Error("Falha ao buscar vídeo mais recente")
        }

        const data = await response.json()

        if (data.success && data.data.length > 0) {
          // Usar o ID do vídeo mais recente
          setLatestVideoId(data.data[0].videoId)
        }
      } catch (error) {
        console.error("Erro ao buscar o vídeo mais recente:", error)
        // Manter o vídeo padrão em caso de erro
      } finally {
        setLoading(false)
      }
    }

    fetchLatestVideo()
  }, [])

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-black/70"></div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-red-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -right-20 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 left-1/3 w-72 h-72 bg-orange-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <motion.div
            className="flex flex-col justify-center space-y-4"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <Image
                  src="/images/logo.png"
                  alt="Fenix Posts Logo"
                  width={100}
                  height={100}
                  className="rounded-full"
                />
              </motion.div>
              <div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-orange-500 to-purple-600">
                  Fenix Posts
                </h1>
                <p className="text-zinc-400">Edição de vídeos para conteúdo de Minecraft e games</p>
              </div>
            </div>
            <p className="max-w-[600px] text-zinc-300 md:text-xl">
              Transformando gameplay em conteúdo envolvente para YouTube e Twitch. Especializado em edições criativas
              para Minecraft e outros jogos.
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row mt-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/portfolio">
                  <Button className="bg-gradient-to-r from-red-500 via-orange-500 to-purple-600 hover:from-red-600 hover:via-orange-600 hover:to-purple-700 text-white">
                    Ver Portfólio <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="https://www.youtube.com/channel/UCzb-8Ly6KmZOMbpQCDYJs_g"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" className="border-zinc-700 bg-zinc-800/50 hover:bg-zinc-800 text-white">
                    <Youtube className="mr-2 h-4 w-4" /> Canal no YouTube
                  </Button>
                </Link>
              </motion.div>
            </div>
            <div className="flex items-center gap-2 mt-6">
              <div className="flex -space-x-2">
                <motion.div
                  className="w-8 h-8 rounded-full bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center text-xs"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  +1
                </motion.div>
                <motion.div
                  className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center text-xs"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  +1
                </motion.div>
                <motion.div
                  className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-500 to-purple-600 flex items-center justify-center text-xs"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  +1
                </motion.div>
              </div>
              <p className="text-sm text-zinc-400">
                Mais de <span className="font-bold text-white">3.87K</span> inscritos
              </p>
            </div>
            <motion.div
              className="flex gap-4 mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Link
                href="https://www.youtube.com/@FenixPosts"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-red-500 transition-colors"
              >
                <Youtube className="h-6 w-6" />
              </Link>
              <Link
                href="https://www.twitch.tv/fenixposts"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-purple-500 transition-colors"
              >
                <Twitch className="h-6 w-6" />
              </Link>
              <Link
                href="https://www.tiktok.com/@fenixposts"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-cyan-400 transition-colors"
              >
                <TikTokIcon className="h-6 w-6" />
              </Link>
              <Link
                href="https://www.instagram.com/fenixposts"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-pink-500 transition-colors"
              >
                <Instagram className="h-6 w-6" />
              </Link>
            </motion.div>
          </motion.div>
          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden rounded-lg bg-zinc-800 border border-zinc-700 shadow-xl shadow-red-500/10">
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${latestVideoId}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

