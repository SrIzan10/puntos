/**
 * v0 by Vercel.
 * @see https://v0.dev/t/igzEEdGqAvH
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuGroup, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { lucia, validateRequest } from "@/lib/auth"
import { cookies } from "next/headers"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function Navbar() {
  const { user } = await validateRequest();
  return (
    <nav className="flex items-center h-16 px-4 border-b shrink-0">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="mr-6 flex" variant="default">
            Puntos
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 ml-4">
          <DropdownMenuLabel>Puntos app</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <Link href="/">
              <DropdownMenuItem>
                Añadir puntos
              </DropdownMenuItem>
            </Link>
            <Link href="/remove">
              <DropdownMenuItem>
                Eliminar puntos
              </DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <Link href="/history">
              <DropdownMenuItem>
                Historial
              </DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>
          {user && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                  <form action={logout}>
                    <DropdownMenuItem>
                      <Button variant={"ghost"} size={'text'}>Log out</Button>
                    </DropdownMenuItem>
                  </form>
              </DropdownMenuGroup>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="flex-1" />
    </nav>
  )
}

async function logout(): Promise<ActionResult> {
	"use server";
  const { session } = await validateRequest();
	await lucia.invalidateSession(session!.id);
	const sessionCookie = lucia.createBlankSessionCookie();
	cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
	return redirect("/auth/signUp");
}

interface ActionResult {
  error: string;
}