import { redirect } from 'next/navigation'
import { getCurrentYear } from '@/lib/team-data'

export default function TeamsPage() {
    const currentYear = getCurrentYear()
    redirect(`/teams/${currentYear}`)
}
