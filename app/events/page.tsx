import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getAllEvents, getAllEventYears, getEventsByYear, formatEventDate } from '@/lib/events'
import { Calendar, ArrowRight, ArrowLeft } from 'lucide-react'
import { HexagonBackground } from '@/components/ui/HexagonBackground'

export default function EventsPage() {
  const years = getAllEventYears()

  const colorSchemes = [
    { bg: 'bg-blue-400', border: 'border-blue-600', text: 'text-blue-600', button: 'bg-blue-500 hover:bg-blue-600' },
    { bg: 'bg-purple-400', border: 'border-purple-600', text: 'text-purple-600', button: 'bg-purple-500 hover:bg-purple-600' },
    { bg: 'bg-green-400', border: 'border-green-600', text: 'text-green-600', button: 'bg-green-500 hover:bg-green-600' },
    { bg: 'bg-pink-400', border: 'border-pink-600', text: 'text-pink-600', button: 'bg-pink-500 hover:bg-pink-600' },
    { bg: 'bg-orange-400', border: 'border-orange-600', text: 'text-orange-600', button: 'bg-orange-500 hover:bg-orange-600' },
  ]

  let globalIndex = 0

  return (
    <HexagonBackground>
      <div className="relative z-10 min-h-screen py-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <Link
              href="/"
              className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 hover:-translate-y-0.5 font-bold"
            >
              <ArrowLeft size={20} />
              Back to Home
            </Link>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-neutral-900 to-neutral-700 bg-clip-text text-transparent">
              All Events
            </h1>
            <p className="text-xl text-neutral-600 mt-4">
              Explore all our technical events, workshops, and symposiums
            </p>
          </div>

          {/* Events grouped by year */}
          {years.map((year) => {
            const yearEvents = getEventsByYear(year)
            return (
              <div key={year} className="mb-16">
                <h2 className="text-3xl font-bold mb-6 text-neutral-900 flex items-center gap-3">
                  <span className="w-3 h-3 bg-neutral-800 rounded-full"></span>
                  {year}
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {yearEvents.map((event) => {
                    const colors = colorSchemes[globalIndex % 5]
                    globalIndex++
                    return (
                      <Link
                        key={event.slug}
                        href={`/events/${event.slug}`}
                        className="block group"
                      >
                        <div
                          className={`${colors.bg} border-4 ${colors.border} shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 hover:-translate-y-1 h-full flex flex-col`}
                        >
                          {/* Image */}
                          <div className={`relative h-48 border-b-4 ${colors.border} overflow-hidden`}>
                            <Image
                              src={event.eventUrl}
                              alt={event.eventName}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>

                          {/* Content */}
                          <div className="p-5 bg-white flex flex-col flex-1">
                            <h3 className="text-lg font-bold text-black mb-2 line-clamp-2">
                              {event.eventName}
                            </h3>

                            <div className={`flex items-center gap-2 mb-3 ${colors.text} font-bold text-xs`}>
                              <Calendar size={14} />
                              <span>{formatEventDate(event.eventDate)}</span>
                            </div>

                            <p className="text-neutral-600 text-sm mb-4 leading-relaxed line-clamp-3 flex-1">
                              {event.eventCardDescription}
                            </p>

                            <span
                              className={`inline-flex items-center gap-2 px-4 py-2 ${colors.button} text-white font-bold border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 text-xs w-fit`}
                            >
                              View Details
                              <ArrowRight size={14} />
                            </span>
                          </div>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>
            )
          })}

          {/* Empty State */}
          {getAllEvents().length === 0 && (
            <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-12 text-center">
              <p className="text-2xl text-neutral-600 font-bold">
                No events available at the moment. Check back soon!
              </p>
            </div>
          )}
        </div>
      </div>
    </HexagonBackground>
  )
}
