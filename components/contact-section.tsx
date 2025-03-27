import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Send, Youtube, Twitch } from "lucide-react"

export function ContactSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-zinc-950">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-amber-500">
              Entre em Contato
            </h2>
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
              <h3 className="font-medium text-white mb-3">Estatísticas do Canal</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-zinc-900 p-4 rounded-lg border border-zinc-800">
                  <p className="text-2xl font-bold text-white">3.87K</p>
                  <p className="text-sm text-zinc-400">Inscritos</p>
                </div>
                <div className="bg-zinc-900 p-4 rounded-lg border border-zinc-800">
                  <p className="text-2xl font-bold text-white">395</p>
                  <p className="text-sm text-zinc-400">Vídeos</p>
                </div>
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
              <Button className="w-full bg-red-600 hover:bg-red-700 text-white" type="submit">
                <Send className="mr-2 h-4 w-4" /> Enviar Mensagem
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

