import RemovePoints from "@/components/app/RemovePoints/RemovePoints"
import prisma from "@/lib/db"
import { currentUser } from "@clerk/nextjs"

export default async function Page() {
    const pointCount = (await prisma.pointCount.findFirst({
        where: {
          userId: (await currentUser())!.id,
        }
    }))!.balance
    return (
        <>
            <h1 className="text-3xl text-center mb-6">tienes {pointCount} puntos</h1>
            <div className="flex items-center justify-center">
                <RemovePoints />
            </div>
        </>
    )
}