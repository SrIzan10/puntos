import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import prisma from "@/lib/db"
import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs"

export default function RemovePoints() {
  async function createPoints(formData: FormData) {
    'use server'

    const rawFormData = {
      points: `-${formData.get('points')}`,
      reason: formData.get('reason'),
    }

    await prisma.point.create({
      data: {
        userId: (await currentUser())!.id,
        number: Number(rawFormData.points),
        reason: rawFormData.reason as string,
      }
    })
    await prisma.pointCount.upsert({
      where: {
        userId: (await currentUser())!.id,
      },
      update: {
        balance: {
          increment: Number(rawFormData.points),
        }
      },
      create: {
        userId: (await currentUser())!.id,
        balance: Number(rawFormData.points),
      }
    })
    redirect('/ok')
  }
  return (
    <Card className="lg:w-[350px] w-full flex flex-col items-center justify-center">
      <CardHeader>
        <CardTitle>Elimina puntos</CardTitle> 
        <CardDescription>oh no</CardDescription>
      </CardHeader>
        <form action={createPoints}>
      <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Input name="points" placeholder="Puntos" className="h-20 text-3xl" type="number" />
              <Input name="reason" placeholder="Razón" />
            </div>
          </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button type="submit">oke</Button>
      </CardFooter>
        </form>
    </Card>
  )
}