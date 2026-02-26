export interface EventData {
    year: string
    eventName: string
    eventCardDescription: string
    eventDate: string
    eventPic: string
    eventMarkdown: string
    eventUrl: string
}

export interface Event extends EventData {
    slug: string
}

export function generateSlug(name: string): string {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim()
}
