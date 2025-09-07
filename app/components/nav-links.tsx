'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Brain, History, Home, PlusCircle } from "lucide-react";

export function NavLinks() {
  const pathname = usePathname();

  const links = [
        { label: 'Home', icon: Home, href: '/' },
        { label: 'Add', icon: PlusCircle, href: '/add' },
        { label: 'History', icon: History, href: '/history' },
        { label: 'AI', icon: Brain, href: '/advisor' },
      ];

  return (
    <div className="fixed inset-x-0 bottom-0 flex flex-row align-middle justify-center bg-white border-t py-2">
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.label}
            href={link.href}
            className={`flex flex-col items-center gap-1 
              whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive
              h-auto py-2 px-3 mx-4 hover:bg-sky-100 hover:text-blue-600 ${
              pathname === link.href ? 'bg-sky-100 text-blue-600' : ''
            }`}
            >
            <LinkIcon className="h-5 w-5" />
            <span className="text-xs">{link.label}</span>
          </Link>
        );
      })}
    </div>
  );
}