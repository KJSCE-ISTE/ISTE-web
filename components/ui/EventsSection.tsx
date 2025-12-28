import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Events from '@/lib/events'
import { Calendar, ExternalLink, ArrowRight } from 'lucide-react'

const EventsSection = () => {
  const getEventStatus = (startDate: string, endDate: string) => {
    const now = new Date()
    const start = new Date(startDate)
    const end = new Date(endDate)
    
    if (now > end) return 'past'
    if (now < start) return 'upcoming'
    return 'ongoing'
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <section id="events" className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-20">
      <div className="max-w-6xl w-full">
        {/* Header */}
        <h2 className="text-5xl md:text-7xl font-bold text-center mb-16 bg-gradient-to-r from-neutral-900 to-neutral-700 bg-clip-text text-transparent">
          Events
        </h2>

        {/* Events List */}
        <div className="space-y-8 mb-12">
          {Events.map((event, index) => {
            const status = getEventStatus(event.startDate, event.endDate)
            const colorSchemes = [
              { bg: 'bg-blue-400', border: 'border-blue-600', text: 'text-blue-600', button: 'bg-blue-500 hover:bg-blue-600' },
              { bg: 'bg-purple-400', border: 'border-purple-600', text: 'text-purple-600', button: 'bg-purple-500 hover:bg-purple-600' },
              { bg: 'bg-green-400', border: 'border-green-600', text: 'text-green-600', button: 'bg-green-500 hover:bg-green-600' },
            ]
            const colors = colorSchemes[index % 3]

            return (
              <div
                key={event.id}
                className={`${colors.bg} border-2 ${colors.border} shadow-[4px_4px_0px_0px_rgba(0,0,0,0.6)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.7)] transition-all duration-200 hover:-translate-y-0.5`}
              >
                <div className="grid md:grid-cols-[280px_1fr] gap-0">
                  {/* Image */}
                  <div className={`relative h-48 md:h-auto border-b-2 md:border-b-0 md:border-r-2 ${colors.border} overflow-hidden`}>
                    <Image
                      src={event.imageUrl}
                      alt={event.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6 bg-white flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-black mb-3">
                        {event.title}
                      </h3>

                      <div className={`flex items-center gap-2 mb-3 ${colors.text} font-bold text-sm`}>
                        <Calendar size={18} />
                        <span>
                          {formatDate(event.startDate)}
                          {event.startDate !== event.endDate && ` - ${formatDate(event.endDate)}`}
                        </span>
                      </div>

                      <p className="text-neutral-700 text-base mb-4 leading-relaxed">
                        {event.description}
                      </p>
                    </div>

                    {/* Action Button */}
                    {event.eventUrl && (
                      <div>
                        <a
                          href={event.eventUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-2 px-5 py-2.5 ${colors.button} text-white font-semibold border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.9)] transition-all duration-200 hover:-translate-y-0.5 text-sm`}
                        >
                          {status === 'past' ? (
                            <>
                              View Event Website
                              <ExternalLink size={18} />
                            </>
                          ) : (
                            <>
                              Register Now
                              <ArrowRight size={18} />
                            </>
                          )}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* View All Events Button */}
        <div className="flex justify-center">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white font-semibold text-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.5)] transition-all duration-200 hover:-translate-y-0.5"
          >
            View All Events
            <ArrowRight size={24} />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default EventsSection