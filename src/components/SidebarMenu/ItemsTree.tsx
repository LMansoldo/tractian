import React, { useState } from "react";
import TreeNode from "./TreeNode";

import type { Item, Filters, TreeNodeProps } from "../../types";

const ItemTree: React.FC<{ items: Item }> = ({ items }) => {
  const [filters, setFilters] = useState<Filters>({
    text: "",
    energy: false,
    critical: false,
  });


  const applyFilter = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, filterType: keyof Filters) => {
    setFilters({ ...filters, [filterType]: e.target.value });
  };

  const organizeTree = ({ assets, locations }: Item): TreeNodeProps[] => {
    const map = new Map<string, TreeNodeProps>();
  
    locations.forEach((location) => {
      map.set(location.id, {
        id: location.id,
        label: location.name,
        children: [],
      });
    });
  
    assets.forEach((asset) => {
      map.set(asset.id, {
        id: asset.id,
        label: asset.name,
        children: [],
      });
    });
  
    const result: TreeNodeProps[] = [];
  
    locations.forEach((location) => {
      if (location.parentId) {
        const parent = map.get(location.parentId);
        if (parent) {
          parent.children!.push(map.get(location.id)!);
        }
      } else {
        result.push(map.get(location.id)!);
      }
    });
  
    assets.forEach((asset) => {
      if (asset.locationId) {
        const parent = map.get(asset.locationId);
        if (parent) {
          parent.children!.push(map.get(asset.id)!);
        }
      } else if (asset.parentId) {
        const parent = map.get(asset.parentId);
        if (parent) {
          parent.children!.push(map.get(asset.id)!);
        }
      } else {
        result.push(map.get(asset.id)!);
      }
    });
  
    return result;
  };

  const organizedItems = organizeTree(items);

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Search by name"
          onChange={(e) => applyFilter(e, "text")}
        />

      </div>
      <div>
        {organizedItems.map((item) => (
          <TreeNode key={item.id} item={item} filters={filters} />
        ))}
      </div>
    </div>
  );
};

export default ItemTree;