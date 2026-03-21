'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { getTeamByYear, getAllYears } from '@/lib/team-data'
import { ArrowLeft } from 'lucide-react'
import { HexagonBackground } from '@/components/ui/HexagonBackground'

// --- Types ---
type Member = {
    name: string
    role: string
    image?: string
    instagram?: string
    linkedin?: string
    github?: string
}

type Team = {
    name: string
    color: string
    head: Member
    members: Member[]
    variant?: 'gridOnly'
}

// --- Animation Variants ---
const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 }
}

const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
}

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.15 }
    }
}

const teamTransition = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.4, ease: "easeInOut" as const }
}

export default function TeamsYearPage() {
    const params = useParams()
    const router = useRouter()
    const activeYear = params.year as string
    const years = getAllYears()
    const [hoveredYear, setHoveredYear] = useState<string | null>(null)
    const buttonRefs = useRef<Map<string, HTMLButtonElement>>(new Map())

    const teamsData = useMemo(() => {
        const yearData = getTeamByYear(activeYear)
        if (!yearData) return []

        const teams: Team[] = []
        const colors = [
            'from-blue-600 to-blue-400', 'from-emerald-600 to-emerald-400',
            'from-orange-500 to-amber-400', 'from-pink-500 to-rose-400',
            'from-purple-600 to-purple-400', 'from-red-600 to-red-400',
            'from-yellow-500 to-amber-400', 'from-teal-600 to-teal-400',
        ]
        let colorIndex = 0

        const addTeam = (name: string, head: Member, members: Member[], variant?: Team['variant']) => {
            teams.push({ name, head, members, variant, color: colors[colorIndex % colors.length] })
            colorIndex++
        }

        if (yearData.coreTeam?.length) {
            addTeam('Core Team', yearData.coreTeam[0], yearData.coreTeam, 'gridOnly')
        }

        const departmentMap: Record<string, string> = {
            operations: 'Operations', webTech: 'Web & Tech', web: 'Web', tech: 'Tech', creative: 'Creative',
            prMarketing: 'PR & Marketing', pr: 'PR', socialMedia: 'Social Media',
            events: 'Events', literary: 'Literary',
        }

        for (const key in departmentMap) {
            const dept = yearData[key]
            if (dept && typeof dept === 'object' && 'head' in dept) {
                const deptData = dept as { head: Member; team: Member[] }
                addTeam(departmentMap[key], deptData.head, deptData.team || [])
            }
        }

        return teams
    }, [activeYear])

    const handleYearChange = (year: string) => {
        router.push(`/teams/${year}`, { scroll: false })
    }

    return (
        <HexagonBackground>
            <div className="relative z-10 min-h-screen">
                {/* Header */}
                <div className="pt-8 px-6 md:px-12">
                    <div className="max-w-7xl mx-auto">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 hover:-translate-y-0.5 font-bold text-sm"
                        >
                            <ArrowLeft size={18} />
                            Back to Home
                        </Link>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-neutral-900 to-neutral-700 bg-clip-text text-transparent">
                                Our Teams
                            </h1>
                            <p className="text-xl text-neutral-600 mt-3">
                                The people who make it all happen
                            </p>
                        </motion.div>

                        {/* Year Switcher - Animated pill buttons */}
                        <div className="mt-8 mb-12">
                            <LayoutGroup>
                                <div className="flex flex-wrap gap-2 p-1.5 bg-neutral-100 rounded-2xl w-fit border border-neutral-200">
                                    {years.map((year) => (
                                        <button
                                            key={year}
                                            ref={(el) => {
                                                if (el) buttonRefs.current.set(year, el)
                                            }}
                                            onClick={() => handleYearChange(year)}
                                            onMouseEnter={() => setHoveredYear(year)}
                                            onMouseLeave={() => setHoveredYear(null)}
                                            className={`relative rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors duration-300 z-10 ${activeYear === year
                                                ? 'text-white'
                                                : 'text-neutral-600 hover:text-neutral-900'
                                                }`}
                                        >
                                            {/* Active indicator - sliding pill */}
                                            {activeYear === year && (
                                                <motion.div
                                                    layoutId="activeYearPill"
                                                    className="absolute inset-0 bg-neutral-900 rounded-xl shadow-lg"
                                                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                                    style={{ zIndex: -1 }}
                                                />
                                            )}
                                            {/* Hover indicator */}
                                            {hoveredYear === year && activeYear !== year && (
                                                <motion.div
                                                    layoutId="hoverYearPill"
                                                    className="absolute inset-0 bg-neutral-200/70 rounded-xl"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    transition={{ duration: 0.15 }}
                                                    style={{ zIndex: -1 }}
                                                />
                                            )}
                                            {year}
                                        </button>
                                    ))}
                                </div>
                            </LayoutGroup>
                        </div>
                    </div>
                </div>

                {/* Team Content */}
                <div className="px-6 md:px-12 pb-24">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeYear}
                            {...teamTransition}
                            className="max-w-7xl mx-auto space-y-24"
                        >
                            {teamsData.length === 0 && (
                                <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-12 text-center rounded-xl">
                                    <p className="text-2xl text-neutral-600 font-bold">
                                        No team data available for {activeYear}
                                    </p>
                                </div>
                            )}

                            {teamsData.map((team) => (
                                <div key={team.name} className="relative group">
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true, margin: "-100px" }}
                                        className={`mb-8 ${team.variant === 'gridOnly' ? 'text-center' : ''}`}
                                    >
                                        <span className="text-xs font-semibold tracking-widest text-neutral-400 uppercase border-b border-neutral-200 pb-2">
                                            {team.name}
                                        </span>
                                    </motion.div>

                                    {team.variant === 'gridOnly' ? (
                                        <motion.div
                                            variants={staggerContainer}
                                            initial="hidden"
                                            whileInView="visible"
                                            viewport={{ once: true, margin: "-50px" }}
                                            className="flex flex-wrap justify-center gap-6 md:gap-8"
                                        >
                                            {team.members.map((member) => (
                                                <motion.div
                                                    key={member.name}
                                                    variants={fadeInUp}
                                                    transition={{ type: 'spring', stiffness: 50, damping: 20 }}
                                                    className="w-full sm:w-[calc(50%-1.5rem)] md:w-[calc(33.33%-1.5rem)] lg:w-[calc(25%-1.5rem)] max-w-[220px]"
                                                >
                                                    <MemberCard member={member} />
                                                </motion.div>
                                            ))}
                                        </motion.div>
                                    ) : (
                                        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 lg:gap-16 items-center">
                                            <motion.div
                                                initial="hidden"
                                                whileInView="visible"
                                                viewport={{ once: true, margin: "-100px" }}
                                                variants={scaleIn}
                                                transition={{ duration: 0.5, ease: "easeOut" }}
                                                className="w-full max-w-[280px] sticky top-24"
                                            >
                                                <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden border-2 border-neutral-900 shadow-2xl bg-white">
                                                    <Image
                                                        src={team.head.image || '/placeholder.svg'}
                                                        alt={team.head.name}
                                                        fill
                                                        sizes="(max-width: 1024px) 92vw, 280px"
                                                        className="object-cover object-top hover:scale-105 transition-transform duration-700"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                                    <div className="absolute bottom-0 left-0 right-0 p-6 text-left">
                                                        <p className="text-2xl font-bold text-white leading-tight">{team.head.name}</p>
                                                        <p className="text-md text-white/80 font-medium mt-1">{team.head.role}</p>
                                                    </div>
                                                </div>
                                            </motion.div>

                                            <motion.div
                                                variants={staggerContainer}
                                                initial="hidden"
                                                whileInView="visible"
                                                viewport={{ once: true, margin: "-50px" }}
                                                className="flex flex-wrap justify-center gap-5 md:gap-6"
                                            >
                                                {team.members.map((member) => (
                                                    <motion.div
                                                        key={member.name}
                                                        variants={fadeInUp}
                                                        transition={{ type: 'spring', stiffness: 50, damping: 20 }}
                                                        className="w-full sm:w-[calc(50%-1.5rem)] md:w-[calc(33.33%-1.5rem)] lg:w-[calc(25%-1.5rem)] max-w-[220px]"
                                                    >
                                                        <MemberCard member={member} small />
                                                    </motion.div>
                                                ))}
                                            </motion.div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </HexagonBackground>
    )
}

function MemberCard({ member, small = false }: { member: Member, small?: boolean }) {
    return (
        <div className="group/member relative w-full">
            <div className={`relative w-full aspect-[4/5] ${small ? 'rounded-2xl' : 'rounded-3xl'} overflow-hidden border border-neutral-200 shadow-sm bg-white transition-all duration-300 hover:shadow-xl hover:-translate-y-2`}>
                <Image
                    src={member.image || '/placeholder.svg'}
                    alt={member.name}
                    fill
                    sizes="(max-width: 640px) 45vw, (max-width: 1280px) 30vw, 300px"
                    className="object-cover object-top grayscale-[20%] group-hover/member:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover/member:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover/member:translate-y-0 opacity-0 group-hover/member:opacity-100 transition-all duration-300">
                    <p className="text-white font-bold text-lg leading-tight truncate">{member.name}</p>
                    <p className="text-white/80 text-xs font-medium uppercase tracking-wider mt-1 truncate">{member.role}</p>
                    <div className="flex gap-3 mt-3">
                        {member.instagram && (
                            <a href={member.instagram} target="_blank" rel="noreferrer" className="text-white hover:text-pink-400 transition-colors" onClick={(e) => e.stopPropagation()}>
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.468 2.373c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
                            </a>
                        )}
                        {member.linkedin && (
                            <a href={member.linkedin} target="_blank" rel="noreferrer" className="text-white hover:text-blue-400 transition-colors" onClick={(e) => e.stopPropagation()}>
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" /></svg>
                            </a>
                        )}
                        {member.github && (
                            <a href={member.github} target="_blank" rel="noreferrer" className="text-white hover:text-neutral-300 transition-colors" onClick={(e) => e.stopPropagation()}>
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
