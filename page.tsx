import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ProjectCard } from "@/components/project-card"
import { EventCarousel } from "@/components/event-carousel"
import { StatsRow } from "@/components/stats-row"
import { KoSamuiSection } from "@/components/ko-samui-section"

export default function Home() {
  const projects = [
    {
      category: "BUILD",
      title: "Build a Private Medical Data PoC",
      description: "Create a secure, privacy-focused application for managing and sharing medical data using our SDK.",
      rewardPool: "$3,000",
      backgroundColor: "bg-green-100",
    },
    {
      category: "INTEGRATE",
      title: "Integrate Avae w/ COTI",
      description: "Build the integration between Avae's existing infrastructure and COTI's privacy framework.",
      rewardPool: "$35,000",
      backgroundColor: "bg-black text-white",
    },
    {
      category: "CREATION SQUAD",
      title: "Launch a Private AI Music Album w/ 20K Streams",
      description: "Use AI to generate unique music while maintaining creator privacy and rights management.",
      rewardPool: "$250",
      backgroundColor: "bg-purple-100",
    },
    {
      category: "BUILD",
      title: "Create a Private Metadata NFT project",
      description: "Design and launch a privacy-preserving NFT collection with built-in royalty distribution.",
      rewardPool: "$2,500",
      backgroundColor: "bg-yellow-100",
    },
    {
      category: "RESEARCH",
      title: "Web3 Privacy Solutions Report",
      description: "Create comprehensive industry analysis of current web3 privacy solutions and future trends.",
      rewardPool: "$1,500",
      backgroundColor: "bg-blue-100",
    },
    {
      category: "COMMUNITY",
      title: "COTI Creation Party in Tokyo",
      description: "Organize and host a builder-focused event in Tokyo to expand our Asia presence.",
      rewardPool: "$1,250",
      backgroundColor: "bg-pink-100",
    },
    {
      category: "GROWTH",
      title: "Novel And Realistic Use Case for Private Farcaster Frames",
      description: "Design and launch a privacy-preserving NFT collection with built-in royalty distribution.",
      rewardPool: "$2,500",
      backgroundColor: "bg-orange-100",
    },
    {
      category: "CONTENT",
      title: "Privacy in AI Interview Series",
      description: "Create podcast interviews with AI industry leaders on privacy challenges and solutions.",
      rewardPool: "$1,500",
      backgroundColor: "bg-blue-100",
    },
    {
      category: "BUILD",
      title: "Privacy-First Social Platform",
      description: "Develop a social media platform with built-in privacy features and data protection.",
      rewardPool: "$2,500",
      backgroundColor: "bg-green-100",
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <Image
            src="https://sjc.microlink.io/JKqLQfMA08UsEaXt5u175-oYHHklgeonNhwAgMKH2DbpTaJRdCbWzgAJO6BTBBPq708_BV35oUua5ssVs13Teg.jpeg"
            alt="COTI Logo"
            width={80}
            height={24}
            className="object-contain"
          />
        </div>

        <div className="hidden md:flex items-center gap-8">
          <Link href="#" className="text-sm hover:text-gray-300">
            Commitments
          </Link>
          <Link href="#" className="text-sm hover:text-gray-300">
            About
          </Link>
          <Link href="#" className="text-sm hover:text-gray-300">
            WAGMI Center
          </Link>
          <Button className="bg-purple-100 text-black hover:bg-purple-200">Earn With COTI</Button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative px-6 py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="grid grid-cols-30 gap-1 text-[8px] text-gray-600">
            {Array.from({ length: 900 }).map((_, i) => (
              <span key={i}>{Math.round(Math.random())}</span>
            ))}
          </div>
        </div>

        <div className="relative max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">The Fastest Lightest Privacy Layer in Web3</h1>

          <p className="text-xl">
            Built <span className="line-through">for</span> by you
          </p>

          <div className="flex max-w-xl mx-auto gap-2">
            <Input placeholder="I want to create a privat" className="bg-white/10 border-0" />
            <Button className="bg-green-200 text-black hover:bg-green-300 whitespace-nowrap">
              Create with COTI <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <p className="text-gray-400 max-w-2xl mx-auto">
            Due to the emergence of AI tools, for the first time, every day users can be the creators, builders,
            developers, and VCs. Join a global creator community bringing privacy and adoption to Web3.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="px-6 py-24 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <h2 className="text-6xl md:text-7xl font-bold">375,987</h2>
          <h3 className="text-2xl md:text-3xl font-bold">Community Members Building</h3>
          <p className="text-gray-400 max-w-3xl mx-auto">
            The majority of COTI Network's community builders programatically share portions of successful builds with
            the community fund which ensures there are more rewards for the entire COTI community.
          </p>
        </div>
      </div>

      {/* New Sections */}
      <div className="px-6 py-12 bg-white text-black">
        <div className="max-w-7xl mx-auto space-y-12">
          <EventCarousel />
          <StatsRow />
          <KoSamuiSection />
        </div>
      </div>

      {/* WAGMI Projects Section */}
      <div className="px-6 py-24 bg-white text-black">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold">WAGMI Projects</h2>
            <p className="max-w-4xl mx-auto text-gray-600">
              Getting rewarded in Web3 isn't just for VCs, traders, and 10x developers anymore. We're bringing back
              WAGMI with community creation, building, ideation, and inspiration. Everyone supporting the COTI community
              has the opportunity to build, create, evangelize, and benefit. We build out loud and use COTI resources to
              promote, unblock, and elevate the best community ideas, projects, meetups, campaigns, and creations.
              Choose an activity below, and get started.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

