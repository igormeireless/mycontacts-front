import { useEffect, useRef, useState } from 'react';

export default function useAnimatedUnmount(visible) {
  const [shouldRender, setShouldRender] = useState(visible);

  const animatedElementRef = useRef(null);

  useEffect(() => {
    if (visible) {
      setShouldRender(true);
    }

    function handleAnimetionEnd() {
      setShouldRender(false);
    }

    const elementRef = animatedElementRef.current;
    if (!visible && elementRef) {
      elementRef.addEventListener('animationend', handleAnimetionEnd);
    }

    return () => {
      if (elementRef) {
        elementRef.removeEventListener('animationend', handleAnimetionEnd);
      }
    };
  }, [visible]);

  return {
    shouldRender,
    animatedElementRef,
  };
}
