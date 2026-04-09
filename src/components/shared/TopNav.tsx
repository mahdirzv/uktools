"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const navLinks = [
  { href: "/moving", label: "Moving" },
  { href: "/claim", label: "Claim" },
  { href: "/freelance", label: "Freelance" },
  { href: "/company", label: "Company" },
  { href: "/subscriptions", label: "Subscriptions" },
  { href: "/crime", label: "Crime" },
  { href: "/parking", label: "Parking" },
  { href: "/flood", label: "Flood" },
  { href: "/epc", label: "EPC" },
]

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function TopNav() {
  const pathname = usePathname()

  return (
    <nav className="min-w-0 flex-1 overflow-x-auto">
      <div className="flex min-w-max items-center gap-2 text-sm text-muted-foreground">
        {navLinks.map((link) => {
          const active = isActive(pathname, link.href)
          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={active ? "page" : undefined}
              className={[
                "rounded-md px-2.5 py-1 transition-colors",
                active
                  ? "bg-muted text-foreground font-semibold"
                  : "hover:text-foreground",
              ].join(" ")}
            >
              {link.label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
