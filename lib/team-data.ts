import { TeamMember } from '@/models/teamMember'
import teamsJson from '@/app/data/teams.json'

const allMembers: TeamMember[] = teamsJson as TeamMember[]

// --- Structured types used by TeamSection ---
export type MemberDisplay = {
  name: string
  role: string
  image?: string
  instagram?: string
  linkedin?: string
  github?: string
}

export type DepartmentData = {
  head: MemberDisplay
  team: MemberDisplay[]
}

export type YearTeamData = {
  facultyAdvisors?: MemberDisplay[]
  coreTeam?: MemberDisplay[]
  operations?: DepartmentData
  webTech?: DepartmentData
  web?: DepartmentData
  tech?: DepartmentData
  prMarketing?: DepartmentData
  pr?: DepartmentData
  creative?: DepartmentData
  socialMedia?: DepartmentData
  events?: DepartmentData
  literary?: DepartmentData
  studentAdvisors?: MemberDisplay[]
  [key: string]: MemberDisplay[] | DepartmentData | undefined
}

function memberToDisplay(m: TeamMember): MemberDisplay {
  return {
    name: m.name,
    role: m.teamRole,
    image: m.imageUrl || undefined,
    instagram: m.instagram && m.instagram.trim() ? m.instagram : undefined,
    linkedin: m.linkedin && m.linkedin.trim() ? m.linkedin : undefined,
    github: m.github && m.github.trim() ? m.github : undefined,
  }
}

// Map team names from JSON to structured keys
function teamNameToKey(teamName: string): string {
  const mapping: Record<string, string> = {
    'Core': 'coreTeam',
    'Events': 'events',
    'Tech': 'tech',
    'Web': 'web',
    'PR': 'pr',
    'Web_And_Tech': 'webTech',
    'PR_And_Marketing': 'prMarketing',
    'Social_media': 'socialMedia',
    'Social_Media': 'socialMedia',
    'Creatives': 'creative',
    'Creative': 'creative',
    'Literary': 'literary',
    'Operations': 'operations',
  }
  return mapping[teamName] || teamName.toLowerCase()
}

// Department keys that use head/team structure
const departmentKeys = new Set([
  'operations', 'webTech', 'web', 'tech', 'prMarketing', 'pr',
  'creative', 'socialMedia', 'events', 'literary'
])

function buildYearData(members: TeamMember[]): YearTeamData {
  const data: YearTeamData = {}

  // Group members by team
  const grouped: Record<string, TeamMember[]> = {}
  for (const m of members) {
    const key = teamNameToKey(m.team)
    if (!grouped[key]) grouped[key] = []
    grouped[key].push(m)
  }

  // Core team → flat array
  if (grouped['coreTeam']) {
    data.coreTeam = grouped['coreTeam'].map(memberToDisplay)
  }

  // Department teams → head + members structure
  for (const key of Object.keys(grouped)) {
    if (key === 'coreTeam') continue

    if (departmentKeys.has(key)) {
      const teamMembers = grouped[key]
      // Find the head (isTeamLead === true, or role includes 'Head')
      const headMember = teamMembers.find(m =>
        m.isTeamLead && m.teamRole.toLowerCase().includes('head')
      ) || teamMembers.find(m => m.isTeamLead)

      const restMembers = teamMembers.filter(m => m !== headMember)

      if (headMember) {
        data[key] = {
          head: memberToDisplay(headMember),
          team: restMembers.map(memberToDisplay)
        } as DepartmentData
      } else {
        // No head found, just list all as a department with first as head
        data[key] = {
          head: memberToDisplay(teamMembers[0]),
          team: teamMembers.slice(1).map(memberToDisplay)
        } as DepartmentData
      }
    }
  }

  return data
}

export function getAllYears(): string[] {
  const years = [...new Set(allMembers.map(m => m.year))]
  return years.sort((a, b) => b.localeCompare(a))
}

export function getCurrentYear(): string {
  const now = new Date()
  const month = now.getMonth() + 1 // 1-based
  const year = now.getFullYear()
  // Academic year starts in June
  if (month >= 6) {
    return `${year}-${year + 1}`
  }
  return `${year - 1}-${year}`
}

export function getTeamByYear(year: string): YearTeamData {
  const members = allMembers.filter(m => m.year === year)
  return buildYearData(members)
}

export function getTeamDataForAllYears(): Record<string, YearTeamData> {
  const years = getAllYears()
  const result: Record<string, YearTeamData> = {}
  for (const year of years) {
    result[year] = getTeamByYear(year)
  }
  return result
}

// Legacy export: structured by short year key for backward compat
const teamData: Record<string, any> = {}
for (const year of getAllYears()) {
  teamData[year] = getTeamByYear(year)
}

export default teamData