'use client'

import { useState, useEffect, useCallback } from 'react'
import { Lightbulb, FileText, ArrowRight, ThumbsUp } from 'lucide-react'
import IdeasModal from './ideas-modal'
import BriefModal from './brief-modal'
import UpvoteModal from './upvote-modal' // Import UpvoteModal
import { ideasData } from '../data/ideas-data'
import { briefData } from '../data/brief-data'
import { bounties } from '../data/bounties-data'

export default function BountyGrid() {
  const [selectedBounty, setSelectedBounty] = useState(null)
  const [selectedBrief, setSelectedBrief] = useState(null)
  const [isUpvoteModalOpen, setIsUpvoteModalOpen] = useState(false) // Add UpvoteModal state
  const [selectedProjectTitle, setSelectedProjectTitle] = useState(null); //Update 1

  const handleIdeaClick = (bountyTitle) => {
    if (ideasData[bountyTitle]) {
      setSelectedBounty(bountyTitle)
    }
  }

  const handleBriefClick = (bountyTitle) => {
    if (briefData[bountyTitle]) {
      setSelectedBrief(bountyTitle);
      console.log('Opening brief for:', bountyTitle); // Add this debug log
    } else {
      console.log('No brief data found for:', bountyTitle); // Add this debug log
    }
  }

  const handleUpvoteClick = useCallback((title) => { // Update 2
    console.log('Upvote button clicked for:', title); // Update 2
    setSelectedProjectTitle(title); // Update 2
    setIsUpvoteModalOpen(true); // Update 2
  }, []); // Update 2

  const selectedBountyData = selectedBounty ? ideasData[selectedBounty] : null
  const selectedBriefData = selectedBrief ? briefData[selectedBrief] : null

  useEffect(() => {
    console.log('Available bounties:', Object.keys(ideasData)) // Debug log
    console.log('Available briefs:', Object.keys(briefData)); // Add this debug log
  }, [])

  return (
    <section className="py-16 px-4" id="WAGMICetner">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          <span className="">WAGMI Projects</span>
        </h2>
        <p className="text-gray-600 max-w-4xl mx-auto text-center mb-12">
          Getting rewarded in Web3 isn't just for VCs, traders, and 10x deveoplers anymore. We're bringing back WAGMI with community creation, building, ideation, and inspiration. Everyone supporting the COTI community has the opportunity to build, create, evangelize, and benefit. We build out loud and use COTI resources to promote, unblock, and elevate the best community ideas, projects, meetups, campaigns, and creations. Choose an activity below, and get started.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bounties.map((bounty, index) => (
            <div 
              key={index}
              className={`${bounty.bgColor} rounded-xl p-6 flex flex-col justify-between h-full`}
            >
              <div className="space-y-4 flex-1">
                <div className="text-sm font-medium tracking-wide opacity-80">
                  {bounty.type}
                </div>
                
                <h3 className="font-bold text-2xl">{bounty.title}</h3>
                
                <p className="text-sm opacity-80">
                  {bounty.description}
                </p>
              </div>

              <div className="pt-4 border-t border-black/10 mt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs opacity-70">{bounty.metric}</div>
                    <div className="font-bold">{bounty.value}</div>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <button 
                      onClick={() => handleIdeaClick(bounty.title)}
                      className="flex items-center gap-2 text-sm font-medium hover:opacity-70"
                    >
                      <Lightbulb size={18} />
                      Ideas
                    </button>
                    <button 
                      onClick={() => handleBriefClick(bounty.title)}
                      className="flex items-center gap-2 text-sm font-medium hover:opacity-70"
                    >
                      <FileText size={18} />
                      Brief
                    </button>
                    <button 
                      onClick={() => handleUpvoteClick(bounty.title)} // Update 3
                      className="flex items-center gap-2 text-sm font-medium hover:opacity-70"
                    >
                      <ThumbsUp size={18} />
                      Upvote
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedBountyData && (
        <IdeasModal 
          open={!!selectedBounty}
          onOpenChange={() => setSelectedBounty(null)}
          title={selectedBountyData.title}
          description={selectedBountyData.description}
          data={selectedBountyData.data}
        />
      )}

      {selectedBrief && (
        <BriefModal
          open={!!selectedBrief}
          onOpenChange={() => setSelectedBrief(null)}
          icon={<FileText className="w-6 h-6" />}
          header={briefData[selectedBrief].header}
          subheader={briefData[selectedBrief].subheader}
          introText={briefData[selectedBrief].introText}
          bodyText={briefData[selectedBrief].bodyText}
        />
      )}
      <UpvoteModal // Update 4
        open={isUpvoteModalOpen}
        onOpenChange={(open) => {
          console.log('UpvoteModal onOpenChange:', open); // Add this debug log
          setIsUpvoteModalOpen(open);
        }}
        projectTitle={selectedProjectTitle} // Update 4
      /> {/* Add UpvoteModal */}
    </section>
  )
}

