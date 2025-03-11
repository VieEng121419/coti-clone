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
    <div className="flex fixed inset-0 z-50 justify-center items-center p-5 px-4 bg-black/30 backdrop-blur-sm bg-opacity-75">
      <div className="overflow-hidden relative p-8 w-full max-w-4xl bg-white">
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

          <div className="px-8 w-full text-black md:w-1/2">
            <h2 className="mb-4 text-3xl font-bold">{story.name}</h2>
            <p className="mb-4 text-lg">{story.sapo}</p>
            <p dangerouslySetInnerHTML={{ __html: story.description }}></p>
          </div>
        </div>
      </div>
    </div>
  );
}
