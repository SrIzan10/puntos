import History from '@/components/app/History/History'
import prisma from '@/lib/db'
import { currentUser } from '@clerk/nextjs'

export default async function Page() {
    const pointHistory = (await prisma.point.findMany({
        where: {
            userId: (await currentUser())!.id
        }
    })).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).map(p => {
        return {
            date: p.createdAt,
            reason: p.reason,
            points: p.number,
            id: p.id
        }
    })
    return pointHistory.map(p => <History key={p.id} {...p} />)
}