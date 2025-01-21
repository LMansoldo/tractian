import React from 'react'
import TreeNode from './TreeNode'

import type { Item, TreeNodeProps } from '@types'

const ItemTree: React.FC<{ items: Item }> = ({ items }) => {
  const organizeTree = ({ assets, locations }: Item): TreeNodeProps[] => {
    const map = new Map<string, TreeNodeProps>();

    const createNode = (id: string, label: string, isLocation: boolean, isSubLocation: boolean, isAsset: boolean, isSubAsset: boolean, isComponent: boolean, sensorType?: string, status?: string): TreeNodeProps => ({
      id,
      label,
      isLocation,
      isSubLocation,
      isAsset,
      isSubAsset,
      isComponent,
      sensorType,
      status,
      children: [],
    });

    locations.forEach((location) => {
      map.set(location.id, createNode(location.id, location.name, true, !!location.parentId, false, false, false));
    });

    assets.forEach((asset) => {
      map.set(asset.id, createNode(asset.id, asset.name, false, false, !asset.parentId && !!asset.locationId, !!asset.parentId, !!asset.sensorType, asset.sensorType, asset.status));
    });

    const result: TreeNodeProps[] = [];

    const addToParent = (id: string, parentId: string | null) => {
      if (parentId) {
        const parent = map.get(parentId);
        if (parent) {
          parent.children!.push(map.get(id)!);
        }
      } else {
        result.push(map.get(id)!);
      }
    };

    locations.forEach((location) => addToParent(location.id, location.parentId));
    assets.forEach((asset) => addToParent(asset.id, asset.locationId || asset.parentId));

    const hasComponentInChildren = (item: TreeNodeProps): boolean => item.isComponent || (item.children?.some(hasComponentInChildren) ?? false);

    return result.filter(hasComponentInChildren);
  };

  const organizedItems = organizeTree(items);

  return (
    <ul className="pl-4 flex w-full flex-col items-start justify-start relative max-h-full h-full overflow-y-auto">
      {organizedItems.map((item) => (
        <TreeNode key={item.id} item={item} />
      ))}
    </ul>
  );
};

export default ItemTree;