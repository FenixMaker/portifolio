import { NextResponse } from "next/server"
import { fetchYoutubeVideos, fetchChannelStats, getExampleVideos } from "@/lib/youtube"

// Rota para buscar vídeos do YouTube
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  // Usar o ID do canal fornecido como padrão
  const channelId = searchParams.get("channelId") || "UCzb-8Ly6KmZOMbpQCDYJs_g"
  const maxResults = Number.parseInt(searchParams.get("maxResults") || "9")
  const type = searchParams.get("type") || "videos"

  // Verificar se a chave de API existe
  const API_KEY = process.env.YOUTUBE_API_KEY

  // Se não houver chave de API, usar dados de exemplo imediatamente
  if (!API_KEY) {
    console.log("Usando dados de exemplo porque a chave de API não está configurada")

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
        // Em caso de erro, retornar dados de exemplo
        return NextResponse.json({
          success: true,
          data: getExampleVideos(),
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

