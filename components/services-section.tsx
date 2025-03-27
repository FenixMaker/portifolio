"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Scissors, Film, Gamepad, Youtube, Twitch, Zap } from "lucide-react"
import { motion } from "framer-motion"

export function ServicesSection() {
  const services = [
    {
      icon: <Scissors className="h-10 w-10 text-red-500" />,
      title: "Edição de Vídeo para Games",
      description: "Edição profissional para conteúdo de Minecraft e outros jogos",
    },
    {
      icon: <Gamepad className="h-10 w-10 text-orange-500" />,
      title: "Highlights de Gameplay",
      description: "Compilação dos melhores momentos das suas partidas",
    },
    {
      icon: <Youtube className="h-10 w-10 text-red-500" />,
      title: "Otimização para YouTube",
      description: "Edição pensada para engajamento e retenção de audiência",
    },
    {
      icon: <Twitch className="h-10 w-10 text-purple-500" />,
      title: "Edição de VODs de Lives",
      description: "Transforme suas transmissões em conteúdo para YouTube",
    },
    {
      icon: <Film className="h-10 w-10 text-amber-500" />,
      title: "Intros e Outros",
      description: "Criação de intros, outros e elementos visuais personalizados",
    },
    {
      icon: <Zap className="h-10 w-10 text-orange-500" />,
      title: "Efeitos Especiais",
      description: "Adição de efeitos visuais para destacar momentos importantes",
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-zinc-900 to-zinc-950 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-64 h-64 bg-red-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-orange-500 to-purple-600">
              Serviços
            </h2>
            <p className="max-w-[900px] text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Soluções completas em edição de vídeo para criadores de conteúdo de games
            </p>
          </div>
        </motion.div>

        <motion.div
          className="mx-auto grid max-w-5xl grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={item}>
              <Card className="border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800/50 transition-colors h-full group hover:border-red-500/30 hover:shadow-lg hover:shadow-red-500/5">
                <CardHeader className="pb-2">
                  <motion.div
                    className="mb-2 transform transition-transform duration-300 group-hover:scale-110 group-hover:text-red-500"
                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    {service.icon}
                  </motion.div>
                  <CardTitle className="text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-red-500 group-hover:via-orange-500 group-hover:to-purple-600 transition-colors">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-zinc-400 group-hover:text-zinc-300 transition-colors">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

