import { useCallback, useEffect, useRef } from 'react';

export default function useIsMounted() {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  const getisMoutend = useCallback(() => isMounted.current, []);

  return getisMoutend;
}
