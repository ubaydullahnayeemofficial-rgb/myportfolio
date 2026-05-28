import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";

export type BreadcrumbItem = {
  name: string;
  nameBn?: string;
  href: string;
};

/**
 * Accessible breadcrumb trail with structured-data baked in.
 * Always renders a Home root and supports a sequence of inner crumbs.
 */
export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const all: BreadcrumbItem[] = [
    { name: "Home", nameBn: "হোম", href: "/" },
    ...items,
  ];

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(all.map((i) => ({ name: i.name, href: i.href })))}
      />
      <nav
        aria-label="Breadcrumb"
        className="container-page mt-6 mb-4 text-xs tracking-[0.18em] uppercase text-ink-muted"
      >
        <ol className="flex items-center flex-wrap gap-1.5">
          {all.map((item, i) => {
            const last = i === all.length - 1;
            return (
              <li key={item.href} className="flex items-center gap-1.5">
                {i === 0 ? (
                  <Link
                    href={item.href}
                    aria-label="Home"
                    className="hover:text-emerald transition-colors inline-flex items-center"
                  >
                    <Home size={11} />
                    <span className="sr-only">
                      <span data-lang="en">{item.name}</span>
                      <span data-lang="bn">{item.nameBn ?? item.name}</span>
                    </span>
                  </Link>
                ) : last ? (
                  <span aria-current="page" className="text-emerald">
                    <span data-lang="en">{item.name}</span>
                    <span data-lang="bn" className="font-bn">
                      {item.nameBn ?? item.name}
                    </span>
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="hover:text-emerald transition-colors"
                  >
                    <span data-lang="en">{item.name}</span>
                    <span data-lang="bn" className="font-bn">
                      {item.nameBn ?? item.name}
                    </span>
                  </Link>
                )}
                {!last && (
                  <ChevronRight size={11} className="opacity-50" aria-hidden />
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
