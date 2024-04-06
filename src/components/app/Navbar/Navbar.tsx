/**
 * v0 by Vercel.
 * @see https://v0.dev/t/igzEEdGqAvH
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button"
import { DropdownMenuShortcut } from "@/components/ui/dropdown-menu"
import { UserButton } from "@clerk/nextjs"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuGroup, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import Link from "next/link"

export default function Navbar() {
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
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="flex-1" />
      <UserButton />
    </nav>
  )
}

