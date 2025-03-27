import Link from "next/link"
import { Youtube, Twitch, Instagram } from "lucide-react"
import TikTokIcon from "./icons/tiktok-icon"

interface SocialIconsProps {
  className?: string
  iconSize?: number
}

export function SocialIcons({ className = "", iconSize = 5 }: SocialIconsProps) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <Link
        href="https://www.youtube.com/@FenixPosts"
        target="_blank"
        rel="noopener noreferrer"
        className="text-zinc-400 hover:text-red-500 transition-colors"
        aria-label="YouTube"
      >
        <Youtube className={`h-${iconSize} w-${iconSize}`} />
      </Link>
      <Link
        href="https://www.twitch.tv/fenixposts"
        target="_blank"
        rel="noopener noreferrer"
        className="text-zinc-400 hover:text-purple-500 transition-colors"
        aria-label="Twitch"
      >
        <Twitch className={`h-${iconSize} w-${iconSize}`} />
      </Link>
      <Link
        href="https://www.tiktok.com/@fenixposts"
        target="_blank"
        rel="noopener noreferrer"
        className="text-zinc-400 hover:text-cyan-400 transition-colors"
        aria-label="TikTok"
      >
        <TikTokIcon className={`h-${iconSize} w-${iconSize}`} />
      </Link>
      <Link
        href="https://www.instagram.com/fenixposts"
        target="_blank"
        rel="noopener noreferrer"
        className="text-zinc-400 hover:text-pink-500 transition-colors"
        aria-label="Instagram"
      >
        <Instagram className={`h-${iconSize} w-${iconSize}`} />
      </Link>
    </div>
  )
}
