"use client";

import { useState, useEffect, useCallback } from "react";
import { useScrollHandler, throttle } from "@/utils/scroll-utils";
import { Users, Building2, Plane } from "lucide-react";
import Image from "next/image";
import Bangkok from "./bangkok";

export default function StatsGrid() {
  const [count, setCount] = useState(375987);
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = useCallback(() => {
    const element = document.getElementById("stats-section");
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const isInView = rect.top <= window.innerHeight && rect.bottom >= 0;
    setIsVisible(isInView);
  }, []);

  // Use throttled scroll handler for animations
  useScrollHandler(handleScroll, 32); // 32ms throttle for smoother animations

  useEffect(() => {
    if (!isVisible) return;

    const incrementTimer = setInterval(() => {
      const increment = Math.floor(Math.random() * 5) + 1;
      setCount((prevCount) => prevCount + increment);
    }, 2000);

    return () => clearInterval(incrementTimer);
  }, [isVisible]);

  return (
    <section
      id="stats-section"
      className="w-full py-6 md:py-12 mb-200 pb-200 px-4 bg-black mb-200"
    >
      <div className="text-center mb-12">
        <div className="text-6xl md:text-7xl lg:text-8xl font-bold mb-2 text-white">
          {count.toLocaleString()}
        </div>
        <h2 className="text-2xl md:text-3xl font-bold mb-2 text-white">
          Community Members Building
        </h2>
        <p className=" text-white max-w-[70%] mx-auto text-center mb-12">
          The majority of COTI Network's community builders programatically
          share portions of successful builds with the community fund which
          ensures there are more rewards for the entire COTI community.
        </p>
      </div>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-0">
          {/* Dubai Event */}
          <div className="relative md:col-span-3 lg:col-span-3 h-full bg-black overflow-hidden">
            <div className="absolute inset-0 w-full h-full">
              <img
                src="/images/bangkok.JPG"
                alt="Global COTI Event"
                className="absolute w-full h-full object-cover object-center"
              />
            </div>
            <div className="absolute inset-0 bg-black/70">
              <div className="p-6 h-full flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <h3 className="text-white text-3xl font-bold">Nirobi</h3>
                  <div className="flex items-center gap-2">
                    <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                      create-a-thon
                    </span>
                  </div>
                </div>
                <div className="flex items-end justify-between">
                  <div className="text-white text-4xl font-bold">
                    117 <span className="text-xl font-normal">Attended</span>
                  </div>
                  <div className="flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-full w-8 h-8 text-white">
                    <span className="sr-only">View details</span>→
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Total Community Events */}
          <div className="md:col-span-1 lg:col-span-1 bg-purple-200 p-6 flex flex-col h-full">
            <div className="flex-1">
              <h3 className="text-xl mb-2">
                Community Led Events Coming in '25
              </h3>
              <div className="text-5xl font-bold mb-4">142</div>
              <h4 className="font-medium mb-2">
                Upcoming Community IRL Events
              </h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  <span className="bg-yellow-300 rounded-full px-2 py-1 mr-2">
                    10/02/25
                  </span>
                  Singapore
                </li>
                <li className="flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  <span className="bg-yellow-300 rounded-full px-2 py-1 mr-2">
                    19/02/25
                  </span>
                  Ho Chi Minh City
                </li>
                <li className="flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  <span className="bg-yellow-300 rounded-full px-2 py-1 mr-2">
                    26/02/25
                  </span>
                  London
                </li>
                <li className="flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  <span className="bg-yellow-300 rounded-full px-2 py-1 mr-2">
                    02/03/25
                  </span>
                  Paris, KY
                </li>
                <li className="flex items-center">
                  <Building2 className="w-4 h-4 mr-2" />
                  <span className="bg-yellow-300 rounded-full px-2 py-1 mr-2">
                    10/03/25
                  </span>
                  Tel Aviv
                </li>
                <li className="flex items-center">
                  <Building2 className="w-4 h-4 mr-2" />
                  <span className="bg-yellow-300 rounded-full px-2 py-1 mr-2">
                    18/03/25
                  </span>
                  Bangkok
                </li>
              </ul>
            </div>
            <div className="mt-12">
              <a
                href="https://chatgpt.com/g/g-675fc4c91c388191ae5a548d1362c55c-post-hoc-grant-helper"
                className="flex items-center text-black hover:opacity-80 bg-purple-300 rounded-full px-4 py-2 text-sm transition-colors w-fit"
              >
                View More
              </a>
            </div>
          </div>

          {/* Privacy Network (now Poolz IDO Launch Pad) */}
          <div className="md:col-span-1 lg:col-span-1 bg-emerald-100 p-6 flex flex-col justify-between">
            <h3 className="text-2xl font-bold">Poolz IDO Launch Pad</h3>
            <div className="mt-2">
              <div className="text-lg">
                commits 3% of all launch tokens to community pool.
              </div>

              <div className="flex items-center mt-12">
                <a
                  href="#"
                  className="flex items-center text-black hover:opacity-80 bg-emerald-200 rounded-full px-4 py-2 text-sm transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    />
                  </svg>
                  Learn How to Claim
                </a>
              </div>
            </div>
          </div>

          {/* Growth */}
          <div className="md:col-span-1 lg:col-span-1 bg-orange-200 p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-sm mb-2">
                Growth In Community Deployed Smart Contracts Past 30 Days
              </h3>
              <div className="text-4xl font-bold">
                2000<span className="text-2xl">%</span>
              </div>
            </div>
            <div>
              <div className="text-sm">COTI Network</div>
              <div className="mt-12">
                <a
                  href="#"
                  className="flex items-center text-black hover:opacity-80 bg-orange-300 rounded-full px-4 py-2 text-sm transition-colors w-fit"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    />
                  </svg>
                  Explorer
                </a>
              </div>
            </div>
          </div>

          {/* Active Holders */}
          <div className="md:col-span-2 lg:col-span-2 bg-yellow-100 p-6 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm mb-2">Frontends Deployed in March</h3>
                <div className="text-5xl font-bold">258</div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold">
                  New Prompt Engineer Projects
                </div>
                <div className="text-lg">Verified on COTI</div>
                <div className="text-sm opacity-60">#COTICreatives</div>
              </div>
            </div>
            <div className="flex justify-end -space-x-2 mt-4">
              <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden relative">
                <Image
                  src="/images/person_one.png"
                  alt="Team member 1"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden relative">
                <Image
                  src="/images/person_two.png"
                  alt="Team member 2"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden relative">
                <Image
                  src="/images/person_three.png"
                  alt="Team member 3"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden relative">
                <Image
                  src="/images/person_four.png"
                  alt="Team member 1"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden relative">
                <Image
                  src="/images/person_five.png"
                  alt="Team member 2"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden relative">
                <Image
                  src="/images/person_six.png"
                  alt="Team member 3"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
