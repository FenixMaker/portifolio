import { NextResponse } from "next/server"

// Rota para simular raspagem de dados do TikTok
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const username = searchParams.get("username") || "fenixposts"

  try {
    // Em um ambiente real, aqui seria implementada a lógica de web scraping
    // Como não podemos fazer web scraping real no ambiente do v0, vamos simular os dados

    // Simular um atraso para parecer uma requisição real
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Dados simulados baseados em screenshots reais
    const scrapedVideos = [
      {
        id: "t1",
        title: "ESSE JOGO É PERFEITO...",
        description: "SE GOSTAR DO VÍDEO DEIXA SEU LIKE ❤️ ✓ Comenta e curte o vídeo se você...",
        thumbnail:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%7B984687C5-9AFD-405C-AB35-B690722A7AEE%7D-ljyeE4KvDK6yVpKEtVsycrZX1aikGq.png",
        views: "334",
        likes: "33",
        category: "Gaming",
        date: "1 dia atrás",
        videoId: "7305304397526088965",
        publishedAt: new Date("2023-01-15").toISOString(),
        isShort: true,
      },
      {
        id: "t2",
        title: "#minecraft",
        description: "Dicas rápidas para melhorar seu jogo! #minecraft #gaming #tips #fenixposts",
        thumbnail:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%7BC590197C-7F65-4BD0-911A-B3BD4177A042%7D-eqOoWALbBssLBNzvN0SmhBcSdnuEnS.png",
        views: "863",
        likes: "46",
        category: "Tutorial",
        date: "1 mês atrás",
        videoId: "7305304397526088965",
        publishedAt: new Date("2023-01-01").toISOString(),
        isShort: true,
      },
      {
        id: "t3",
        title: "#minecraft",
        description: "Olha só essas construções insanas! #minecraft #reaction",
        thumbnail:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%7B9573B85B-EB4E-4F1D-8D51-1879C2A32DC0%7D-9ndHfvZmC5PK2O8er0gQyPDpMd9PC9.png",
        views: "1.2K",
        likes: "12",
        category: "Reaction",
        date: "2 meses atrás",
        videoId: "7305304397526088965",
        publishedAt: new Date("2022-12-20").toISOString(),
        isShort: true,
      },
      {
        id: "t4",
        title: "#minecraft",
        description: "Tutorial rápido para farm de XP! #minecraft #tutorial",
        thumbnail:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%7B9573B85B-EB4E-4F1D-8D51-1879C2A32DC0%7D-9ndHfvZmC5PK2O8er0gQyPDpMd9PC9.png",
        views: "875",
        likes: "82",
        category: "Tutorial",
        date: "2 meses atrás",
        videoId: "7305304397526088965",
        publishedAt: new Date("2022-12-01").toISOString(),
        isShort: true,
      },
      {
        id: "t5",
        title: "#minecraft",
        description: "Compilação de fails e momentos hilários! #minecraft #funny",
        thumbnail:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%7B9573B85B-EB4E-4F1D-8D51-1879C2A32DC0%7D-9ndHfvZmC5PK2O8er0gQyPDpMd9PC9.png",
        views: "1.8K",
        likes: "18",
        category: "Entretenimento",
        date: "2 meses atrás",
        videoId: "7305304397526088965",
        publishedAt: new Date("2022-11-15").toISOString(),
        isShort: true,
      },
      {
        id: "t6",
        title: "Transformação de Base em 60 Segundos",
        description: "De cabana a mansão em um minuto! #minecraft #transformation #fenixposts",
        thumbnail:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%7B7A7325E5-243C-4E11-8F69-DCEAEB60A8A7%7D-DjJEEkXza9DMIVOJDrb5ktEckiT941.png",
        views: "1.8K",
        likes: "420",
        category: "Construção",
        date: "3 meses atrás",
        videoId: "7305304397526088965",
        publishedAt: new Date("2022-11-01").toISOString(),
        isShort: true,
      },
      {
        id: "t7",
        title: "Como Fazer uma Farm de XP em 1 Minuto",
        description: "Tutorial rápido para farm de XP! #minecraft #tutorial #fenixposts",
        thumbnail:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%7B9573B85B-EB4E-4F1D-8D51-1879C2A32DC0%7D-9ndHfvZmC5PK2O8er0gQyPDpMd9PC9.png",
        views: "1.5K",
        likes: "350",
        category: "Tutorial",
        date: "2 meses atrás",
        videoId: "7305304397526088965",
        publishedAt: new Date("2022-12-01").toISOString(),
        isShort: true,
      },
      {
        id: "t8",
        title: "Momentos Engraçados no Minecraft",
        description: "Compilação de fails e momentos hilários! #minecraft #funny",
        thumbnail:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%7B7A7325E5-243C-4E11-8F69-DCEAEB60A8A7%7D-DjJEEkXza9DMIVOJDrb5ktEckiT941.png",
        views: "2.2K",
        likes: "480",
        category: "Entretenimento",
        date: "3 meses atrás",
        videoId: "7305304397526088965",
        publishedAt: new Date("2022-11-15").toISOString(),
        isShort: true,
      },
      {
        id: "t9",
        title: "Minecraft Build Challenge",
        description: "Construindo uma casa em 60 segundos! #minecraft #gaming #fenixposts",
        thumbnail:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%7B9573B85B-EB4E-4F1D-8D51-1879C2A32DC0%7D-9ndHfvZmC5PK2O8er0gQyPDpMd9PC9.png",
        views: "1.2K",
        likes: "320",
        category: "Construção",
        date: "2 semanas atrás",
        videoId: "7305304397526088965",
        publishedAt: new Date("2023-01-15").toISOString(),
        isShort: true,
      },
      {
        id: "t10",
        title: "Top 5 Minecraft Hacks que Você Precisa Conhecer",
        description: "Dicas rápidas para melhorar seu jogo! #minecraft #gaming #tips #fenixposts",
        thumbnail:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%7B7A7325E5-243C-4E11-8F69-DCEAEB60A8A7%7D-DjJEEkXza9DMIVOJDrb5ktEckiT941.png",
        views: "950",
        likes: "210",
        category: "Tutorial",
        date: "1 mês atrás",
        videoId: "7305304397526088965",
        publishedAt: new Date("2023-01-01").toISOString(),
        isShort: true,
      },
      {
        id: "t11",
        title: "Reagindo a Builds Incríveis",
        description: "Olha só essas construções insanas! #minecraft #reaction",
        thumbnail:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%7B9573B85B-EB4E-4F1D-8D51-1879C2A32DC0%7D-9ndHfvZmC5PK2O8er0gQyPDpMd9PC9.png",
        views: "870",
        likes: "190",
        category: "Reaction",
        date: "1 mês atrás",
        videoId: "7305304397526088965",
        publishedAt: new Date("2022-12-20").toISOString(),
        isShort: true,
      },
      {
        id: "t12",
        title: "Como Fazer uma Farm de XP em 1 Minuto",
        description: "Tutorial rápido para farm de XP! #minecraft #tutorial #fenixposts",
        thumbnail:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%7B7A7325E5-243C-4E11-8F69-DCEAEB60A8A7%7D-DjJEEkXza9DMIVOJDrb5ktEckiT941.png",
        views: "1.5K",
        likes: "350",
        category: "Tutorial",
        date: "2 meses atrás",
        videoId: "7305304397526088965",
        publishedAt: new Date("2022-12-01").toISOString(),
        isShort: true,
      },
    ]

    return NextResponse.json({
      success: true,
      videos: scrapedVideos,
      message: "Dados raspados com sucesso do TikTok para @" + username,
    })
  } catch (error) {
    console.error("Erro ao raspar dados do TikTok:", error)
    return NextResponse.json(
      {
        success: false,
        videos: [],
        message: "Erro ao raspar dados do TikTok",
      },
      { status: 500 },
    )
  }
}

