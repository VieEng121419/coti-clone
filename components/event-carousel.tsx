import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function EventCarousel() {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      {/* Nairobi Event Panel */}
      <div className="relative h-[400px] overflow-hidden rounded-xl">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-YpdGen7S48BwYKyKnCMCQgQOJhsEL1.png"
          alt="Nairobi Event"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute bottom-0 left-0 p-6 text-white">
          <h3 className="text-2xl font-bold mb-2">Nairobi</h3>
          <div className="flex items-center gap-2">
            <span className="text-4xl font-bold">117</span>
            <span className="text-lg">Attended</span>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="absolute bottom-6 right-6 rounded-full bg-white/10 hover:bg-white/20 text-white"
        >
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Community Events Panel */}
      <div className="bg-purple-100 p-6 rounded-xl">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">Community Led Events</h3>
            <p className="text-sm">Coming in '25</p>
          </div>
          <div className="text-5xl font-bold mb-6">142</div>
          <div>
            <h4 className="text-sm font-medium mb-4">Upcoming Community IRL Events</h4>
            <div className="space-y-3">
              {[
                { date: "10/02/25", city: "Singapore" },
                { date: "19/02/25", city: "Ho Chi Minh City" },
                { date: "26/02/25", city: "London" },
                { date: "02/03/25", city: "Paris, KY" },
                { date: "10/03/25", city: "Tel Aviv" },
                { date: "18/03/25", city: "Bangkok" },
              ].map((event) => (
                <div key={event.date} className="flex items-center gap-2">
                  <div className="bg-yellow-300 px-2 py-1 rounded text-xs">{event.date}</div>
                  <span className="text-sm">{event.city}</span>
                </div>
              ))}
            </div>
          </div>
          <Button variant="link" className="text-sm p-0">
            Claim a post hoc event grant.
          </Button>
        </div>
      </div>

      {/* Creatives Panel */}
      <div className="relative h-[400px] overflow-hidden rounded-xl">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-YpdGen7S48BwYKyKnCMCQgQOJhsEL1.png"
          alt="COTI Creatives meeting"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute top-6 right-6 text-white text-right">
          <h3 className="text-2xl font-bold mb-1">Creatives*</h3>
          <p className="text-sm">January, 15th</p>
          <p className="text-sm">1:00pm GMT</p>
        </div>
        <div className="absolute bottom-6 left-6 right-6 text-white">
          <p className="text-sm mb-4">COTI Creatives meeting to plan COTI SWAG for 2025.</p>
          <Button className="w-full" variant="outline">
            RSVP to join and co-create
          </Button>
        </div>
      </div>
    </div>
  )
}

