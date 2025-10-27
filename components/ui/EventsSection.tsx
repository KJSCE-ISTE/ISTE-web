'use client'

import React, { useState } from 'react'

const EventsSection = () => {
  const [selectedYear, setSelectedYear] = useState('2025')

  const eventsByYear: Record<string, Array<{
    id: number;
    title: string;
    date: string;
    theme: string;
    description: string;
    category: 'Prakalpa' | 'Webinar' | 'Workshop' | 'Independence Day';
    websiteLink?: string;
    brochureLink?: string;
    time?: string;
    mode?: string;
  }>> = {
    '2025': [
      {
        id: 1,
        title: 'PRAKALPA 2025',
        date: '9th April 2025',
        theme: 'TECHNOVATE',
        category: 'Prakalpa',
        description: 'The 16th edition with ₹75,000 prize pool, 60+ teams across India, and first international entry',
        websiteLink: 'https://prakalpa2025.istekjsce.com/',
        brochureLink: 'https://your-brochure.pdf'
      },
      {
        id: 2,
        title: 'THINKSPRINT',
        date: '26th March 2025',
        theme: 'Case Competition',
        category: 'Workshop',
        description: 'Pre-event for PRAKALPA\'25 - Two-round innovative case competition solving real-world industry problems',
        mode: 'Hybrid'
      }
    ],
    '2024': [
      {
        id: 3,
        title: 'PRAKALPA 2024',
        date: '3rd April 2024',
        theme: 'TECHXPO',
        category: 'Prakalpa',
        description: '15th edition with record-breaking entries of hardware and software projects',
        websiteLink: 'https://prakalpa2024.istekjsce.com/',
        brochureLink: 'https://your-brochure.pdf'
      },
      {
        id: 4,
        title: 'CLICK.DRAG.CREATE',
        date: '13th September 2024',
        theme: 'UI/UX Design',
        category: 'Workshop',
        description: 'Hands-on Figma workshop with Friends of Figma - Sooraj Nair & Rishabh Singh',
        mode: 'B113 Seminar Hall'
      },
      {
        id: 5,
        title: 'GeekSpeak',
        date: '7th March 2024',
        theme: 'Programming',
        category: 'Webinar',
        description: 'Session on programming, GDSC and hackathons by Jay Malave',
        time: '4:30pm',
        mode: 'Offline'
      }
    ],
    '2023': [
      {
        id: 6,
        title: 'PRAKALPA 2023',
        date: '13th April 2023',
        theme: 'TECHNOVALLEY',
        category: 'Prakalpa',
        description: '14th edition - National-level competition for technical presentations',
        websiteLink: 'https://istekjsce.com/prakalpa2023/index.html',
        brochureLink: 'https://your-brochure.pdf'
      },
      {
        id: 7,
        title: 'CREAITE',
        date: '28th October 2023',
        theme: 'AI Tools',
        category: 'Workshop',
        description: 'Workshop on AI tools by Abhinav Gupta - ChatGPT, Tome.ai, rvc.ai',
        mode: 'Microsoft Teams'
      }
    ],
    '2022': [
      {
        id: 8,
        title: 'The Cloud Camp',
        date: '29th September 2022',
        theme: 'Cloud Computing',
        category: 'Webinar',
        description: '90 min AZ-900 crash course by Devansh Shah',
        time: '3:30pm',
        mode: 'Offline'
      },
      {
        id: 9,
        title: 'Resume Building',
        date: '18th November 2022',
        theme: 'Career Dev',
        category: 'Webinar',
        description: 'Workshop by Pratik Upadhya on resume and interview prep',
        mode: 'Zoom Meeting'
      }
    ],
    '2021': [
      {
        id: 10,
        title: 'Spotify ML System',
        date: '10th November 2021',
        theme: 'Machine Learning',
        category: 'Workshop',
        description: 'ML recommendation systems by Princey Yadav (Coding Blocks)',
        time: '6:00pm',
        mode: 'Microsoft Teams'
      },
      {
        id: 11,
        title: 'Blockchain & Crypto',
        date: '11th September 2021',
        theme: 'Blockchain',
        category: 'Webinar',
        description: 'Webinar by Rajagopal Menon (VP at WazirX)',
        time: '3pm',
        mode: 'Online'
      },
      {
        id: 12,
        title: 'Cloud Computing',
        date: '14th August 2021',
        theme: 'Cloud Tech',
        category: 'Webinar',
        description: 'Webinar by GCP Expert Vijeta Pai',
        time: '7:45pm',
        mode: 'Online'
      },
      {
        id: 13,
        title: 'Personality Dev',
        date: '22nd March 2021',
        theme: 'Soft Skills',
        category: 'Workshop',
        description: 'Professional skills enhancement workshop',
        time: '6:00pm-7:30pm',
        mode: 'Microsoft Teams'
      },
      {
        id: 14,
        title: 'PCB Design Eagle',
        date: '13th February 2021',
        theme: 'Electronics',
        category: 'Workshop',
        description: 'Electronic schematics using EAGLE CAD',
        time: '12 PM Onwards',
        mode: 'Microsoft Teams'
      }
    ],
    '2020': [
      {
        id: 15,
        title: 'Winning New World',
        date: '5th September 2020',
        theme: 'Entrepreneurship',
        category: 'Webinar',
        description: 'By Ahmed Aftab Naqvi (CEO of Gozoop)',
        time: '4pm-5pm',
        mode: 'Zoom'
      },
      {
        id: 16,
        title: 'Backtracking Algorithm',
        date: '8th August 2020',
        theme: 'Competitive Coding',
        category: 'Workshop',
        description: 'By Shubham Rawat (Coding Blocks)',
        time: '8pm-10pm'
      },
      {
        id: 17,
        title: 'R Programming',
        date: '3rd-4th March 2020',
        theme: 'Data Analytics',
        category: 'Workshop',
        description: 'Two-day data analytics workshop',
        time: '5:30pm onwards'
      },
      {
        id: 18,
        title: 'Eagle Workshop',
        date: '4th February 2020',
        theme: 'Circuit Design',
        category: 'Workshop',
        description: 'Circuit designing with EAGLE software',
        time: '5:15pm onwards'
      }
    ],
    '2019': [
      {
        id: 19,
        title: 'PRAKALPA 2019',
        date: '22nd-23rd March 2019',
        theme: 'TECHNOVATORS',
        category: 'Prakalpa',
        description: 'State-level competition with 500+ students',
        brochureLink: 'https://your-brochure.pdf'
      },
      {
        id: 20,
        title: 'Augmented Reality',
        date: '5th October 2019',
        theme: 'AR Development',
        category: 'Workshop',
        description: 'AR using Blender, Unity & Android Studio',
        mode: 'B-110'
      },
      {
        id: 21,
        title: 'UI Design',
        date: '11th-12th Feb 2019',
        theme: 'Graphic Design',
        category: 'Workshop',
        description: 'Wireframing to final design by Arjun Patel',
        time: '5:30pm-7pm'
      }
    ],
    '2018': [
      {
        id: 22,
        title: 'PRAKALPA 2018',
        date: '16th-17th March 2018',
        theme: 'TECHNOVERSE',
        category: 'Prakalpa',
        description: 'State-level technical paper competition',
        brochureLink: 'https://your-brochure.pdf'
      },
      {
        id: 23,
        title: 'GRE Seminar',
        date: '14th August 2018',
        theme: 'Graduate Studies',
        category: 'Webinar',
        description: 'GRE prep by Nitin Lathe for 88 students',
        mode: 'A-315'
      },
      {
        id: 24,
        title: 'Component Workshop',
        date: '5th September 2018',
        theme: 'Electronics',
        category: 'Workshop',
        description: 'Calculator & component testing for FE',
        mode: 'B-407'
      },
      {
        id: 25,
        title: 'BlockChain Tech',
        date: '20th January 2018',
        theme: 'Blockchain',
        category: 'Webinar',
        description: 'Full-day seminar with BitGenie',
        time: '10am-5pm'
      }
    ],
    '2017': [
      {
        id: 26,
        title: 'PRAKALPA 2017',
        date: '31st March-1st April 2017',
        theme: 'AI Innovation',
        category: 'Prakalpa',
        description: 'State-level technical competition',
        brochureLink: 'https://your-brochure.pdf'
      },
      {
        id: 27,
        title: 'Arduino Workshop',
        date: '13th-15th Sept 2017',
        theme: 'Embedded Systems',
        category: 'Workshop',
        description: 'Three-day Arduino programming',
        time: '5:15pm-8:00pm'
      },
      {
        id: 28,
        title: 'Component Testing',
        date: '8th September 2017',
        theme: 'Electronics',
        category: 'Workshop',
        description: 'Component testing & identification',
        time: '5:15pm'
      }
    ],
    '2016': [
      {
        id: 29,
        title: 'PRAKALPA 2016',
        date: '18th-19th March 2016',
        theme: 'Digital India',
        category: 'Prakalpa',
        description: 'Technical paper & model competition',
        brochureLink: 'https://your-brochure.pdf'
      },
      {
        id: 38,
        title: 'Independence Day 2016',
        date: '16th August 2016',
        theme: 'National Celebration',
        category: 'Independence Day',
        description: 'Patriotic songs by students and Team Rhapsody, speeches on significance of the day',
        time: '12pm-12:45pm',
        mode: 'Amphitheater'
      },
      {
        id: 30,
        title: 'Hackathon',
        date: '5th March 2016',
        theme: 'Product Dev',
        category: 'Workshop',
        description: 'Full-day idea to product hackathon',
        time: '10am-3pm'
      }
    ],
    '2015': [
      {
        id: 31,
        title: 'PRAKALPA 2015',
        date: '5th-7th March 2015',
        theme: 'Security Systems',
        category: 'Prakalpa',
        description: 'State-level technical competition',
        brochureLink: 'https://your-brochure.pdf'
      },
      {
        id: 39,
        title: 'Independence Day 2015',
        date: '16th August 2015',
        theme: 'National Celebration',
        category: 'Independence Day',
        description: 'Somaiya prayer followed by National Anthem with students and faculty',
        time: '12pm-12:45pm',
        mode: 'New Building Quadrangle'
      },
      {
        id: 32,
        title: 'GATE Seminar',
        date: '3rd September 2015',
        theme: 'Graduate Entrance',
        category: 'Webinar',
        description: 'GATE prep by Prof. Vijay Shekhar',
        time: '5:15pm-6:15pm'
      },
      {
        id: 33,
        title: 'OOP Concepts',
        date: '5th February 2015',
        theme: 'Programming',
        category: 'Webinar',
        description: 'Java OOP for 80+ students',
        time: '5:15pm'
      }
    ],
    '2014': [
      {
        id: 34,
        title: 'PRAKALPA 2014',
        date: '14th-15th March 2014',
        theme: 'Sustainable Dev',
        category: 'Prakalpa',
        description: 'State-level project exhibition',
        brochureLink: 'https://your-brochure.pdf'
      },
      {
        id: 40,
        title: 'Independence Day 2014',
        date: '16th August 2014',
        theme: 'National Celebration',
        category: 'Independence Day',
        description: 'Somaiya prayer and National Anthem celebration with students and faculty',
        time: '12pm-12:45pm',
        mode: 'New Building Quadrangle'
      },
      {
        id: 35,
        title: 'Blogging Seminar',
        date: '24th January 2014',
        theme: 'Content Creation',
        category: 'Webinar',
        description: 'From basics to earning through blogging',
        time: '5pm-6:30pm'
      }
    ],
    '2013': [
      {
        id: 36,
        title: 'PRAKALPA 2013',
        date: '5th-6th April 2013',
        theme: 'Eng. for Disabled',
        category: 'Prakalpa',
        description: 'State-level competition',
        brochureLink: 'https://your-brochure.pdf'
      },
      {
        id: 41,
        title: 'Independence Day 2013',
        date: '16th August 2013',
        theme: 'National Celebration',
        category: 'Independence Day',
        description: 'Somaiya prayer and National Anthem with students and faculty members',
        time: '12pm-12:45pm',
        mode: 'Old Building Quadrangle'
      }
    ],
    '2012': [
      {
        id: 37,
        title: 'PRAKALPA 2012',
        date: '30th-31st March 2012',
        theme: 'Eng. for Disabled',
        category: 'Prakalpa',
        description: 'Technical Paper & Models Exhibition',
        brochureLink: 'https://your-brochure.pdf'
      },
      {
        id: 42,
        title: 'Independence Day 2012',
        date: '16th August 2012',
        theme: 'National Celebration',
        category: 'Independence Day',
        description: 'Somaiya Prayer followed by National Anthem played uniquely on flute by Sohail Shah',
        time: '12pm-12:45pm',
        mode: 'Old Building Quadrangle'
      }
    ]
  }

  const years = Object.keys(eventsByYear).sort((a, b) => parseInt(b) - parseInt(a))
  const currentEvents = eventsByYear[selectedYear] || []

  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'Prakalpa': return 'bg-purple-500'
      case 'Webinar': return 'bg-blue-500'
      case 'Workshop': return 'bg-green-500'
      case 'Independence Day': return 'bg-orange-500'
      default: return 'bg-amber-500'
    }
  }

  return (
    <section id="events" className="bg-amber-300 relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-20">
      <div className="max-w-7xl w-full">
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-12 bg-gradient-to-r from-neutral-800 to-neutral-600 bg-clip-text text-transparent">
          Events
        </h2>

        {/* Year Buttons */}
        <div className="flex justify-center gap-4 mb-16 flex-wrap">
          {years.map(year => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`px-8 py-4 rounded-xl font-bold text-xl transition-all duration-300 ${
                selectedYear === year
                  ? 'bg-neutral-800 text-white shadow-xl scale-110'
                  : 'bg-white/80 text-neutral-700 hover:bg-white hover:scale-105 shadow-md'
              }`}
            >
              {year}
            </button>
          ))}
        </div>

        {/* Hexagonal Event Cards */}
        <div className="flex flex-wrap justify-center gap-8">
          {currentEvents.map((event, index) => (
            <div
              key={event.id}
              className="relative group"
              style={{
                width: '280px',
                height: '320px',
                animation: `fadeIn 0.5s ease-out ${index * 0.1}s both`
              }}
            >
              {/* Hexagon Shape */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="relative bg-white/90 backdrop-blur-sm shadow-xl transition-all duration-500 group-hover:shadow-2xl"
                  style={{
                    width: '240px',
                    height: '277px',
                    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                    transition: 'clip-path 0.5s ease, width 0.5s ease, height 0.5s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.clipPath = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 100%, 0% 0%)'
                    e.currentTarget.style.width = '280px'
                    e.currentTarget.style.height = '320px'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.clipPath = 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
                    e.currentTarget.style.width = '240px'
                    e.currentTarget.style.height = '277px'
                  }}
                >
                  {/* Category Badge */}
                  <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-10">
                    <span className={`${getCategoryColor(event.category)} text-white text-xs px-3 py-1 rounded-full font-semibold`}>
                      {event.category === 'Independence Day' ? 'I-Day' : event.category}
                    </span>
                  </div>

                  {/* Content Container */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center pt-16">
                    <h3 className="text-base font-bold text-neutral-800 mb-2 leading-tight">
                      {event.title}
                    </h3>
                    <div className="w-12 h-1 bg-amber-400 rounded mb-2"></div>
                    <p className="text-xs font-semibold text-amber-600 mb-1">
                      {event.date}
                    </p>
                    <p className="text-xs font-bold text-neutral-700 mb-1">
                      {event.theme}
                    </p>
                    {event.time && (
                      <p className="text-xs text-amber-600 font-semibold mb-1">
                        {event.time}
                      </p>
                    )}
                    {event.mode && (
                      <p className="text-xs text-neutral-600 mb-2">
                        {event.mode}
                      </p>
                    )}
                    <p className="text-xs text-neutral-500 leading-relaxed line-clamp-2">
                      {event.description}
                    </p>
                    {(event.websiteLink || event.brochureLink) && (
                      <div className="flex gap-2 mt-2">
                        {event.websiteLink && (
                          <a
                            href={event.websiteLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs bg-amber-500 text-white px-3 py-1 rounded-full hover:bg-amber-600 transition-colors"
                          >
                            Website
                          </a>
                        )}
                        {event.brochureLink && (
                          <a
                            href={event.brochureLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs bg-neutral-700 text-white px-3 py-1 rounded-full hover:bg-neutral-800 transition-colors"
                          >
                            Brochure
                          </a>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Hover Border Effect */}
                  <div
                    className="absolute inset-0 border-4 border-amber-400 opacity-0 group-hover:opacity-100 transition-all duration-500"
                    style={{
                      clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                      transition: 'clip-path 0.5s ease, opacity 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.clipPath = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 100%, 0% 0%)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.clipPath = 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
                    }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {currentEvents.length === 0 && (
          <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-neutral-200/50 shadow-lg p-12 text-center">
            <p className="text-xl text-neutral-600">
              No events scheduled for {selectedYear}
            </p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  )
}

export default EventsSection