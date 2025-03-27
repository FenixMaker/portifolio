import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Send, Youtube, Twitch, Instagram, Twitter } from "lucide-react"

export default function ContactPage() {
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
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-orange-500 to-purple-600">
                  Entre em Contato
                </h1>
                <p className="max-w-[900px] text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Vamos trabalhar juntos no seu próximo projeto de vídeo para games
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <Mail className="h-6 w-6 text-red-500" />
                  <div>
                    <h3 className="font-medium text-white">Email</h3>
                    <p className="text-sm text-zinc-400">zueracrafta2015@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Youtube className="h-6 w-6 text-red-500" />
                  <div>
                    <h3 className="font-medium text-white">YouTube</h3>
                    <a
                      href="https://www.youtube.com/@FenixPosts"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-zinc-400 hover:text-red-500 transition-colors"
                    >
                      youtube.com/@FenixPosts
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Twitch className="h-6 w-6 text-red-500" />
                  <div>
                    <h3 className="font-medium text-white">Twitch</h3>
                    <a
                      href="https://www.twitch.tv/fenixposts"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-zinc-400 hover:text-purple-500 transition-colors"
                    >
                      twitch.tv/fenixposts
                    </a>
                  </div>
                </div>
                <div className="pt-4">
                  <h3 className="font-medium text-white mb-3">Redes Sociais</h3>
                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-zinc-700 bg-zinc-800/50 hover:bg-zinc-800 text-white"
                    >
                      <Youtube className="h-5 w-5 text-red-500" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-zinc-700 bg-zinc-800/50 hover:bg-zinc-800 text-white"
                    >
                      <Twitch className="h-5 w-5 text-purple-500" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-zinc-700 bg-zinc-800/50 hover:bg-zinc-800 text-white"
                    >
                      <Instagram className="h-5 w-5 text-pink-500" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-zinc-700 bg-zinc-800/50 hover:bg-zinc-800 text-white"
                    >
                      <Twitter className="h-5 w-5 text-blue-400" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <form className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Input
                        id="name"
                        placeholder="Nome"
                        className="bg-zinc-900 border-zinc-800 focus:border-red-500 text-white placeholder:text-zinc-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Input
                        id="email"
                        placeholder="Email"
                        type="email"
                        className="bg-zinc-900 border-zinc-800 focus:border-red-500 text-white placeholder:text-zinc-500"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Input
                      id="subject"
                      placeholder="Assunto"
                      className="bg-zinc-900 border-zinc-800 focus:border-red-500 text-white placeholder:text-zinc-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Textarea
                      className="min-h-[120px] bg-zinc-900 border-zinc-800 focus:border-red-500 text-white placeholder:text-zinc-500"
                      id="message"
                      placeholder="Mensagem"
                    />
                  </div>
                  <Button
                    className="w-full bg-gradient-to-r from-red-500 via-orange-500 to-purple-600 hover:from-red-600 hover:via-orange-600 hover:to-purple-700 text-white"
                    type="submit"
                  >
                    <Send className="mr-2 h-4 w-4" /> Enviar Mensagem
                  </Button>
                </form>
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

