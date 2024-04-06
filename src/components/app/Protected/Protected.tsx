import { validateRequest } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Protected({ children }: { children: React.ReactNode }) {
    const publicRoutes = ['/auth/signIn', '/auth/signUp'];

    if (publicRoutes.includes(headers().get('x-url')!)) return <>{children}</>;

    const { user } = await validateRequest();
    if (!user) redirect('/auth/signIn');

    return <>{children}</>;
}