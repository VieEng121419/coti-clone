'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from 'lucide-react'
import { Canvas } from '@react-three/fiber'
import HeroGrid from './hero-grid'
import useAnimatedPlaceholder from './AnimatedPlaceholder'
import { useScrollHandler } from '@/utils/scroll-utils'

export default function Hero() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])
  const [globeRotation, setGlobeRotation] = useState(0)
  const [isMouseMoving, setIsMouseMoving] = useState(false)
  const mousePosition = useRef({ x: 0, y: 0 })

  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY
    setGlobeRotation(scrollPosition * 0.001) // Smooth rotation based on scroll
  }, [])

  // Use debounced scroll handler
  useScrollHandler(handleScroll)

  useEffect(() => {
    let timeoutId
    const updateMousePosition = (e) => {
      mousePosition.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      }
      setGlobeRotation({
        x: mousePosition.current.x * 0.5,
        y: mousePosition.current.y * 0.5
      })
      setIsMouseMoving(true)
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => setIsMouseMoving(false), 100)
    }
    window.addEventListener('mousemove', updateMousePosition)
    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      clearTimeout(timeoutId)
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!input.trim()) return
    
    setIsOpen(true)
    setMessages([...messages, { role: 'user', content: input }])
    setInput('')
  }

  const placeholder = useAnimatedPlaceholder()

  return (
    <section className="w-full py-12 md:py-16 lg:py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <div className="bg-black text-white rounded-3xl p-12 md:p-16 lg:p-24 relative overflow-hidden">
          {/* Grid Overlay */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 w-[140%] h-[140%] -left-[20%] -top-[20%]">
              <Canvas
                camera={{ 
                  position: [0, 0, 50],
                  fov: 43,
                  near: 0.2,
                  far: 1000
                }}
              >
                <ambientLight intensity={0.1} />
                <HeroGrid globeRotation={globeRotation} isMouseMoving={isMouseMoving} />
              </Canvas>
            </div>
          </div>

          {/* Content */}
          <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-2">
              The Fastest Lightest Privacy Layer in Web3
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              Built <span className="line-through">for</span> by you
            </p>

            <div className="max-w-2xl mx-auto">
              <form onSubmit={handleSubmit} className="flex w-full items-center gap-0">
                <div className="relative flex-1">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={placeholder}
                    className="w-full pr-24 rounded-xl rounded-r-none h-12 text-base bg-white text-black border-r-0"
                  />
                </div>
                <Button 
                  type="submit"
                  className="h-12 px-6 rounded-xl rounded-l-none bg-emerald-100 text-black hover:bg-emerald-200 border-l-0 transition-colors duration-200"
                >
                  Create with COTI
                  <Send className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </div>

            <p className="text-sm sm:text-base text-gray-300 max-w-3xl mx-auto">
              Due to the emergence of AI tools, for the first time, every day users can be the creators, builders, developers, and VCs. Join a global creator community bringing privacy and adoption to Web3.
            </p>
          </div>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl h-[80vh] flex flex-col p-0">
          <DialogHeader className="sr-only">
            <DialogTitle>Chat with COTI</DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-3xl mx-auto space-y-8">
              {messages.map((message, i) => (
                <div
                  key={i}
                  className={`flex ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`rounded-lg px-4 py-2 max-w-[80%] ${
                      message.role === 'user'
                        ? 'bg-black text-white'
                        : 'bg-gray-100'
                    }`}
                  >
                    <div className="prose prose-sm">
                      {message.content.split('\n').map((line, j) => (
                        <p key={j} className="mb-2">
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="border-t p-4">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1"
              />
              <Button type="submit">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}

