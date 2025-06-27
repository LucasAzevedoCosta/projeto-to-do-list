import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-5 items-center justify-center h-screen px-5 text-center">
      {/* <Image
        src=""
        alt=""
        width={100}
        height={100}
        className="rounded-lg dark:invert"
      /> */}

      <h1 className="text-4xl font-bold">Projeto to do list</h1>

      <p className="text-lg">
        Projeto to do list. Esse é um projeot de um to do list
      </p>

      <div className="flex gap-2">
        <Link href="/login">
          <Button>Login</Button>
        </Link>
        <Link href="/signup">
          <Button>Signup</Button>
        </Link>
      </div>
    </div>
  );
}