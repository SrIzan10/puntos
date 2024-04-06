import Points from "@/components/app/Points/Points";
import prisma from "@/lib/db";
import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
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
        <Points />
      </div>
    </>
  );
}
