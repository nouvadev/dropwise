import { useState, useEffect } from 'react'
import { useAuthStore } from '@/store/authStore'

/**
 * A custom hook to determine if the Zustand store has been rehydrated from persistence.
 * This is crucial for client-side rendering of protected routes.
 */
export const useIsHydrated = () => {
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    // onFinishHydration listener is the most reliable way to know
    // when the store is ready.
    const unsubFinish = useAuthStore.persist.onFinishHydration(() => 
      setHydrated(true)
    );

    // Also set state to true if the store is already hydrated.
    // This handles cases where the component mounts after hydration is complete.
    setHydrated(useAuthStore.persist.hasHydrated());

    return () => {
      unsubFinish();
    };
  }, []);

  return hydrated;
}; 