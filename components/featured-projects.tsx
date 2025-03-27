import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"

export function FeaturedProjects() {
  const projects = [
    {
      id: 1,
      title: "Campanha Publicitária",
      description: "Edição de vídeo para campanha de marketing digital",
      thumbnail: "/placeholder.svg?height=400&width=600",
      category: "Publicidade",
    },
    {
      id: 2,
      title: "Documentário",
      description: "Edição e pós-produção de documentário sobre natureza",
      thumbnail: "/placeholder.svg?height=400&width=600",
      category: "Documentário",
    },
    {
      id: 3,
      title: "Vídeo Corporativo",
      description: "Vídeo institucional para empresa de tecnologia",
      thumbnail: "/placeholder.svg?height=400&width=600",
      category: "Corporativo",
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Projetos em Destaque</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Conheça alguns dos meus trabalhos recentes em edição de vídeo
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {projects.map((project) => (
            <Card key={project.id} className="overflow-hidden">
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={project.thumbnail || "/placeholder.svg"}
                  alt={project.title}
                  width={600}
                  height={400}
                  className="object-cover transition-transform hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/60">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full bg-white/20 backdrop-blur-sm border-white/40"
                  >
                    <Play className="h-6 w-6 text-white" />
                  </Button>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <span className="text-xs font-medium text-muted-foreground">{project.category}</span>
                  <h3 className="font-bold">{project.title}</h3>
                  <p className="text-sm text-muted-foreground">{project.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="flex justify-center mt-12">
          <Link href="/portfolio">
            <Button variant="outline">Ver todos os projetos</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

