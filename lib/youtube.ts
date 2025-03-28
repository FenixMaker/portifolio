// Função para buscar vídeos do canal do YouTube
export async function fetchYoutubeVideos(channelId: string, maxResults = 12) {
  // Usar a chave de API do YouTube da variável de ambiente
  const API_KEY = process.env.YOUTUBE_API_KEY

  if (!API_KEY) {
    console.error("Chave de API do YouTube não encontrada")
    throw new Error("Chave de API do YouTube não encontrada")
  }

  try {
    // Remover o @ do início do nome do canal, se existir
    const cleanChannelId = channelId.startsWith("@") ? channelId.substring(1) : channelId

    // Verificar se o channelId parece ser um ID completo (começa com UC)
    // ou se é um nome de usuário
    let searchParam = ""
    let searchValue = ""

    if (cleanChannelId.startsWith("UC")) {
      searchParam = "id"
      searchValue = cleanChannelId
    } else {
      // Se não começar com UC, assumimos que é um nome de usuário
      searchParam = "forUsername"
      searchValue = cleanChannelId
    }

    // Primeiro, tentar buscar pelo parâmetro determinado acima
    let channelResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&${searchParam}=${searchValue}&key=${API_KEY}`,
    )

    // Se falhar e estávamos tentando por username, tentar pelo handle (@username)
    if (!channelResponse.ok && searchParam === "forUsername") {
      console.log("Tentando buscar pelo handle do canal...")
      channelResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${cleanChannelId}&type=channel&key=${API_KEY}`,
      )

      if (channelResponse.ok) {
        const searchData = await channelResponse.json()
        if (searchData.items && searchData.items.length > 0) {
          const foundChannelId = searchData.items[0].id.channelId
          console.log(`Canal encontrado pelo handle: ${foundChannelId}`)

          // Agora buscar os detalhes do canal usando o ID encontrado
          channelResponse = await fetch(
            `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${foundChannelId}&key=${API_KEY}`,
          )
        }
      }
    }

    if (!channelResponse.ok) {
      const errorText = await channelResponse.text()
      console.error(`Resposta da API do YouTube: ${errorText}`)
      throw new Error(`Falha ao buscar informações do canal: ${errorText}`)
    }

    const channelData = await channelResponse.json()

    if (!channelData.items || channelData.items.length === 0) {
      throw new Error(`Canal não encontrado: ${channelId}`)
    }

    const uploadsPlaylistId = channelData.items[0]?.contentDetails?.relatedPlaylists?.uploads

    if (!uploadsPlaylistId) {
      throw new Error("Não foi possível encontrar a playlist de uploads")
    }

    // Agora, buscar os vídeos da playlist de uploads
    const videosResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&maxResults=${maxResults}&playlistId=${uploadsPlaylistId}&key=${API_KEY}`,
    )

    if (!videosResponse.ok) {
      throw new Error(`Falha ao buscar vídeos: ${await videosResponse.text()}`)
    }

    const videosData = await videosResponse.json()

    if (!videosData.items || videosData.items.length === 0) {
      return []
    }

    // Formatar os dados dos vídeos
    const videos = videosData.items.map((item: any) => {
      const snippet = item.snippet
      const videoId = item.contentDetails.videoId

      // Melhorar a detecção de shorts
      const isShort =
        snippet.title.toLowerCase().includes("#shorts") ||
        snippet.description.toLowerCase().includes("#shorts") ||
        (snippet.title.startsWith("#") && snippet.title.length < 30)

      return {
        id: videoId,
        title: snippet.title,
        description: snippet.description,
        thumbnail: snippet.thumbnails.high?.url || snippet.thumbnails.default?.url,
        publishedAt: snippet.publishedAt,
        videoId: videoId,
        isShort: isShort,
        thumbnailWidth: snippet.thumbnails.high?.width || snippet.thumbnails.default?.width,
        thumbnailHeight: snippet.thumbnails.high?.height || snippet.thumbnails.default?.height,
      }
    })

    // Buscar estatísticas para cada vídeo (visualizações, likes)
    const videoIds = videos.map((video: any) => video.id).join(",")
    const statsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoIds}&key=${API_KEY}`,
    )

    if (!statsResponse.ok) {
      throw new Error("Falha ao buscar estatísticas dos vídeos")
    }

    const statsData = await statsResponse.json()

    // Adicionar estatísticas aos vídeos
    const videosWithStats = videos.map((video: any) => {
      const videoStats = statsData.items.find((item: any) => item.id === video.id)?.statistics

      return {
        ...video,
        views: videoStats?.viewCount || "0",
        likes: videoStats?.likeCount || "0",
        // Determinar a categoria com base no título ou descrição
        category: getCategoryFromVideo(video.title, video.description),
      }
    })

    return videosWithStats
  } catch (error) {
    console.error("Erro ao buscar vídeos do YouTube:", error)
    throw error
  }
}

// Função para determinar a categoria do vídeo com base no título ou descrição
function getCategoryFromVideo(title: string, description: string) {
  const content = (title + " " + description).toLowerCase()

  if (content.includes("#shorts")) {
    return "Shorts"
  } else if (
    content.includes("tutorial") ||
    content.includes("como fazer") ||
    content.includes("aprenda") ||
    content.includes("dica")
  ) {
    return "Tutorial"
  } else if (content.includes("live") || content.includes("ao vivo") || content.includes("stream")) {
    return "Live"
  } else if (
    content.includes("compilação") ||
    content.includes("melhores momentos") ||
    content.includes("highlights")
  ) {
    return "Compilação"
  } else if (content.includes("gameplay") || content.includes("jogando")) {
    return "Gameplay"
  } else if (content.includes("review") || content.includes("análise")) {
    return "Review"
  } else if (content.includes("mod") || content.includes("modpack")) {
    return "Mods"
  } else if (content.includes("construção") || content.includes("build")) {
    return "Construção"
  } else if (content.includes("pvp") || content.includes("player vs player")) {
    return "PVP"
  } else if (content.includes("survival") || content.includes("sobrevivência")) {
    return "Survival"
  } else {
    return "Minecraft"
  }
}

// Atualizar a função fetchChannelStats para usar o mesmo padrão de busca por nome de usuário

// Função para buscar estatísticas do canal
export async function fetchChannelStats(channelId: string) {
  const API_KEY = process.env.YOUTUBE_API_KEY

  if (!API_KEY) {
    console.error("Chave de API do YouTube não encontrada")
    throw new Error("Chave de API do YouTube não encontrada")
  }

  try {
    // Remover o @ do início do nome do canal, se existir
    const cleanChannelId = channelId.startsWith("@") ? channelId.substring(1) : channelId

    // Verificar se o channelId parece ser um ID completo (começa com UC)
    let searchParam = ""
    let searchValue = ""

    if (cleanChannelId.startsWith("UC")) {
      searchParam = "id"
      searchValue = cleanChannelId
    } else {
      // Se não começar com UC, assumimos que é um nome de usuário
      searchParam = "forUsername"
      searchValue = cleanChannelId
    }

    // Primeiro, tentar buscar pelo parâmetro determinado acima
    let response = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet&${searchParam}=${searchValue}&key=${API_KEY}`,
    )

    // Se falhar e estávamos tentando por username, tentar pelo handle (@username)
    if (!response.ok && searchParam === "forUsername") {
      console.log("Tentando buscar pelo handle do canal...")
      const searchResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${cleanChannelId}&type=channel&key=${API_KEY}`,
      )

      if (searchResponse.ok) {
        const searchData = await searchResponse.json()
        if (searchData.items && searchData.items.length > 0) {
          const foundChannelId = searchData.items[0].id.channelId
          console.log(`Canal encontrado pelo handle: ${foundChannelId}`)

          // Agora buscar os detalhes do canal usando o ID encontrado
          response = await fetch(
            `https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet&id=${foundChannelId}&key=${API_KEY}`,
          )
        }
      }
    }

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`Resposta da API do YouTube: ${errorText}`)
      throw new Error(`Falha ao buscar estatísticas do canal: ${errorText}`)
    }

    const data = await response.json()

    if (!data.items || data.items.length === 0) {
      throw new Error(`Canal não encontrado: ${channelId}`)
    }

    const channelStats = data.items[0]?.statistics
    const channelInfo = data.items[0]?.snippet

    return {
      subscriberCount: channelStats?.subscriberCount || "0",
      videoCount: channelStats?.videoCount || "0",
      viewCount: channelStats?.viewCount || "0",
      title: channelInfo?.title || "",
      description: channelInfo?.description || "",
      thumbnails: channelInfo?.thumbnails || {},
    }
  } catch (error) {
    console.error("Erro ao buscar estatísticas do canal:", error)
    throw error
  }
}

// Melhorar a função de detecção de shorts
export function isYoutubeShort(video: any): boolean {
  // Verificar se o título ou descrição contém #shorts
  if (video.title?.toLowerCase().includes("#shorts") || video.description?.toLowerCase().includes("#shorts")) {
    return true
  }

  // Verificar se a categoria é Shorts
  if (video.category === "Shorts") {
    return true
  }

  // Verificar se o título começa com # e é curto (típico de shorts)
  if (video.title?.startsWith("#") && video.title?.length < 30) {
    return true
  }

  // Verificar proporção da thumbnail (se disponível)
  if (video.thumbnailHeight && video.thumbnailWidth) {
    const ratio = video.thumbnailHeight / video.thumbnailWidth
    if (ratio > 1.5) {
      // Formato vertical típico de shorts (1080x1920 tem ratio de 1.78)
      return true
    }
  }

  return false
}

// Função para formatar números grandes
export function formatNumber(num: string | number) {
  const n = typeof num === "string" ? Number.parseInt(num) : num

  if (n >= 1000000) {
    return (n / 1000000).toFixed(1) + "M"
  } else if (n >= 1000) {
    return (n / 1000).toFixed(1) + "K"
  } else {
    return n.toString()
  }
}

// Função para calcular o tempo desde a publicação
export function timeAgo(dateString: string) {
  const date = new Date(dateString)
  const now = new Date()
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  let interval = Math.floor(seconds / 31536000)
  if (interval >= 1) {
    return interval === 1 ? "1 ano atrás" : `${interval} anos atrás`
  }

  interval = Math.floor(seconds / 2592000)
  if (interval >= 1) {
    return interval === 1 ? "1 mês atrás" : `${interval} meses atrás`
  }

  interval = Math.floor(seconds / 86400)
  if (interval >= 1) {
    return interval === 1 ? "1 dia atrás" : `${interval} dias atrás`
  }

  interval = Math.floor(seconds / 3600)
  if (interval >= 1) {
    return interval === 1 ? "1 hora atrás" : `${interval} horas atrás`
  }

  interval = Math.floor(seconds / 60)
  if (interval >= 1) {
    return interval === 1 ? "1 minuto atrás" : `${interval} minutos atrás`
  }

  return "agora mesmo"
}

// Função para gerar dados de exemplo
export function getExampleVideos() {
  return [
    {
      id: "1",
      title: "COMPILADO DE MELHORES MOMENTOS DAS LIVES",
      description: "Uma seleção dos momentos mais engraçados e incríveis das lives",
      thumbnail: "/placeholder.svg?height=400&width=600",
      views: "171",
      likes: "24",
      category: "Compilação",
      date: "1 ano atrás",
      videoId: "dQw4w9WgXcQ",
      publishedAt: new Date().toISOString(),
      isShort: false,
    },
    {
      id: "2",
      title: "TUTORIAL: COMO FAZER UMA FARM AUTOMÁTICA NO MINECRAFT",
      description: "Aprenda a construir uma farm eficiente e automática",
      thumbnail: "/placeholder.svg?height=400&width=600",
      views: "342",
      likes: "56",
      category: "Tutorial",
      date: "8 meses atrás",
      videoId: "dQw4w9WgXcQ",
      publishedAt: new Date().toISOString(),
      isShort: false,
    },
    {
      id: "3",
      title: "JOGANDO MINECRAFT COM MODS INSANOS",
      description: "Explorando os mods mais loucos da comunidade",
      thumbnail: "/placeholder.svg?height=400&width=600",
      views: "215",
      likes: "38",
      category: "Gameplay",
      date: "6 meses atrás",
      videoId: "dQw4w9WgXcQ",
      publishedAt: new Date().toISOString(),
      isShort: false,
    },
    {
      id: "4",
      title: "COMO ENCONTRAR DIAMANTES RAPIDAMENTE NO MINECRAFT",
      description: "Dicas e truques para encontrar diamantes de forma eficiente",
      thumbnail: "/placeholder.svg?height=400&width=600",
      views: "189",
      likes: "32",
      category: "Tutorial",
      date: "5 meses atrás",
      videoId: "dQw4w9WgXcQ",
      publishedAt: new Date().toISOString(),
      isShort: false,
    },
    {
      id: "5",
      title: "CONSTRUINDO UMA CASA AUTOMÁTICA NO MINECRAFT",
      description: "Tutorial de construção com redstone e automação",
      thumbnail: "/placeholder.svg?height=400&width=600",
      views: "276",
      likes: "45",
      category: "Construção",
      date: "4 meses atrás",
      videoId: "dQw4w9WgXcQ",
      publishedAt: new Date().toISOString(),
      isShort: false,
    },
    {
      id: "6",
      title: "HIGHLIGHTS DA LIVE DE ONTEM",
      description: "Os melhores momentos da transmissão ao vivo",
      thumbnail: "/placeholder.svg?height=400&width=600",
      views: "124",
      likes: "19",
      category: "Live",
      date: "3 meses atrás",
      videoId: "dQw4w9WgXcQ",
      publishedAt: new Date().toISOString(),
      isShort: false,
    },
  ]
}

