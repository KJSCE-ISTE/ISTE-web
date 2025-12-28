import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Events from '@/lib/events'
import { Calendar, ExternalLink, ArrowRight, ArrowLeft } from 'lucide-react'

export default function EventsPage() {
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

  // Group events by status
  const upcomingEvents = Events.filter(e => getEventStatus(e.startDate, e.endDate) === 'upcoming')
  const ongoingEvents = Events.filter(e => getEventStatus(e.startDate, e.endDate) === 'ongoing')
  const pastEvents = Events.filter(e => getEventStatus(e.startDate, e.endDate) === 'past')

  const renderEventCard = (event: any, index: number) => {
    const status = getEventStatus(event.startDate, event.endDate)
    const colorSchemes = [
      { bg: 'bg-blue-400', border: 'border-blue-600', text: 'text-blue-600', button: 'bg-blue-500 hover:bg-blue-600' },
      { bg: 'bg-purple-400', border: 'border-purple-600', text: 'text-purple-600', button: 'bg-purple-500 hover:bg-purple-600' },
      { bg: 'bg-green-400', border: 'border-green-600', text: 'text-green-600', button: 'bg-green-500 hover:bg-green-600' },
      { bg: 'bg-pink-400', border: 'border-pink-600', text: 'text-pink-600', button: 'bg-pink-500 hover:bg-pink-600' },
      { bg: 'bg-orange-400', border: 'border-orange-600', text: 'text-orange-600', button: 'bg-orange-500 hover:bg-orange-600' },
    ]
    const colors = colorSchemes[index % 5]

    return (
      <div
        key={event.id}
        className={`${colors.bg} border-4 ${colors.border} shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 hover:-translate-y-1`}
      >
        <div className="grid md:grid-cols-[280px_1fr] gap-0">
          {/* Image */}
          <div className={`relative h-48 md:h-auto border-b-4 md:border-b-0 md:border-r-4 ${colors.border} overflow-hidden`}>
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
                  className={`inline-flex items-center gap-2 px-5 py-2.5 ${colors.button} text-white font-bold border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 hover:-translate-y-0.5 text-sm`}
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
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100 py-20 px-4">
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

        {/* Ongoing Events */}
        {ongoingEvents.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-neutral-900 flex items-center gap-3">
              <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
              Happening Now
            </h2>
            <div className="space-y-8">
              {ongoingEvents.map((event, index) => renderEventCard(event, index))}
            </div>
          </div>
        )}

        {/* Upcoming Events */}
        {upcomingEvents.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-neutral-900 flex items-center gap-3">
              <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
              Upcoming Events
            </h2>
            <div className="space-y-8">
              {upcomingEvents.map((event, index) => renderEventCard(event, index))}
            </div>
          </div>
        )}

        {/* Past Events */}
        {pastEvents.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold mb-6 text-neutral-900 flex items-center gap-3">
              <span className="w-3 h-3 bg-gray-400 rounded-full"></span>
              Past Events
            </h2>
            <div className="space-y-8">
              {pastEvents.map((event, index) => renderEventCard(event, index))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {Events.length === 0 && (
          <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-12 text-center">
            <p className="text-2xl text-neutral-600 font-bold">
              No events available at the moment. Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
