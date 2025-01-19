
import { useFilters } from "../../context/Filters/FiltersContext";
import { useSelector } from 'react-redux';

import { ItemsTree } from '../../components';
import type { TreeState } from '../../types';

const TreeViewMenu = () => {
    const { dispatch } = useFilters();
  
  const { items, isLoading, error } = useSelector((state: TreeState) => state.tree);
    
  const toggleFilter = (key: "TOGGLE_ENERGY" | "TOGGLE_CRITICAL") => {
    dispatch({ type: key });
  };

  if (isLoading) {
    return <p>Loading menu...</p>;
  }

  if (error) {
    return <p>Error loading menu: {error}</p>;
  }

  if (items) {
    return (
      <>
        <button type="button" onClick={() => toggleFilter('TOGGLE_ENERGY')}>
          Sensor de Energia
        </button>
        <button type="button" onClick={() => toggleFilter('TOGGLE_CRITICAL')}>
          Crítico
        </button>
        <ItemsTree items={items} />
      </>
    );
  }

  return <>Select a company</>

};

export default TreeViewMenu;