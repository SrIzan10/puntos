import RemovePoints from "@/components/app/RemovePoints/RemovePoints"
import { validateRequest } from "@/lib/auth";
import prisma from "@/lib/db"

export default async function Page() {
    const { user } = await validateRequest();
    const pointCount = (await prisma.pointCount.findFirst({
        where: {
          userId: user!.id,
        }
    }) || { balance: 0 }).balance
    return (
        <>
            <h1 className="text-3xl text-center mb-6">tienes {pointCount} puntos</h1>
            <div className="flex items-center justify-center">
                <RemovePoints />
            </div>
        </>
    )
}