import { NextResponse } from "next/server"

// Rota para simular busca de vídeos do TikTok
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const username = searchParams.get("username") || "fenixposts"

  // Como não temos uma API real do TikTok, vamos retornar dados de exemplo
  // Usando o nome de usuário @fenixposts conforme solicitado
  const exampleTikTokVideos = [
    {
      id: "t1",
      title: "Minecraft Build Challenge #fenixposts",
      description: "Construindo uma casa em 60 segundos! #minecraft #gaming #fenixposts",
      thumbnail:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%7B984687C5-9AFD-405C-AB35-B690722A7AEE%7D-ljyeE4KvDK6yVpKEtVsycrZX1aikGq.png",
      views: "1200",
      likes: "320",
      category: "Gaming",
      date: "2 semanas atrás",
      videoId: "dQw4w9WgXcQ",
      publishedAt: new Date("2023-01-15").toISOString(),
      isShort: true,
    },
    {
      id: "t2",
      title: "Top 5 Minecraft Hacks que Você Precisa Conhecer",
      description: "Dicas rápidas para melhorar seu jogo! #minecraft #gaming #tips #fenixposts",
      thumbnail:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%7BC590197C-7F65-4BD0-911A-B3BD4177A042%7D-eqOoWALbBssLBNzvN0SmhBcSdnuEnS.png",
      views: "950",
      likes: "210",
      category: "Tutorial",
      date: "1 mês atrás",
      videoId: "dQw4w9WgXcQ",
      publishedAt: new Date("2023-01-01").toISOString(),
      isShort: true,
    },
    {
      id: "t3",
      title: "Reagindo a Builds Incríveis #fenixposts",
      description: "Olha só essas construções insanas! #minecraft #reaction",
      thumbnail: "/placeholder.svg?height=400&width=600",
      views: "870",
      likes: "190",
      category: "Reaction",
      date: "1 mês atrás",
      videoId: "dQw4w9WgXcQ",
      publishedAt: new Date("2022-12-20").toISOString(),
      isShort: true,
    },
    {
      id: "t4",
      title: "Como Fazer uma Farm de XP em 1 Minuto",
      description: "Tutorial rápido para farm de XP! #minecraft #tutorial #fenixposts",
      thumbnail:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%7BC590197C-7F65-4BD0-911A-B3BD4177A042%7D-eqOoWALbBssLBNzvN0SmhBcSdnuEnS.png",
      views: "1500",
      likes: "350",
      category: "Tutorial",
      date: "2 meses atrás",
      videoId: "dQw4w9WgXcQ",
      publishedAt: new Date("2022-12-01").toISOString(),
      isShort: true,
    },
    {
      id: "t5",
      title: "Momentos Engraçados no Minecraft #fenixposts",
      description: "Compilação de fails e momentos hilários! #minecraft #funny",
      thumbnail:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%7B984687C5-9AFD-405C-AB35-B690722A7AEE%7D-ljyeE4KvDK6yVpKEtVsycrZX1aikGq.png",
      views: "2200",
      likes: "480",
      category: "Entretenimento",
      date: "3 meses atrás",
      videoId: "dQw4w9WgXcQ",
      publishedAt: new Date("2022-11-15").toISOString(),
      isShort: true,
    },
    {
      id: "t6",
      title: "Transformação de Base em 60 Segundos",
      description: "De cabana a mansão em um minuto! #minecraft #transformation #fenixposts",
      thumbnail:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%7BC590197C-7F65-4BD0-911A-B3BD4177A042%7D-eqOoWALbBssLBNzvN0SmhBcSdnuEnS.png",
      views: "1800",
      likes: "420",
      category: "Construção",
      date: "3 meses atrás",
      videoId: "dQw4w9WgXcQ",
      publishedAt: new Date("2022-11-01").toISOString(),
      isShort: true,
    },
  ]

  return NextResponse.json({
    success: true,
    data: exampleTikTokVideos,
    message: "Dados de exemplo do TikTok para @fenixposts",
  })
}

