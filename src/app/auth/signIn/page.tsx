/**
 * @see https://v0.dev/t/ZOQ6u9Lf2bO
*/
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Argon2id } from "oslo/password";
import { cookies } from "next/headers";
import { lucia } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";

export default function Component() {
  return (
    <div className="flex items-center p-4 lg:p-8">
      <div className="w-full max-w-md m-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold pb-1">Inicia sesión</h1>
          <p className="text-gray-500 dark:text-gray-400">haha yes</p>
        </div>
        <form action={login}>
            <div className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="email">Nombre de usuario</Label>
                <Input name="username" id="username" placeholder="srizan" required type="text" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input name="password" id="password" placeholder="osakafromazumangadaioh123" required type="password" />
            </div>
            <Button className="w-full" type="submit">Iniciar sesión</Button>
            <div className="text-center text-sm">
            ¿No tienes una cuenta?
            <Link className="underline pl-1" href="/auth/signUp">
                Crear una cuenta
            </Link>
            </div>
        </div>
        </form>
      </div>
    </div>
  )
}

async function login(formData: FormData): Promise<ActionResult> {
	"use server";
	const username = formData.get("username");
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

	const existingUser = await prisma.user.findUnique({
        where: {
            username: username
        }
    })
	if (!existingUser) {
		// NOTE:
		// Returning immediately allows malicious actors to figure out valid usernames from response times,
		// allowing them to only focus on guessing passwords in brute-force attacks.
		// As a preventive measure, you may want to hash passwords even for invalid usernames.
		// However, valid usernames can be already be revealed with the signup page among other methods.
		// It will also be much more resource intensive.
		// Since protecting against this is non-trivial,
		// it is crucial your implementation is protected against brute-force attacks with login throttling etc.
		// If usernames are public, you may outright tell the user that the username is invalid.
		return {
			error: "Incorrect username or password"
		};
	}

	const validPassword = await new Argon2id().verify(existingUser.hashed_password, password);
	if (!validPassword) {
		return {
			error: "Incorrect username or password"
		};
	}

	const session = await lucia.createSession(existingUser.id, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
	return redirect("/");
}

interface ActionResult {
    error: string;
}