import { validateRequest } from "@/lib/auth";

export default async function GET(request: Request) {
    const { user } = await validateRequest();
    if (!user) {
        return Response.redirect("/auth/login");
    }
}