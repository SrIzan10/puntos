import History from '@/components/app/History/History'
import prisma from '@/lib/db'
import { validateRequest } from '@/lib/auth';

export default async function Page() {
    const { user } = await validateRequest();
    const pointHistory = (await prisma.point.findMany({
        where: {
            userId: user!.id
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