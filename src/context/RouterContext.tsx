import React, { createContext, useContext, useState, useEffect } from "react";

interface RouterContextProps {
  path: string;
  navigate: (to: string) => void;
}

const RouterContext = createContext<RouterContextProps | undefined>(undefined);

export function RouterProvider({ children }: { children: React.ReactNode }) {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setPath(window.location.pathname);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = (to: string) => {
    if (window.location.pathname !== to) {
      window.history.pushState({}, "", to);
      setPath(to);
      window.dispatchEvent(new PopStateEvent("popstate"));
    }
    // Scroll to top of the window
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <RouterContext.Provider value={{ path, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error("useRouter must be used within a RouterProvider");
  }
  return context;
}
