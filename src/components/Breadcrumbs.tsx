import React from "react";
import { Link } from "./Link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  name: string;
  item: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  if (!items || items.length === 0) return null;

  return (
    <nav 
      aria-label="Breadcrumbs" 
      className="inline-flex items-center gap-2 bg-slate-100/50 dark:bg-white/[0.02] backdrop-blur-md border border-slate-200 dark:border-white/[0.05] rounded-xl px-4 py-2.5 text-xs font-mono text-slate-500 dark:text-slate-400 my-4 shadow-sm"
    >
      <Link to="/" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
        Home
      </Link>
      {items.map((crumb, index) => {
        const isLast = index === items.length - 1;
        // Skip rendering home again if it was explicitly added as first item
        if (crumb.name.toLowerCase() === "home") return null;

        // Parse path from absolute URL
        let relativePath = crumb.item;
        try {
          if (crumb.item.startsWith("http")) {
            const url = new URL(crumb.item);
            relativePath = url.pathname;
          }
        } catch (e) {
          // Fallback to original
        }

        return (
          <React.Fragment key={index}>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600 flex-shrink-0" />
            {isLast ? (
              <span className="text-slate-800 dark:text-slate-200 font-semibold truncate max-w-[150px] sm:max-w-xs">
                {crumb.name}
              </span>
            ) : (
              <Link 
                to={relativePath} 
                className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
              >
                {crumb.name}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
