import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const username = searchParams.get("username") || "fenixposts"

  try {
    const response = await fetch(`https://www.tiktok.com/@${username}`)
    if (!response.ok) throw new Error("Falha ao buscar vídeos do TikTok")

    // Simulação de dados de exemplo
    const exampleData = [
      {
        id: "1",
        title: "Vídeo TikTok 1",
        thumbnail: "/placeholder.svg",
        views: "1.2K",
        likes: "300",
      },
      {
        id: "2",
        title: "Vídeo TikTok 2",
        thumbnail: "/placeholder.svg",
        views: "900",
        likes: "150",
      },
    ]

    return NextResponse.json({ success: true, data: exampleData })
  } catch (error) {
    console.error("Erro ao buscar vídeos do TikTok:", error)
    return NextResponse.json({ success: false, data: [] })
  }
}
