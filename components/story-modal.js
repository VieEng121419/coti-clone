"use client";
import Image from "next/image";
import { useEffect } from "react";

export default function StoryModal({ story, onClose }) {
  if (!story) return;

  const videoUrl = story?.video;
  const isYouTube = videoUrl?.includes("youtube");

  useEffect(() => {
    // Remove any existing TikTok embed scripts
    const existingScript = document.querySelector(
      'script[src="https://www.tiktok.com/embed.js"]'
    );
    if (existingScript) {
      existingScript.remove();
    }

    // Create and append new TikTok embed script
    if (videoUrl && !isYouTube) {
      const script = document.createElement("script");
      script.src = "https://www.tiktok.com/embed.js";
      script.async = true;
      document.body.appendChild(script);

      return () => {
        script.remove();
      };
    }
  }, [videoUrl, isYouTube]);

  return (
    <div className="flex fixed inset-0 z-50 justify-center items-center p-5 px-4 bg-black bg-opacity-75">
      <div className="overflow-hidden relative p-8 w-full max-w-6xl bg-white rounded-3xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 text-black hover:opacity-75"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="flex justify-center">
          <div className="flex relative justify-center h-full w-fit">
            {isYouTube ? (
              <iframe
                src={videoUrl}
                className="w-[315px] h-[560px]"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={story.video.title || story.name}
              />
            ) : videoUrl ? (
              <>
                <blockquote
                  className="tiktok-embed"
                  cite={videoUrl}
                  data-video-id={videoUrl.split("/").pop()}
                  style={{ maxWidth: "605px", minWidth: "325px" }}
                >
                  <section>
                    <a target="_blank" href={videoUrl}>
                      {story.name}
                    </a>
                  </section>
                </blockquote>
                <script async src="https://www.tiktok.com/embed.js"></script>
              </>
            ) : (
              <Image
                src={story?.avatar?.url}
                alt={story?.name}
                fill
                className="object-cover"
              />
            )}
          </div>

          <div className="p-8 w-full text-black md:w-1/2">
            <h2 className="mb-4 text-3xl font-bold">{story.name}</h2>
            <p className="mb-4 text-lg">{story.sapo}</p>
            <p dangerouslySetInnerHTML={{ __html: story.description }}></p>

            <div className="flex gap-4 mt-4">
              {story.twitter && (
                <a
                  href={story.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:text-blue-400"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
              )}
              {story.linkedin && (
                <a
                  href={story.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:text-blue-600"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              )}
              {story.telegram && (
                <a
                  href={story.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:text-blue-400"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.911.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.062 3.345-.479.329-.913.489-1.302.481-.428-.008-1.252-.241-1.865-.44-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.178.119.13.154.305.164.43-.001.097-.014.185-.029.31z" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
