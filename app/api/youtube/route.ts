import { NextResponse } from "next/server"
import { fetchYoutubeVideos, fetchChannelStats, getExampleVideos, isYoutubeShort } from "@/lib/youtube"

// Rota para buscar vídeos do YouTube
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  // Usar o ID do canal fornecido como padrão
  const channelId = searchParams.get("channelId") || "UCzb-8Ly6KmZOMbpQCDYJs_g"
  const maxResults = Number.parseInt(searchParams.get("maxResults") || "12")
  const type = searchParams.get("type") || "videos"

  // Verificar se a chave de API existe
  const API_KEY = process.env.YOUTUBE_API_KEY

  // Se não houver chave de API, usar dados de exemplo imediatamente
  if (!API_KEY) {
    console.log("Usando dados de exemplo porque a chave de API não está configurada")

    // Dados de exemplo para vídeos regulares
    const regularVideos = [
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
    ]

    // Dados de exemplo para shorts
    const shorts = [
      {
        id: "s1",
        title: "#minecraft #shorts",
        description: "Momentos engraçados no Minecraft #shorts #minecraft #gaming",
        thumbnail:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%7BC593A1F6-BA3B-4009-97BC-0097E55F3EE1%7D-lTqj3aerdlQpwDHtuiE6UkduzEWxqj.png",
        views: "863",
        likes: "46",
        category: "Shorts",
        date: "1 mês atrás",
        publishedAt: new Date("2023-01-15").toISOString(),
        videoId: "dQw4w9WgXcQ",
        isShort: true,
      },
      {
        id: "s2",
        title: "#minecraft #shorts",
        description: "Construção rápida no Minecraft! #minecraft #gaming #shorts",
        thumbnail:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%7BC593A1F6-BA3B-4009-97BC-0097E55F3EE1%7D-lTqj3aerdlQpwDHtuiE6UkduzEWxqj.png",
        views: "1.2K",
        likes: "12",
        category: "Shorts",
        date: "2 meses atrás",
        publishedAt: new Date("2023-01-01").toISOString(),
        videoId: "dQw4w9WgXcQ",
        isShort: true,
      },
    ]

    // Combinar vídeos regulares e shorts
    const allVideos = [...regularVideos, ...shorts]

    // Usar a função isYoutubeShort para garantir a classificação correta
    const processedVideos = allVideos.map((video) => ({
      ...video,
      isShort: video.isShort || isYoutubeShort(video),
    }))

    return NextResponse.json({
      success: true,
      data:
        type === "stats"
          ? {
              subscriberCount: "3870",
              videoCount: "395",
              viewCount: "150000",
              title: "Fenix Posts",
              description: "Canal de Minecraft e outros jogos",
              thumbnails: {},
            }
          : processedVideos,
      message: "Usando dados de exemplo porque a chave de API do YouTube não está configurada",
    })
  }

  try {
    if (type === "stats") {
      try {
        const stats = await fetchChannelStats(channelId)
        return NextResponse.json({ success: true, data: stats })
      } catch (error) {
        console.error("Erro ao buscar estatísticas do canal:", error)
        // Retornar estatísticas de exemplo
        return NextResponse.json({
          success: true,
          data: {
            subscriberCount: "3870",
            videoCount: "395",
            viewCount: "150000",
            title: "Fenix Posts",
            description: "Canal de Minecraft e outros jogos",
            thumbnails: {},
          },
          message: "Usando estatísticas de exemplo devido a um erro na API do YouTube",
        })
      }
    } else {
      try {
        const videos = await fetchYoutubeVideos(channelId, maxResults)

        if (!videos || videos.length === 0) {
          throw new Error("Nenhum vídeo encontrado")
        }

        return NextResponse.json({ success: true, data: videos })
      } catch (error) {
        console.error("Erro ao buscar vídeos:", error)

        // Dados de exemplo para vídeos regulares
        const regularVideos = [
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
        ]

        // Dados de exemplo para shorts
        const shorts = [
          {
            id: "s1",
            title: "#minecraft #shorts",
            description: "Momentos engraçados no Minecraft #shorts #minecraft #gaming",
            thumbnail:
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%7BC593A1F6-BA3B-4009-97BC-0097E55F3EE1%7D-lTqj3aerdlQpwDHtuiE6UkduzEWxqj.png",
            views: "863",
            likes: "46",
            category: "Shorts",
            date: "1 mês atrás",
            publishedAt: new Date("2023-01-15").toISOString(),
            videoId: "dQw4w9WgXcQ",
            isShort: true,
          },
          {
            id: "s2",
            title: "#minecraft #shorts",
            description: "Construção rápida no Minecraft! #minecraft #gaming #shorts",
            thumbnail:
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%7BC593A1F6-BA3B-4009-97BC-0097E55F3EE1%7D-lTqj3aerdlQpwDHtuiE6UkduzEWxqj.png",
            views: "1.2K",
            likes: "12",
            category: "Shorts",
            date: "2 meses atrás",
            publishedAt: new Date("2023-01-01").toISOString(),
            videoId: "dQw4w9WgXcQ",
            isShort: true,
          },
        ]

        // Combinar vídeos regulares e shorts
        const allVideos = [...regularVideos, ...shorts]

        // Usar a função isYoutubeShort para garantir a classificação correta
        const processedVideos = allVideos.map((video) => ({
          ...video,
          isShort: video.isShort || isYoutubeShort(video),
        }))

        return NextResponse.json({
          success: true,
          data: processedVideos,
          message: "Usando dados de exemplo porque ocorreu um erro ao buscar vídeos",
        })
      }
    }
  } catch (error) {
    console.error("Erro na API do YouTube:", error)
    // Em caso de erro, retornar dados de exemplo
    return NextResponse.json({
      success: true,
      data:
        type === "stats"
          ? {
              subscriberCount: "3870",
              videoCount: "395",
              viewCount: "150000",
              title: "Fenix Posts",
              description: "Canal de Minecraft e outros jogos",
              thumbnails: {},
            }
          : getExampleVideos(),
      message: "Usando dados de exemplo porque ocorreu um erro ao buscar dados",
    })
  }
}

