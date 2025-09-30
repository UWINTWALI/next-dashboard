'use client'
import LedgerLogo from "@/app/ui/ledger-logo";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { lusitana } from "@/app/ui/fonts";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Page() {
  const fullText = "Welcome to ";
  const highlightedText = "Ledger";
  const remainingText = "! Effortlessly track, manage, and organize all your invoices in one place. Get started now and take your business to the next level.";
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const totalText = fullText + highlightedText + remainingText;
    const interval = setInterval(() => {
      setDisplayedText(totalText.slice(0, index + 1));
      index++;
      if (index === totalText.length) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  // Split text for bold "Ledger"
  const beforeBold = fullText;
  const bold = highlightedText;
  const afterBold = displayedText.slice(beforeBold.length + bold.length);

  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-bg-surface p-4 md:h-52">
        <LedgerLogo />
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          {/* Container fixes button shifting */}
          <div className="h-48 md:h-64">
            <p
              className={`${lusitana.className} text-xl text-gray-800 md:text-3xl md:leading-normal`}
            >
              {beforeBold}
              <strong>{bold}</strong>
              {afterBold}
            </p>
          </div>

          <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-bg-surface px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-500 md:text-base"
          >
            <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>

        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          <Image
            src="/hero-desktop.png"
            width={1000}
            height={760}
            className="hidden md:block"
            alt="Screenshot of the dashboard project showing the desktop version"
          />
          <Image
            src="/hero-mobile.png"
            width={560}
            height={620}
            className="block md:hidden"
            alt="The screenshot of the dashboard project on Mobile version"
          />
        </div>
      </div>
    </main>
  );
}
