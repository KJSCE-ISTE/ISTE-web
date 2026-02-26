import { Event, EventData, generateSlug } from '@/models/event'
import eventsJson from '@/app/data/events.json'

function parseEventDate(dateStr: string): Date {
    // Handle multiple date formats: "2022-09-22", "18/10/2022", "2023"
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
        return new Date(dateStr)
    }
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateStr)) {
        const [day, month, year] = dateStr.split('/')
        return new Date(`${year}-${month}-${day}`)
    }
    if (/^\d{4}$/.test(dateStr)) {
        return new Date(`${dateStr}-01-01`)
    }
    return new Date(dateStr)
}

function formatEventDate(dateStr: string): string {
    const date = parseEventDate(dateStr)
    if (isNaN(date.getTime())) return dateStr
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    })
}

const allEvents: Event[] = (eventsJson as EventData[]).map((e) => ({
    ...e,
    slug: generateSlug(e.eventName)
}))

// Sort by date, newest first
allEvents.sort((a, b) => {
    const dateA = parseEventDate(a.eventDate)
    const dateB = parseEventDate(b.eventDate)
    return dateB.getTime() - dateA.getTime()
})

export function getLatestEvents(count: number = 3): Event[] {
    return allEvents.slice(0, count)
}

export function getEventBySlug(slug: string): Event | undefined {
    return allEvents.find((e) => e.slug === slug)
}

export function getAllEvents(): Event[] {
    return allEvents
}

export function getAllEventYears(): string[] {
    const years = [...new Set(allEvents.map((e) => e.year))]
    return years.sort((a, b) => b.localeCompare(a))
}

export function getEventsByYear(year: string): Event[] {
    return allEvents.filter((e) => e.year === year)
}

export { parseEventDate, formatEventDate }
export default allEvents