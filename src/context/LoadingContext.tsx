// context/LoadingContext.tsx
'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const LoadingContext = createContext<{
  loading: boolean;
}>({
  loading: false,
});

export const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setLoading(true);

    // 최소 로딩 지속 시간 설정 (UX 보장)
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500); // 여기서 500ms 정도 유지

    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <LoadingContext.Provider value={{ loading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);
