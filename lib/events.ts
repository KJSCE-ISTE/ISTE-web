interface Event {
    id: number;
    title: string;
    startDate: string;
    endDate: string;
    description: string;
    imageUrl: string;
    eventUrl?: string;
}

const Events: Event[] = [{
    id: 1,
    title: "Prakalpa 2025",
    startDate: "2025-02-15",
    endDate: "2025-02-15",
    description: "Annual technical fest featuring competitions, workshops, and tech talks. Join us for a day of innovation and learning!",
    imageUrl: "/Images/Prakalp2023poster.png",
    eventUrl: "https://istekjsse.in/prakalpa"
}, {
    id: 2,
    title: "Abhiyantriki 2025",
    startDate: "2024-11-20",
    endDate: "2024-11-20",
    description: "Our flagship technical symposium showcasing cutting-edge projects and research presentations from engineering students.",
    imageUrl: "/Images/events/abhiyantriki-23.jpg",
    eventUrl: "https://istekjsse.in/abhiyantriki"
}, {
    id: 3,
    title: "Innovation Day 2026",
    startDate: "2026-03-10",
    endDate: "2026-03-10",
    description: "Celebrate innovation with hands-on workshops, industry expert sessions, and interactive demonstrations.",
    imageUrl: "/Images/events/iday 16.jpg",
    eventUrl: "https://istekjsse.in/innovation-day"
}]

export default Events;