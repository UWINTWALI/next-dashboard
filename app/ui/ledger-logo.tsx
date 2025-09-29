import { DocumentTextIcon  } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';

export default function LedgerLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <DocumentTextIcon  className="h-12 w-12 text-yellow-400" />
      <p className="ml-2 text-[24px]">Ledger</p>
    </div>
  );
}
