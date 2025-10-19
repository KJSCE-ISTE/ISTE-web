import React from 'react'

const EventsSection = () => {
  return (
    <section id="events" className="bg-amber-300 relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-20">
        <div className="max-w-7xl w-full">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-12 bg-gradient-to-r from-neutral-800 to-neutral-600 bg-clip-text text-transparent">
            Events
          </h2>
          <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-neutral-200/50 shadow-lg p-12 text-center">
            <p className="text-xl text-neutral-600">
              Upcoming events will be displayed here
            </p>
          </div>
        </div>
      </section>
  )
}

export default EventsSection