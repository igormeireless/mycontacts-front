import {
  useCallback, useRef, useState, createRef, useEffect,
} from 'react';

export default function useAnimatedList(initialValue = []) {
  const [items, setItems] = useState(initialValue);
  const [peddingRemoveItemsIds, setPeddingRemoveItemsIds] = useState([]);

  const animatedRefs = useRef(new Map());
  const animationEndListeners = useRef(new Map());

  const handleAnimationEnd = useCallback((itemId) => {
    const removeListener = animationEndListeners.current.get(itemId);
    removeListener();

    animatedRefs.current.delete(itemId);
    animationEndListeners.current.delete(itemId);

    setItems((prevState) => prevState.filter(
      (item) => item.id !== itemId,
    ));
    setPeddingRemoveItemsIds((prevState) => prevState.filter(
      (id) => id !== itemId,
    ));
  }, []);

  useEffect(() => {
    peddingRemoveItemsIds.forEach((itemId) => {
      const animatedRef = animatedRefs.current.get(itemId);
      const animatedElement = animatedRef?.current;
      const alreadyHasListener = animationEndListeners.current.has(itemId);

      if (animatedElement && !alreadyHasListener) {
        const onAnimatedEnd = () => handleAnimationEnd(itemId);
        const removeListener = () => {
          animatedElement.removeEventListener('animationend', onAnimatedEnd);
        };

        animatedElement.addEventListener('animationend', onAnimatedEnd);
        animationEndListeners.current.set(itemId, removeListener);
      }
    });
  }, [peddingRemoveItemsIds, handleAnimationEnd]);

  useEffect(() => {
    const removeListeners = animationEndListeners.current;
    return () => {
      removeListeners.forEach((removeListener) => removeListener());
    };
  }, []);

  const handleRemoveItem = useCallback((id) => {
    setPeddingRemoveItemsIds(
      (prevState) => [...prevState, id],
    );
  }, []);

  const getAnimatedRef = useCallback((itemId) => {
    let animatedRef = animatedRefs.current.get(itemId);

    if (!animatedRef) {
      animatedRef = createRef();
      animatedRefs.current.set(itemId, animatedRef);
    }

    return animatedRef;
  }, []);

  const randerList = useCallback((renderItem) => (
    items.map((item) => {
      const isLeaving = peddingRemoveItemsIds.includes(item.id);
      const animatedRef = getAnimatedRef(item.id);

      return renderItem(item, { isLeaving, animatedRef });
    })
  ), [items, peddingRemoveItemsIds, getAnimatedRef]);

  return {
    items,
    setItems,
    handleRemoveItem,
    randerList,
  };
}
