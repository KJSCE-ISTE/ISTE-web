"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';

const Gallery: React.FC = () => {
  const images = [
    '/GalleryComponentImages/img1.png',
    '/GalleryComponentImages/img2.png',
    '/GalleryComponentImages/img3.png',
    '/GalleryComponentImages/img4.png',
    '/GalleryComponentImages/img5.png',
    '/GalleryComponentImages/img6.png',
    '/GalleryComponentImages/img7.png',
    '/GalleryComponentImages/img8.jpg',
    // Added duplicates/placeholders to ensure we have enough diversity for the loop
    '/GalleryComponentImages/img1.png',
    '/GalleryComponentImages/img3.png',
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Cycle one by one for a smooth "ticker" feel, or +1 to shift gradually
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  // We grab 7 images at a time to fill our abstract grid
  const displayedImages = [0, 1, 2, 3, 4, 5, 6].map(
    (i) => images[(index + i) % images.length]
  );

  return (
    <section
      id="gallery"
      className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-20"
    >
      <div className="max-w-7xl w-full">
        <h2 className="text-4xl md:text-7xl font-bold text-left mb-12 bg-gradient-to-br from-neutral-900 to-neutral-500 bg-clip-text text-transparent tracking-tighter">
          Visuals.
        </h2>

        {/* Abstract Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-4 h-[120vh] md:h-[600px] w-full">
          {displayedImages.map((img, i) => {
            // "Sexy" layout logic: assign specific grid spans based on index position
            let gridClass = "col-span-1 row-span-1"; // default

            if (i === 0) gridClass = "md:col-span-2 md:row-span-2"; // Big feature
            if (i === 1) gridClass = "md:col-span-1 md:row-span-2"; // Tall vertical
            if (i === 4) gridClass = "md:col-span-2 md:row-span-1"; // Wide horizontal

            return (
              <div
                key={i}
                className={`relative overflow-hidden rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 ease-in-out group ${gridClass}`}
              >
                <Image
                  src={img}
                  alt={`Gallery ${i}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Subtle overlay effect */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
            );
          })}
        </div>

        {/* Button Right Aligned */}
        <div className="pt-8 flex justify-end w-full">
          <a
            href="/gallery"
            className="group inline-flex items-center gap-2 text-lg font-medium text-neutral-800 transition-all duration-300 hover:gap-4 hover:text-black"
          >
            View All Works
            <span className="bg-black text-white rounded-full p-2 transition-transform duration-300 group-hover:rotate-[-45deg]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Gallery;