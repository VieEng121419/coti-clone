import { Button } from "@/components/ui/button"
import Image from "next/image"

export function KoSamuiSection() {
  return (
    <div className="bg-blue-50 rounded-xl overflow-hidden">
      <div className="grid md:grid-cols-2 gap-8 p-8">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">Create With COTI in Ko Samui</h2>
          <p className="text-lg">
            Join 15 COTI community members for a 4-week all-expenses paid create-a-thon on the island of Ko Samui,
            Thailand.
          </p>
          <p className="text-sm text-gray-600">
            Top contributors to the COTI Network will be selected to attend the first COTI Create Summit in a shared
            villa in Ko Samui. The COTI Create Summit will be a 4-week live event where you can learn from, and build
            alongside, the best in the COTI community.
          </p>
          <Button className="bg-black text-white hover:bg-black/90">Get to Ko Samui</Button>
        </div>
        <div className="relative h-[300px] rounded-xl overflow-hidden">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-YpdGen7S48BwYKyKnCMCQgQOJhsEL1.png"
            alt="Ko Samui Villa"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  )
}

