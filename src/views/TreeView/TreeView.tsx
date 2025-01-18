import { useSelector } from 'react-redux';

import type { TreeState } from '../../types';

const TreeViewMenu = () => {
  const { items, isLoading, error } = useSelector((state: TreeState) => state.tree);

  if (isLoading) {
    return <p>Loading menu...</p>;
  }

  if (error) {
    return <p>Error loading menu: {error}</p>;
  }

  return (
    <ul>
        {items && items.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
    </ul>
  );
};

export default TreeViewMenu;