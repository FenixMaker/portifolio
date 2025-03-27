import Link from "next/link"
import Image from "next/image"
import { Twitch, Youtube } from "lucide-react"
import { FeaturedVideos } from "@/components/featured-videos"
import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
import { ContactSection } from "@/components/contact-section"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-900 text-white">
      <header className="px-4 lg:px-6 h-16 flex items-center justify-between border-b border-zinc-800">
        <Link className="flex items-center justify-center gap-2" href="/">
          <Image src="/images/logo.png" alt="Fenix Posts Logo" width={32} height={32} />
          <span className="font-bold text-xl"></span>
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
          <Link className="text-sm font-medium hover:text-red-500 transition-colors" href="/contact">
            Contato
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <HeroSection />
        <FeaturedVideos />
        <ServicesSection />
        <ContactSection />
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-zinc-800">
        <p className="text-xs text-zinc-400">© 2025 Fenix Posts. Todos os direitos reservados.</p>
        <div className="sm:ml-auto flex items-center gap-4">
          <Link
            href="https://www.youtube.com/@FenixPosts"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-red-500 transition-colors"
          >
            <Youtube className="h-5 w-5" />
          </Link>
          <Link
            href="https://www.twitch.tv/fenixposts"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-purple-500 transition-colors"
          >
            <Twitch className="h-5 w-5" />
          </Link>
        </div>
      </footer>
    </div>
  )
}

