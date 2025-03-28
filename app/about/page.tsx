"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SocialIcons } from "@/components/social-icons"
import { motion } from "framer-motion"

export default function AboutPage() {
  const skills = [
    "Edição de Vídeo",
    "Sony Vegas Pro 22",
    "Minecraft",
    "Thumbnails",
    "Streaming",
    "OBS Studio",
    "Edição de Áudio",
    "Motion Graphics",
    "Efeitos Especiais",
    "Fortnite",
    "Roblox",
    "Valorant",
    "CS:GO",
    "Apex Legends",
    "Edição de Shorts",
    "Criação de Conteúdo",
  ]

  return (
    <div className="flex flex-col min-h-screen bg-zinc-900 text-white">
      <header className="px-4 lg:px-6 h-16 flex items-center justify-between border-b border-zinc-800">
        <Link className="flex items-center justify-center gap-2" href="/">
          <Image src="/images/logo.png" alt="Fenix Posts Logo" width={32} height={32} />
          <span className="font-bold text-xl">Fenix Posts</span>
        </Link>
        <nav className="flex gap-6">
          <Link className="text-sm font-medium hover:text-red-500 transition-colors" href="/">
            Início
          </Link>
          <Link className="text-sm font-medium hover:text-red-500 transition-colors" href="/portfolio">
            Portfólio
          </Link>
          <Link className="text-sm font-medium text-red-500 transition-colors" href="/about">
            Sobre
          </Link>
          <Link className="text-sm font-medium hover:text-red-500 transition-colors" href="/contact">
            Contato
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-zinc-950 to-zinc-900 relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 -left-20 w-64 h-64 bg-red-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl"></div>
          </div>

          <div className="container px-4 md:px-6 relative z-10">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="inline-block">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-orange-500 to-purple-600">
                    Sobre Mim
                  </h1>
                  <div className="h-1 w-1/2 bg-gradient-to-r from-red-500 via-orange-500 to-purple-600 rounded-full mt-2"></div>
                </div>
                <div className="bg-zinc-800/50 p-6 rounded-lg border border-zinc-700 shadow-lg">
                  <p className="text-zinc-300 md:text-xl/relaxed">
                    Olá! Sou o criador do canal Fenix Posts, focado em conteúdo de Minecraft e outros jogos.
                  </p>
                  <p className="text-zinc-400 mt-4">
                    Minha paixão é criar vídeos envolventes e divertidos para a comunidade gamer. Trabalho com edição de
                    vídeos, streams e criação de conteúdo para YouTube, Twitch, TikTok e outras plataformas.
                  </p>
                  <p className="text-zinc-400 mt-4">
                    No canal Fenix Posts, você encontra gameplays, tutoriais, compilações de momentos engraçados e muito
                    mais. Meu objetivo é sempre entreter e compartilhar conhecimento com a comunidade.
                  </p>
                </div>

                <div className="bg-zinc-800/50 p-6 rounded-lg border border-zinc-700 shadow-lg">
                  <h3 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-orange-500 to-purple-600">
                    Habilidades
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                      <Badge
                        key={index}
                        className="bg-zinc-900 hover:bg-zinc-800 text-white border-zinc-700 px-3 py-1 text-sm"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row pt-4">
                  <Link href="https://www.youtube.com/@FenixPosts" target="_blank" rel="noopener noreferrer">
                    <Button className="bg-gradient-to-r from-red-500 via-orange-500 to-purple-600 hover:from-red-600 hover:via-orange-600 hover:to-purple-700 text-white w-full sm:w-auto">
                      Inscreva-se no Canal
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button
                      variant="outline"
                      className="border-zinc-700 bg-zinc-800/50 hover:bg-zinc-800 text-white w-full sm:w-auto"
                    >
                      Entre em Contato
                    </Button>
                  </Link>
                </div>

                <div className="pt-4">
                  <h3 className="text-lg font-medium mb-2">Redes Sociais</h3>
                  <SocialIcons iconSize={6} className="gap-6" />
                </div>
              </motion.div>

              <motion.div
                className="flex items-center justify-center"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="relative w-full h-[400px] overflow-hidden rounded-lg bg-zinc-800/30 border border-zinc-700 shadow-xl shadow-red-500/5">
                  <Image src="/images/logo.png" alt="Fenix Posts" fill className="object-contain p-8" />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                    <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-orange-500 to-purple-600">
                      Fenix Posts
                    </h2>
                    <p className="text-zinc-300">Criador de Conteúdo</p>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="mt-16">
              <div className="inline-block">
                <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-orange-500 to-purple-600">
                  Estatísticas do Canal
                </h2>
                <div className="h-1 w-1/3 bg-gradient-to-r from-red-500 via-orange-500 to-purple-600 rounded-full mt-2 mb-8"></div>
              </div>

              <div className="grid gap-8 md:grid-cols-3">
                <motion.div
                  whileHover={{
                    y: -10,
                    boxShadow: "0 20px 25px -5px rgba(239, 68, 68, 0.1), 0 10px 10px -5px rgba(239, 68, 68, 0.04)",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Card className="bg-zinc-900 border-zinc-800 hover:border-red-500/30 transition-all duration-300 h-full">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-bold mb-2 text-white">Inscritos</h3>
                      <p className="text-3xl font-bold text-red-500 mb-4">3.87K</p>
                      <p className="text-sm text-zinc-400">Obrigado a todos que acompanham o canal!</p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  whileHover={{
                    y: -10,
                    boxShadow: "0 20px 25px -5px rgba(249, 115, 22, 0.1), 0 10px 10px -5px rgba(249, 115, 22, 0.04)",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Card className="bg-zinc-900 border-zinc-800 hover:border-orange-500/30 transition-all duration-300 h-full">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-bold mb-2 text-white">Vídeos</h3>
                      <p className="text-3xl font-bold text-orange-500 mb-4">395</p>
                      <p className="text-sm text-zinc-400">Conteúdo diversificado sobre Minecraft e outros jogos</p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  whileHover={{
                    y: -10,
                    boxShadow: "0 20px 25px -5px rgba(168, 85, 247, 0.1), 0 10px 10px -5px rgba(168, 85, 247, 0.04)",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Card className="bg-zinc-900 border-zinc-800 hover:border-purple-500/30 transition-all duration-300 h-full">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-bold mb-2 text-white">Comunidade</h3>
                      <p className="text-3xl font-bold text-purple-500 mb-4">Ativa</p>
                      <p className="text-sm text-zinc-400">
                        Interação constante com os inscritos através de comentários e lives
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>

            <div className="mt-16">
              <div className="inline-block">
                <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-orange-500 to-purple-600">
                  Equipamentos
                </h2>
                <div className="h-1 w-1/3 bg-gradient-to-r from-red-500 via-orange-500 to-purple-600 rounded-full mt-2 mb-8"></div>
              </div>

              <Card className="bg-zinc-900 border-zinc-800 hover:border-red-500/30 hover:shadow-lg hover:shadow-red-500/5 transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4 text-white">Setup para Edição e Gameplay</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <ul className="space-y-3 text-zinc-300">
                      <li className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-red-500"></span>
                        <span>PC Gamer com placa de vídeo dedicada</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                        <span>Sony Vegas Pro 22 para edição de vídeo</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                        <span>OBS Studio para gravação e streaming</span>
                      </li>
                    </ul>
                    <ul className="space-y-3 text-zinc-300">
                      <li className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                        <span>Microfone de qualidade para narração</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-red-500"></span>
                        <span>Periféricos para gaming</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                        <span>Iluminação para streams</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-zinc-800">
        <p className="text-xs text-zinc-400">© 2025 Fenix Posts. Todos os direitos reservados.</p>
        <div className="sm:ml-auto flex items-center gap-4">
          <SocialIcons iconSize={5} />
        </div>
      </footer>
    </div>
  )
}

