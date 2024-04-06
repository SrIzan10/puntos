import DesktopPoints from "@/components/app/Points/Desktop/Desktop";
import prisma from "@/lib/db";
import { currentUser } from "@clerk/nextjs";

export default async function Home() {
  const pointCount = (await prisma.pointCount.findFirst({
    where: {
      userId: (await currentUser())!.id,
    }
  }))!.balance
  return (
    <>
      <h1 className="text-3xl text-center mb-6">tienes {pointCount} puntos</h1>
      <div className="flex items-center justify-center">
        <DesktopPoints />
      </div>
    </>
  );
}
