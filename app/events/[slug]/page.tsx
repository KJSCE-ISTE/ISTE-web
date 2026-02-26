import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllEvents, getEventBySlug, formatEventDate } from '@/lib/events'
import { Calendar, ArrowLeft, Tag } from 'lucide-react'

// Generate static params for all events
export async function generateStaticParams() {
    const events = getAllEvents()
    return events.map((event) => ({
        slug: event.slug,
    }))
}

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const event = getEventBySlug(slug)

    if (!event) {
        notFound()
    }

    // Simple markdown-to-HTML conversion for the event markdown
    const renderMarkdown = (md: string) => {
        return md
            .split('\n\n')
            .map((block, i) => {
                // Headers
                if (block.startsWith('### ')) {
                    return <h3 key={i} className="text-xl font-bold text-neutral-900 mt-8 mb-3">{block.replace('### ', '')}</h3>
                }
                if (block.startsWith('## ')) {
                    return <h2 key={i} className="text-2xl font-bold text-neutral-900 mt-8 mb-4">{block.replace('## ', '')}</h2>
                }

                // List items
                if (block.includes('\n- ')) {
                    const lines = block.split('\n')
                    const title = lines[0]
                    const items = lines.filter(l => l.startsWith('- '))
                    return (
                        <div key={i}>
                            {title && !title.startsWith('- ') && (
                                <p className="text-neutral-700 text-lg leading-relaxed mb-2">{formatInlineMarkdown(title)}</p>
                            )}
                            <ul className="list-disc list-inside space-y-2 text-neutral-700 text-lg mb-4">
                                {items.map((item, j) => (
                                    <li key={j} className="leading-relaxed">
                                        {formatInlineMarkdown(item.replace(/^- /, ''))}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )
                }

                // Regular paragraphs
                if (block.trim()) {
                    return (
                        <p key={i} className="text-neutral-700 text-lg leading-relaxed mb-4">
                            {formatInlineMarkdown(block)}
                        </p>
                    )
                }
                return null
            })
    }

    const formatInlineMarkdown = (text: string): React.ReactNode => {
        // Handle bold + italic, bold, italic
        const parts: React.ReactNode[] = []
        const regex = /(\*\*\*(.+?)\*\*\*|\*\*(.+?)\*\*|\*(.+?)\*)/g
        let lastIndex = 0
        let match

        while ((match = regex.exec(text)) !== null) {
            if (match.index > lastIndex) {
                parts.push(text.slice(lastIndex, match.index))
            }
            if (match[2]) {
                parts.push(<strong key={match.index}><em>{match[2]}</em></strong>)
            } else if (match[3]) {
                parts.push(<strong key={match.index}>{match[3]}</strong>)
            } else if (match[4]) {
                parts.push(<em key={match.index}>{match[4]}</em>)
            }
            lastIndex = match.index + match[0].length
        }
        if (lastIndex < text.length) {
            parts.push(text.slice(lastIndex))
        }
        return parts.length > 0 ? parts : text
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100">
            {/* Hero Image */}
            <div className="relative h-[40vh] md:h-[50vh] w-full">
                <Image
                    src={event.eventUrl}
                    alt={event.eventName}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                {/* Back button overlay */}
                <div className="absolute top-6 left-6 z-10">
                    <Link
                        href="/events"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 hover:-translate-y-0.5 font-bold text-sm"
                    >
                        <ArrowLeft size={18} />
                        All Events
                    </Link>
                </div>

                {/* Title overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">
                            {event.eventName}
                        </h1>
                        <div className="flex flex-wrap items-center gap-4">
                            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-white font-semibold text-sm">
                                <Calendar size={16} />
                                {formatEventDate(event.eventDate)}
                            </span>
                            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-white font-semibold text-sm">
                                <Tag size={16} />
                                {event.year}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-4 py-12 md:py-16">
                {/* Card Description */}
                <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 md:p-8 mb-12">
                    <p className="text-xl text-neutral-700 leading-relaxed font-medium">
                        {event.eventCardDescription}
                    </p>
                </div>

                {/* Markdown Content */}
                <article className="prose-custom">
                    {renderMarkdown(event.eventMarkdown)}
                </article>

                {/* Footer Navigation */}
                <div className="mt-16 pt-8 border-t-2 border-neutral-200 flex justify-between items-center">
                    <Link
                        href="/events"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white font-bold border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 hover:-translate-y-0.5"
                    >
                        <ArrowLeft size={18} />
                        All Events
                    </Link>
                </div>
            </div>
        </div>
    )
}
