import { useCallback, useState } from 'react';

export default function useAnimatedList(initialValue = []) {
  const [items, setItems] = useState(initialValue);
  const [peddingRemoveItemsIds, setPeddingRemoveItemsIds] = useState([]);

  const handleRemoveItem = useCallback((id) => {
    setPeddingRemoveItemsIds(
      (prevState) => [...prevState, id],
    );
  }, []);

  const handleAnimationEnd = useCallback((id) => {
    setItems((prevState) => prevState.filter(
      (item) => item.id !== id,
    ));
    setPeddingRemoveItemsIds((prevState) => prevState.filter(
      (itemId) => itemId !== id,
    ));
  }, []);

  const randerList = useCallback((renderItem) => (
    items.map((item) => renderItem(item, {
      isLeaving: peddingRemoveItemsIds.includes(item.id),
    }))
  ), [items, peddingRemoveItemsIds]);

  return {
    items,
    setItems,
    handleRemoveItem,
    handleAnimationEnd,
    randerList,
  };
}
