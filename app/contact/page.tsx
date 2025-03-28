import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Send } from "lucide-react"
import { SocialIcons } from "@/components/social-icons"

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-zinc-950 to-zinc-900 text-white">
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
          <Link className="text-sm font-medium text-red-500 transition-colors" href="/contact">
            Contato
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 -left-20 w-64 h-64 bg-red-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl"></div>
          </div>

          <div className="container px-4 md:px-6 relative z-10">
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
              <div className="space-y-6 bg-zinc-900/50 p-6 rounded-lg border border-zinc-800">
                <div className="flex items-center gap-3">
                  <Mail className="h-6 w-6 text-red-500" />
                  <div>
                    <h3 className="font-medium text-white">Email</h3>
                    <p className="text-sm text-zinc-400">zueracrafta2015@gmail.com</p>
                  </div>
                </div>
                <div className="pt-4">
                  <h3 className="font-medium text-white mb-3">Redes Sociais</h3>
                  <SocialIcons iconSize={6} className="flex-wrap gap-6" />
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
                <div className="pt-4">
                  <h3 className="font-medium text-white mb-3">Horário de Atendimento</h3>
                  <p className="text-sm text-zinc-400">
                    Segunda a Sexta: 9h às 18h
                    <br />
                    Sábado: 10h às 14h
                    <br />
                    Domingo: Fechado
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <form className="space-y-4 bg-zinc-900/50 p-6 rounded-lg border border-zinc-800">
                  <h3 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-orange-500 to-purple-600">
                    Envie uma Mensagem
                  </h3>
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
                <div className="bg-zinc-900/50 p-6 rounded-lg border border-zinc-800">
                  <h3 className="text-xl font-bold mb-4">Perguntas Frequentes</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-white">Quais serviços você oferece?</h4>
                      <p className="text-sm text-zinc-400">
                        Ofereço serviços de edição de vídeo para conteúdo de games, incluindo edição de gameplays,
                        highlights, intros, outros e efeitos especiais.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-white">Qual o prazo de entrega?</h4>
                      <p className="text-sm text-zinc-400">
                        O prazo varia de acordo com a complexidade do projeto, mas geralmente entre 3 a 7 dias úteis.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-white">Como funciona o processo de trabalho?</h4>
                      <p className="text-sm text-zinc-400">
                        Após o contato inicial, discutimos os detalhes do projeto, prazos e valores. Depois, você envia
                        o material bruto e eu começo a edição.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
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

