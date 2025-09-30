import LedgerLogo from "../ui/ledger-logo";
import LoginForm from "../ui/login-form";
import { Suspense, useActionState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage(){

    return(
        <main className="flex items-center justify-center md:h-screen" >
            <div className="relative  mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4" >
                <div className="flex h-20 w-full items-end rounded-lg bg-bg-surface p-3 md:h-36" >
                    <div className="w-32  text-white md:w-36" >
                        <LedgerLogo />
                    </div>
                </div>
                <Suspense>
                    <LoginForm />
                </Suspense>

            </div>

        </main>
    )
}