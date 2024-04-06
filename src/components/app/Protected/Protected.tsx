import { validateRequest } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Protected({ children }: { children: React.ReactNode }) {
    const publicRoutes = ['/auth/signIn', '/auth/signUp'];
    const { user } = await validateRequest();
    if (!user && !publicRoutes.includes(headers().get('x-url')!)) return redirect('/auth/signIn');
    else return <>{children}</>;
}