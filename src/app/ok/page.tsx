import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
    return (
        <div>
            <h1 className="text-6xl font-bold text-center animate-spin">nice</h1>
            <Link href={'/'}>
                <Button className="animate-bounce">volver a la página de los puntos</Button>
            </Link>
        </div>
    )
}