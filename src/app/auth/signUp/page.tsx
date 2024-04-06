/**
 * @see https://v0.dev/t/5ENQEFtiZm9
*/
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import prisma from "@/lib/db";
import { Argon2id } from "oslo/password";
import { cookies } from "next/headers";
import { lucia } from "@/lib/auth";
import { redirect } from "next/navigation";
import { generateId } from "lucia";

export default function Component() {
  return (
    <div className="flex items-center p-6 lg:p-8">
      <div className="w-full max-w-md m-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold pb-1">Crea una cuenta</h1>
          <p className="text-gray-500 dark:text-gray-400">venga ya tio</p>
        </div>
        <form action={signup}>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Nombre de usuario</Label>
            <Input name="username" required type="text" id="username" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input name="password" required type="password" id="password" />
          </div>
          <Button className="w-full" type="submit">Registrarse</Button>
          <div className="text-center text-sm">
            ¿Ya tienes una cuenta?
            <Link className="underline pl-1" href="/auth/signIn">
              Login
            </Link>
          </div>
        </div>
        </form>
      </div>
    </div>
  )
}

async function signup(formData: FormData): Promise<ActionResult> {
	"use server";
	const username = formData.get("username");
    console.log(username)
	// username must be between 4 ~ 31 characters, and only consists of lowercase letters, 0-9, -, and _
	// keep in mind some database (e.g. mysql) are case insensitive
	if (
		typeof username !== "string" ||
		username.length < 3 ||
		username.length > 31 ||
		!/^[a-z0-9_-]+$/.test(username)
	) {
		return {
			error: "Invalid username"
		};
	}
	const password = formData.get("password");
	if (typeof password !== "string" || password.length < 6 || password.length > 255) {
		return {
			error: "Invalid password"
		};
	}

	const hashedPassword = await new Argon2id().hash(password);
	const userId = generateId(15);

	// TODO: check if username is already used
	await prisma.user.create({
        data: {
            id: userId,
            username: username,
            hashed_password: hashedPassword
	    }
    });

	const session = await lucia.createSession(userId, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
	return redirect("/");
}

interface ActionResult {
	error: string;
}
