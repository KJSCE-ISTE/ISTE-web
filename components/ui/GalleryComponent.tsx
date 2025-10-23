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
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 3) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  // Always pick 3 images using modular arithmetic so we never get fewer than 3
  const displayedImages = [0, 1, 2].map(i => images[(index + i) % images.length]);

  return (
    <section id="gallery" className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-20">
      <div className="max-w-7xl w-full">
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-12 bg-gradient-to-r from-neutral-800 to-neutral-600 bg-clip-text text-transparent">
          Gallery
        </h2>

        <div className="flex justify-center gap-8 flex-wrap items-center pt-[10px]">
          {displayedImages.map((img, i) => (
            <Image
              key={i}
              src={img}
              alt={`Gallery ${i}`}
              width={400}
              height={300}
              className="w-[45%] max-w-[400px] h-[300px] object-cover rounded-xl shadow-lg transition-all duration-400 ease-in-out hover:scale-[1.03] hover:shadow-xl"
            />
          ))}
        </div>
        <div className="pt-[20px] flex justify-center">
          <a
            href="/gallery"
            className="inline-flex font-semibold items-center gap-3 text-[23px] text-black bg-white/80 px-[10px] py-[10px] rounded-xl decoration-none transition-all duration-300 ease-in-out hover:bg-gray hover:-translate-y-0.5 drop-shadow-[0_0_6px_rgb(191,219,254)] hover:drop-shadow-[0_0_6px_rgb(147,197,253)]"
          >
            View More →
          </a>
        </div>
      </div>

    </section >
  );
};

export default Gallery;