import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Youtube, Twitch } from "lucide-react"

export default function AboutPage() {
  const skills = [
    "Edição de Vídeo",
    "Minecraft",
    "Adobe Premiere Pro",
    "After Effects",
    "Thumbnails",
    '\
    "Minecraft',
    "Adobe Premiere Pro",
    "After Effects",
    "Thumbnails",
    "Streaming",
    "OBS Studio",
    "Edição de Áudio",
    "Motion Graphics",
    "Efeitos Especiais",
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
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-orange-500 to-purple-600">
                  Sobre Mim
                </h1>
                <p className="text-zinc-300 md:text-xl/relaxed">
                  Olá! Sou o criador do canal Fenix Posts, focado em conteúdo de Minecraft e outros jogos.
                </p>
                <p className="text-zinc-400">
                  Minha paixão é criar vídeos envolventes e divertidos para a comunidade gamer. Trabalho com edição de
                  vídeos, streams e criação de conteúdo para YouTube e Twitch.
                </p>
                <p className="text-zinc-400">
                  No canal Fenix Posts, você encontra gameplays, tutoriais, compilações de momentos engraçados e muito
                  mais. Meu objetivo é sempre entreter e compartilhar conhecimento com a comunidade.
                </p>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Habilidades</h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                      <Badge key={index} variant="outline" className="hover:bg-zinc-800 border-zinc-700">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row pt-4">
                  <Link href="https://www.youtube.com/@FenixPosts" target="_blank" rel="noopener noreferrer">
                    <Button className="bg-gradient-to-r from-red-500 via-orange-500 to-purple-600 hover:from-red-600 hover:via-orange-600 hover:to-purple-700 text-white">
                      <Youtube className="mr-2 h-4 w-4" /> Inscreva-se no Canal
                    </Button>
                  </Link>
                  <Link href="https://www.twitch.tv/fenixposts" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="border-zinc-700 bg-zinc-800/50 hover:bg-zinc-800 text-white">
                      <Twitch className="mr-2 h-4 w-4" /> Siga na Twitch
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full h-[400px] overflow-hidden rounded-lg bg-zinc-800 border border-zinc-700">
                  <Image src="/images/logo.png" alt="Fenix Posts" fill className="object-contain p-8" />
                </div>
              </div>
            </div>
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-orange-500 to-purple-600">
                Estatísticas do Canal
              </h2>
              <div className="grid gap-8 md:grid-cols-3">
                <Card className="bg-zinc-900 border-zinc-800">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-2 text-white">Inscritos</h3>
                    <p className="text-3xl font-bold text-red-500 mb-4">3.87K</p>
                    <p className="text-sm text-zinc-400">Obrigado a todos que acompanham o canal!</p>
                  </CardContent>
                </Card>
                <Card className="bg-zinc-900 border-zinc-800">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-2 text-white">Vídeos</h3>
                    <p className="text-3xl font-bold text-red-500 mb-4">395</p>
                    <p className="text-sm text-zinc-400">Conteúdo diversificado sobre Minecraft e outros jogos</p>
                  </CardContent>
                </Card>
                <Card className="bg-zinc-900 border-zinc-800">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-2 text-white">Comunidade</h3>
                    <p className="text-3xl font-bold text-red-500 mb-4">Ativa</p>
                    <p className="text-sm text-zinc-400">
                      Interação constante com os inscritos através de comentários e lives
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-orange-500 to-purple-600">
                Equipamentos
              </h2>
              <div className="grid gap-4">
                <Card className="bg-zinc-900 border-zinc-800">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-2 text-white">Setup para Edição e Gameplay</h3>
                    <ul className="space-y-2 text-zinc-400">
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-500"></span>
                        <span>PC Gamer com placa de vídeo dedicada</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-500"></span>
                        <span>Adobe Premiere Pro para edição de vídeo</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-500"></span>
                        <span>After Effects para efeitos especiais</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-500"></span>
                        <span>OBS Studio para gravação e streaming</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-500"></span>
                        <span>Microfone de qualidade para narração</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-zinc-800">
        <p className="text-xs text-zinc-400">© 2025 Fenix Posts. Todos os direitos reservados.</p>
        <div className="sm:ml-auto flex items-center gap-4">
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
        </div>
      </footer>
    </div>
  )
}

