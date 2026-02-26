'use client'

import { useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { getTeamByYear, getCurrentYear } from '@/lib/team-data'
import { ArrowRight } from 'lucide-react'

// --- Types ---
type Member = {
  name: string
  role: string
  image?: string
  instagram?: string
  linkedin?: string
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
  visible: {
    opacity: 1,
    y: 0
  }
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1
  }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
}

export default function TeamSection() {
  const currentYear = getCurrentYear()

  // Transform Data Logic (Memoized for performance)
  const teamsData = useMemo(() => {
    const yearData = getTeamByYear(currentYear)
    if (!yearData) return []

    const teams: Team[] = []
    const colors = [
      'from-blue-600 to-blue-400', 'from-emerald-600 to-emerald-400',
      'from-orange-500 to-amber-400', 'from-pink-500 to-rose-400',
      'from-purple-600 to-purple-400', 'from-red-600 to-red-400',
      'from-yellow-500 to-amber-400', 'from-teal-600 to-teal-400',
      'from-cyan-500 to-cyan-300', 'from-indigo-500 to-indigo-400',
    ]
    let colorIndex = 0

    const addTeam = (name: string, head: Member, members: Member[], variant?: Team['variant']) => {
      teams.push({
        name,
        head,
        members,
        variant,
        color: colors[colorIndex % colors.length],
      })
      colorIndex++
    }

    // Core Team
    if (yearData.coreTeam?.length) {
      addTeam('Core Team', yearData.coreTeam[0], yearData.coreTeam, 'gridOnly')
    }

    // Departmental Teams
    const departmentMap: { [key: string]: string } = {
      operations: 'Operations', webTech: 'Web & Tech', web: 'Web', tech: 'Tech',
      prMarketing: 'PR & Marketing', pr: 'PR', creative: 'Creative', socialMedia: 'Social Media',
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
  }, [currentYear])

  return (
    <section id="team" className="relative min-h-screen bg-transparent py-24 px-6 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto mb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mt-2 text-5xl md:text-6xl font-bold text-neutral-900 tracking-tight">Meet the People</h2>
          <span className="text-sm font-medium tracking-[0.2em] text-neutral-400 uppercase">Behind the scenes &bull; {currentYear}</span>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto space-y-24">
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

            {/* CASE 1: Grid Only (Core) - CENTERED */}
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
              // CASE 2: Standard Teams (Head + Members)
              // DON'T REMOVE COMMENT: items-center is essential - it vertically centers the team members grid relative to the team head card.
              <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 lg:gap-16 items-center">
                {/* Team Head */}
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

                {/* Team Members - Staggered Grid */}
                {/* DON'T REMOVE: justify-center is crucial for visual balance */}
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
      </div>

      {/* View All Teams Button */}
      <div className="flex justify-center mt-16">
        <Link
          href="/teams"
          className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white font-semibold text-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.5)] transition-all duration-200 hover:-translate-y-0.5"
        >
          View All Teams
          <ArrowRight size={24} />
        </Link>
      </div>
    </section>
  )
}

// Extracted Card Component for cleaner code
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
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover/member:opacity-100 transition-opacity duration-300" />

        {/* Text Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover/member:translate-y-0 opacity-0 group-hover/member:opacity-100 transition-all duration-300">
          <p className="text-white font-bold text-lg leading-tight truncate">{member.name}</p>
          <p className="text-white/80 text-xs font-medium uppercase tracking-wider mt-1 truncate">{member.role}</p>

          {/* Social Icons */}
          <div className="flex gap-3 mt-3">
            {member.instagram && (
              <a href={member.instagram} target="_blank" rel="noreferrer" className="text-white hover:text-pink-400 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.468 2.373c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
              </a>
            )}
            {member.linkedin && (
              <a href={member.linkedin} target="_blank" rel="noreferrer" className="text-white hover:text-blue-400 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" /></svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}