"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { fetchStories } from "../lib/datocms";
import { Canvas } from "@react-three/fiber";
import HeroGrid from "./hero-grid";
import StoryModal from "./story-modal";

export default function CommunityStories() {
  const [stories, setStories] = useState([]);
  const [selectedStory, setSelectedStory] = useState(null);
  const [globeRotation, setGlobeRotation] = useState(0);
  const [isMouseMoving, setIsMouseMoving] = useState(false);
  const mousePosition = useRef({ x: 0, y: 0 })

  const handleClickStory = (story) => {
    setSelectedStory(story);
  };

  //   const stories = [
  //     {
  //       name: "Sarah Mitchell",
  //       role: "Privacy Tech Lead",
  //       image: "/images/person_one.png",
  //       description:
  //         "Leading innovation in privacy-preserving technologies and developing cutting-edge solutions for secure data sharing. Passionate about creating systems that protect user privacy while enabling meaningful collaboration.",
  //       social: {
  //         telegram: "#",
  //         twitter: "#",
  //         linkedin: "#",
  //       },
  //     },
  //     {
  //       name: "Alex Chen",
  //       role: "Community Builder",
  //       image: "/images/person_two.png",
  //       description:
  //         "Building bridges between developers and privacy advocates. Organizing workshops and hackathons to promote privacy-first development practices.",
  //       social: {
  //         telegram: "#",
  //         twitter: "#",
  //       },
  //     },
  //     {
  //       name: "David Kumar",
  //       role: "Protocol Engineer",
  //       image: "/images/person_three.png",
  //       description:
  //         "Working on core protocol improvements and privacy implementations. Focused on scalable privacy solutions.",
  //       social: {
  //         telegram: "#",
  //         linkedin: "#",
  //       },
  //     },
  //     {
  //       name: "David Kumar",
  //       role: "Protocol Engineer",
  //       image: "/images/person_three.png",
  //       description:
  //         "Working on core protocol improvements and privacy implementations. Focused on scalable privacy solutions.",
  //       social: {
  //         telegram: "#",
  //         linkedin: "#",
  //       },
  //     },
  //   ];

  const handleClick = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  useEffect(() => {
    async function loadStories() {
      try {
        const { stories: storiesData } = await fetchStories();
        setStories(storiesData);
      } catch (error) {
        console.error("Error fetching stories:", error);
      } finally {
        // setLoading(false);
      }
    }

    loadStories();
  }, []);

  useEffect(() => {
    let timeoutId;
    const updateMousePosition = (e) => {
      mousePosition.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
      setGlobeRotation({
        x: mousePosition.current.x * 0.5,
        y: mousePosition.current.y * 0.5,
      });
      setIsMouseMoving(true);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setIsMouseMoving(false), 100);
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <section className="px-4 py-16">
      <section className="relative px-4 py-12 w-full md:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden relative p-12 text-white bg-black rounded-3xl md:p-16 lg:p-24">
            {/* Grid Overlay */}
            <div className="overflow-hidden absolute inset-0 z-10">
              <div className="absolute inset-0 w-[140%] h-[140%] -left-[20%] -top-[20%]">
                <Canvas
                  camera={{
                    position: [0, 0, 50],
                    fov: 43,
                    near: 0.2,
                    far: 1000,
                  }}
                >
                  <ambientLight intensity={0.1} />
                  <HeroGrid
                    globeRotation={globeRotation}
                    isMouseMoving={isMouseMoving}
                  />
                </Canvas>
              </div>
            </div>

            <div className="relative z-10 mx-auto space-y-8 text-center">
              <h1 className="mb-2 text-3xl font-bold tracking-tight leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
                Community Stories
              </h1>
              <div className="flex gap-6">
                {stories.map((story, index) => (
                  <div
                    key={index}
                    className={`rounded-[11px] ${
                      index === 0 ? "lg:col-span-1 row-span-1" : ""
                    } 
                    bg-transparent rounded-lg overflow-hidden cursor-pointer transition-all duration-150
                    lg:w-full hover:opacity-90`}
                    onClick={() => handleClickStory(story)}
                  >
                    <div className="relative h-[300px] w-full rounded-[10px]">
                      <Image
                        src={story.avatar.url}
                        alt={story.name}
                        fill
                        className="object-cover overflow-hidden rounded-[10px]"
                      />
                    </div>
                    <div className="p-4 max-h-40 text-left opacity-100 transition-all duration-300 transform">
                      <h3 className="text-xl font-bold">{story.name}</h3>
                      <p className="text-sm text-gray-300">{story.sapo}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <StoryModal 
        story={selectedStory} 
        onClose={() => setSelectedStory(null)} 
      />
    </section>
  );
}
