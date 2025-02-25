import { Button } from "@/components/ui/button"

export function StatsRow() {
  return (
    <div className="grid md:grid-cols-3 gap-4 my-4">
      <div className="bg-green-100 p-6 rounded-xl">
        <h3 className="text-xl font-bold mb-2">Poolz IDO Launch Pad</h3>
        <p className="text-sm mb-4">commits 3% of all launch tokens to community pool.</p>
        <Button variant="link" className="text-sm p-0">
          Learn How to Claim
        </Button>
      </div>

      <div className="bg-orange-100 p-6 rounded-xl">
        <h3 className="text-sm mb-2">Growth in Community Deployed Smart Contracts Past 30 Days</h3>
        <div className="text-4xl font-bold mb-2">2000%</div>
        <p className="text-sm mb-4">COTI Network</p>
        <Button variant="link" className="text-sm p-0">
          Explorer
        </Button>
      </div>

      <div className="bg-yellow-100 p-6 rounded-xl">
        <h3 className="text-sm mb-2">Frontends Deployed in March</h3>
        <div className="text-4xl font-bold mb-2">258</div>
        <div className="flex -space-x-2">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200" />
          ))}
        </div>
        <div className="mt-2 text-sm text-right">#COTICreatives</div>
      </div>
    </div>
  )
}

