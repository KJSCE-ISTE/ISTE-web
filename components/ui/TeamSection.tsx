import React from 'react'

const TeamSection = () => {
  return (
    <section 
      id="team" 
      className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-20 overflow-hidden"
    > 
      {/* // placeholder for team members */}
      <div className="max-w-7xl w-full">
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-12 bg-gradient-to-r from-neutral-800 to-neutral-600 bg-clip-text text-transparent">
          Team
        </h2>
        <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-neutral-200/50 shadow-lg p-12 text-center">
          <p className="text-xl text-neutral-600">
            Team members will be displayed here
          </p>
        </div>
      </div>
    </section>      
  )
}

export default TeamSection