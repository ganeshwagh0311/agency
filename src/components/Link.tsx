import React from "react";
import { useRouter } from "../context/RouterContext";

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
}

export function Link({ to, children, onClick, ...props }: LinkProps) {
  const { navigate } = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // If it's an external link, let it be handled normally
    if (to.startsWith("http://") || to.startsWith("https://") || to.startsWith("mailto:") || to.startsWith("tel:")) {
      if (onClick) onClick(e);
      return;
    }

    e.preventDefault();

    // Handle hash links
    if (to.startsWith("#")) {
      if (window.location.pathname === "/") {
        const el = document.getElementById(to.substring(1));
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        // Navigate to homepage first
        navigate("/");
        // Wait for route update, then scroll
        setTimeout(() => {
          const el = document.getElementById(to.substring(1));
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          }
        }, 150);
      }
    } else {
      // Normal routing
      navigate(to);
    }

    if (onClick) onClick(e);
  };

  return (
    <a href={to} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
