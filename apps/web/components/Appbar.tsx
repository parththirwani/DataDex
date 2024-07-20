"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import { Button } from "@repo/ui/button";
import { CodeIcon } from "./Icon";
import { ModeToggle } from "./ModeToggle";
import { useRouter } from "next/navigation";

export function Appbar() {
  const router=useRouter()
  const { data: session, status: sessionStatus } = useSession();
  const isLoading = sessionStatus === "loading";

  return (
    <header className="bg-gray-900 text-white px-4 md:px-6 py-3 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-2" prefetch={false}>
        <img src="/Main-logo.png" alt="das" className="h-9 w-10" />
        <span className="text-lg font-bold">DataDex</span>
      </Link>
      <nav className="hidden md:flex items-center gap-6">
        <Link href="/contests" className="hover:underline" prefetch={false}>
          Contests
        </Link>
        <Link href="/problems" className="hover:underline" prefetch={false}>
          Coding
        </Link>
        <Link href="/mcqs" className="hover:underline" prefetch={false}>
          MCQs
        </Link>
      </nav>
      <div className="flex items-center gap-4">
        <Link href="/Mentorship" className="hover:underline" prefetch={false}>
          <Button onClick={()=> router.push("/Mentorship")}>1:1 Mentorship</Button>
        </Link>
        {!isLoading && session?.user && (
          <>
            <ModeToggle />
            <Button onClick={() => signOut()}>Logout</Button>
          </>
        )}
        {!isLoading && !session?.user && (
          <>
            <ModeToggle />
            <Button onClick={() => signIn()}>Sign in</Button>
          </>
        )}
        {isLoading && <div className="flex items-center gap-4"></div>}
      </div>
    </header>
  );
}
