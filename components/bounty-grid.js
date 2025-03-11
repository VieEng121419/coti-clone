"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  FileText,
  ThumbsUp,
  Search,
} from "lucide-react";
import BriefModal from "./brief-modal";
import UpvoteModal from "./upvote-modal"; // Import UpvoteModal
import { briefData } from "../data/brief-data";
import { bounties } from "../data/bounties-data";
import { fetchIdeas, fetchIdeasByCategory } from "../lib/datocms";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Add to imports
import { fetchCategories } from "../lib/datocms";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Add to imports at the top
import { FileQuestion } from "lucide-react";

// Add to imports
import IdeaModal from "./idea-modal";

export default function BountyGrid() {
  const [selectedBrief, setSelectedBrief] = useState(null);
  const [isUpvoteModalOpen, setIsUpvoteModalOpen] = useState(false); // Add UpvoteModal state
  const [selectedProjectTitle, setSelectedProjectTitle] = useState(null); //Update 1
  // Consolidate state declarations
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalIdeas, setTotalIdeas] = useState(0);
  const [modalStates, setModalStates] = useState({
    isUpvoteModalOpen: false,
    selectedProjectTitle: null,
    selectedBounty: null,
    selectedBrief: null,
  });

  const itemsPerPage = 6;
  const searchTimeout = useRef(null);

  // Unified data fetching function
  // Add new state for sorting
  const [sortBy, setSortBy] = useState("_publishedAt_DESC");

  // Update fetchData function to include sorting
  const fetchData = async (options = {}) => {
    const { categoryId, page = 1, search = "", orderBy = sortBy } = options;
    try {
      setLoading(true);
      const skip = (page - 1) * itemsPerPage;

      const { data } =
        categoryId && categoryId !== "all"
          ? await fetchIdeasByCategory(itemsPerPage, skip, search, categoryId, [
              orderBy,
            ])
          : await fetchIdeas(itemsPerPage, skip, search, [orderBy]);

      const { allIdeas, _allIdeasMeta } = data;
      setIdeas(allIdeas);
      setTotalIdeas(Number(_allIdeasMeta.count));
    } catch (error) {
      console.error("Error fetching ideas:", error);
    } finally {
      setLoading(false);
    }
  };

  // Load initial data
  useEffect(() => {
    fetchData({ page: currentPage, categoryId: selectedCategory });
  }, [currentPage]);

  // Load categories
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    loadCategories();
  }, []);

  // Handlers
  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    setCurrentPage(1);

    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    searchTimeout.current = setTimeout(() => {
      fetchData({ search: value, categoryId: selectedCategory });
    }, 2000);
  };

  const handleCategoryChange = async (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
    await fetchData({ categoryId, search: searchTerm });
  };

  const handleUpvoteClick = (projectTitle) => {
    setModalStates((prev) => ({
      ...prev,
      isUpvoteModalOpen: true,
      selectedProjectTitle: projectTitle,
    }));
  };

  // Clean up
  useEffect(() => {
    return () => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
    };
  }, []);

  // Add sort handler
  const handleSort = (value) => {
    setSortBy(value);
    fetchData({
      categoryId: selectedCategory,
      search: searchTerm,
      orderBy: value,
    });
  };

  // Add new state for selected idea
  const [selectedIdea, setSelectedIdea] = useState(null);

  // Add handler for idea click
  const handleIdeaClick = (idea) => {
    setSelectedIdea(idea);
  };

  return (
    <section className="py-16 px-4" id="WAGMICetner">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          <span className="">WAGMI Projects</span>
        </h2>
        <p className="text-gray-600 max-w-4xl mx-auto text-center mb-12">
          Getting rewarded in Web3 isn't just for VCs, traders, and 10x
          deveoplers anymore. We're bringing back WAGMI with community creation,
          building, ideation, and inspiration. Everyone supporting the COTI
          community has the opportunity to build, create, evangelize, and
          benefit. We build out loud and use COTI resources to promote, unblock,
          and elevate the best community ideas, projects, meetups, campaigns,
          and creations. Choose an activity below, and get started.
        </p>

        <div className="flex justify-center items-start w-full gap-5">
          {/* Add search input */}
          <div className="mb-8 relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search ideas..."
              className="w-full block pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Add sort dropdown */}
          <Select value={sortBy} onValueChange={handleSort}>
            <SelectTrigger className="w-[180px] h-[42px] rounded-xl border-gray-300 bg-white font-medium">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="rounded-xl bg-white">
              <SelectItem value="_publishedAt_DESC">Most Recent</SelectItem>
              <SelectItem value="upvote_DESC">Most Popular</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Add category filter */}
        <div className="mb-8 flex flex-wrap gap-2">
          <button
            onClick={() => handleCategoryChange("all")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
              ${
                selectedCategory === "all"
                  ? "bg-[#E9D5FF] text-black"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
          >
            All Ideas
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                ${
                  selectedCategory === category.id
                    ? "bg-[#E9D5FF] text-black"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Replace the grid section with conditional rendering */}
        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        ) : ideas.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ideas.map((idea, index) => (
              <div
                key={index}
                onClick={() => handleIdeaClick(idea)}
                className={`${
                  bounties[index]?.bgColor ?? "bg-emerald-100"
                } rounded-xl p-6 flex flex-col justify-between h-full cursor-pointer hover:opacity-90 transition-opacity`}
              >
                <div className="space-y-4 flex-1">
                  {/* <div className="text-sm font-medium tracking-wide opacity-80">
                  {bounty.type}
                </div> */}

                  <h3 className="font-bold text-2xl">{idea.name}</h3>

                  <p className="text-sm opacity-80">{idea.description}</p>
                </div>

                <div className="pt-4 border-t border-black/10 mt-4">
                  <div className="flex items-center justify-between">
                    {/* <div>
                    <div className="text-xs opacity-70">{bounty.metric}</div>
                    <div className="font-bold">{bounty.value}</div>
                  </div> */}

                    <div className="flex items-center gap-6">
                      {/* <button 
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
                    </button> */}
                      <button
                        onClick={() => handleUpvoteClick(idea.name)} // Update 3
                        className="flex items-center gap-2 text-sm font-medium hover:opacity-70"
                      >
                        <ThumbsUp size={18} />
                        {idea.upvote}
                        <p>Upvote</p>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[400px] text-gray-500">
            <FileQuestion className="w-16 h-16 mb-4" />
            <p className="text-lg font-medium">No ideas found</p>
            <p className="text-sm">Try adjusting your search or filters</p>
          </div>
        )}

      </div>
      {/* {selectedBountyData && (
        <IdeasModal 
          open={!!selectedBounty}
          onOpenChange={() => setSelectedBounty(null)}
          title={selectedBountyData.title}
          description={selectedBountyData.description}
          data={selectedBountyData.data}
        />
      )} */}
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
          console.log("UpvoteModal onOpenChange:", open); // Add this debug log
          setIsUpvoteModalOpen(open);
        }}
        projectTitle={selectedProjectTitle} // Update 4
      />{" "}
      {/* Add UpvoteModal */}
      {/* Add IdeaModal */}
      <IdeaModal
        open={!!selectedIdea}
        onOpenChange={(open) => !open && setSelectedIdea(null)}
        idea={selectedIdea}
      />
      {/* Update pagination controls with shadcn/ui style */}
      <div className="mt-8 flex justify-center items-center gap-1">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="rounded-xl inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9 p-0 border"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="flex items-center gap-1">
          {[...Array(Math.ceil(totalIdeas / itemsPerPage))].map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx + 1)}
              className={`rounded-xl inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 w-9 p-0 border ${
                currentPage === idx + 1
                  ? "bg-primary text-primary-foreground hover:bg-primary/90 border-primary"
                  : "hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage >= Math.ceil(totalIdeas / itemsPerPage)}
          className="rounded-xl inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9 p-0 border"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}
