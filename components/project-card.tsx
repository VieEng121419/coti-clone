import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Lightbulb, FileText, ThumbsUp } from "lucide-react"

interface ProjectCardProps {
  category: string
  title: string
  description: string
  rewardPool: string
  backgroundColor: string
}

export function ProjectCard({ category, title, description, rewardPool, backgroundColor }: ProjectCardProps) {
  return (
    <Card className={`${backgroundColor} border-0`}>
      <CardHeader className="pb-2">
        <p className="text-sm font-medium">{category}</p>
        <h3 className="text-xl font-bold">{title}</h3>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-700">{description}</p>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-4">
        <div>
          <p className="text-xs">Reward Pool</p>
          <p className="text-lg font-bold">{rewardPool}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Lightbulb className="h-4 w-4" />
            Ideas
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <FileText className="h-4 w-4" />
            Brief
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <ThumbsUp className="h-4 w-4" />
            Upvote
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

