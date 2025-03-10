"use client";

import { useState, useEffect, useCallback } from "react";
import { useScrollHandler, throttle } from "@/utils/scroll-utils";
import { Users, Building2, Plane } from "lucide-react";
import Image from "next/image";
import Bangkok from "./bangkok";
import { fetchEvents } from "../lib/datocms";

export default function StatsGrid() {
  const [events, setEvents] = useState([]);
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

  useEffect(() => {
    async function loadEvents() {
      try {
        const { events: eventData } = await fetchEvents(6);
        setEvents(eventData);
      } catch (error) {
        console.error("Error loading events:", error);
      } finally {
        setLoading(false);
      }
    }

    loadEvents();
  }, []);

  const bgColors = [
    "bg-emerald-100",
    "bg-purple-100",
    "bg-orange-100",
    "bg-yellow-100",
    "bg-blue-100",
    "bg-pink-100",
  ];

  return (
    <section
      id="stats-section"
      className="px-4 py-6 w-full bg-black md:py-12 mb-200 pb-200"
    >
      <div className="mb-12 text-center">
        <div className="mb-2 text-6xl font-bold text-white md:text-7xl lg:text-8xl">
          {count.toLocaleString()}
        </div>
        <h2 className="mb-2 text-2xl font-bold text-white md:text-3xl">
          Community Members Building
        </h2>
        <p className=" text-white max-w-[70%] mx-auto text-center mb-12">
          The majority of COTI Network's community builders programatically
          share portions of successful builds with the community fund which
          ensures there are more rewards for the entire COTI community.
        </p>
      </div>
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 md:gap-0">
          {/* Dubai Event */}
          <div className="overflow-hidden relative h-full bg-black md:col-span-3 lg:col-span-3">
            <div className="absolute inset-0 w-full h-full">
              <img
                src={events[0]?.avatar?.url}
                alt="Global COTI Event"
                className="object-cover object-center absolute w-full h-full"
              />
            </div>
            <div className="absolute inset-0 bg-black/70">
              <div className="flex flex-col justify-between p-6 h-full">
                <div className="flex justify-between items-start">
                  <h3 className="text-3xl font-bold text-white">
                    {events[0]?.title}
                  </h3>
                  <div className="flex gap-2 items-center">
                    <span className="px-3 py-1 text-sm text-white rounded-full backdrop-blur-sm bg-white/20">
                      create-a-thon
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-end">
                  <div className="text-4xl font-bold text-white">
                    117{" "}
                    <span className="text-xl font-normal">
                      {events[0]?.description}
                    </span>
                  </div>
                  <div className="flex justify-center items-center w-8 h-8 text-white rounded-full backdrop-blur-sm bg-white/20">
                    <span className="sr-only">View details</span>→
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Total Community Events */}
          <div className="flex flex-col p-6 h-full bg-purple-200 md:col-span-1 lg:col-span-1">
            <div className="flex-1">
              <h3 className="mb-2 text-xl">
                Community Led Events Coming in '25
              </h3>
              <div className="mb-4 text-5xl font-bold">142</div>
              <h4 className="mb-2 font-medium">
                Upcoming Community IRL Events
              </h4>
              <ul className="space-y-2 text-sm">
                {events.length > 0 &&
                  events.map((event) => (
                    <li className="flex items-center">
                      <Users className="mr-2 w-4 h-4" />
                      <span className="px-2 py-1 mr-2 whitespace-nowrap bg-yellow-300 rounded-full">
                        {new Date(event.startDateTime).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </span>
                      {event.title}
                    </li>
                  ))}
              </ul>
            </div>
            <div className="mt-12">
              <a
                href="https://chatgpt.com/g/g-675fc4c91c388191ae5a548d1362c55c-post-hoc-grant-helper"
                className="flex items-center px-4 py-2 text-sm text-black bg-purple-300 rounded-full transition-colors hover:opacity-80 w-fit"
              >
                View More
              </a>
            </div>
          </div>

          {/* Privacy Network (now Poolz IDO Launch Pad) */}
          {events.slice(1, 5).map((event, index) => (
            <div
              className={`flex flex-col justify-between p-6 ${bgColors[index]} md:col-span-1 lg:col-span-1`}
            >
              <h3 className="text-2xl font-bold">{event.title}</h3>
              <div className="mt-2">
                <div className="text-lg">{event.description}</div>

                <div className="flex items-center mt-12">
                  <a
                    href="#"
                    className="flex items-center px-4 py-2 text-sm text-black bg-emerald-200 rounded-full transition-colors hover:opacity-80"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-1 w-4 h-4"
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
          ))}

          {/* <div className="flex flex-col justify-between p-6 bg-orange-200 md:col-span-1 lg:col-span-1">
            <div>
              <h3 className="mb-2 text-sm">
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
                  className="flex items-center px-4 py-2 text-sm text-black bg-orange-300 rounded-full transition-colors hover:opacity-80 w-fit"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-1 w-4 h-4"
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

          <div className="flex flex-col justify-between p-6 bg-yellow-100 md:col-span-2 lg:col-span-2">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="mb-2 text-sm">Frontends Deployed in March</h3>
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
            <div className="flex justify-end mt-4 -space-x-2">
              <div className="overflow-hidden relative w-10 h-10 rounded-full border-2 border-white">
                <Image
                  src="/images/person_one.png"
                  alt="Team member 1"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="overflow-hidden relative w-10 h-10 rounded-full border-2 border-white">
                <Image
                  src="/images/person_two.png"
                  alt="Team member 2"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="overflow-hidden relative w-10 h-10 rounded-full border-2 border-white">
                <Image
                  src="/images/person_three.png"
                  alt="Team member 3"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="overflow-hidden relative w-10 h-10 rounded-full border-2 border-white">
                <Image
                  src="/images/person_four.png"
                  alt="Team member 1"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="overflow-hidden relative w-10 h-10 rounded-full border-2 border-white">
                <Image
                  src="/images/person_five.png"
                  alt="Team member 2"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="overflow-hidden relative w-10 h-10 rounded-full border-2 border-white">
                <Image
                  src="/images/person_six.png"
                  alt="Team member 3"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}
