import React, { useState } from 'react'
import { useFilters } from '@context'
import { useDispatch } from 'react-redux';
import { AssetIcon, ComponentIcon, LocationIcon, ChevronDownIcon, EllipseIcon, BoltIcon } from '@assets'
import { setSelectedItem } from '@store';

import type { TreeNodeProps } from '@types'

const TreeNode: React.FC<{ item: TreeNodeProps }> = ({ item }) => {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { filters } = useFilters();

  const matchesFilters = (node: TreeNodeProps): boolean => {
    if (node.isComponent) {
      if (filters.text && !node.label.toLowerCase().includes(filters.text.toLowerCase())) return false;
      if (filters.energy && node.sensorType !== 'energy') return false;
      if (filters.critical && node.status !== 'alert') return false;
      return true;
    }
    return false;
  };

  const isInPath = (node: TreeNodeProps): boolean => matchesFilters(node) || node.children?.some(isInPath) || false;

  const filteredChildren = item.children?.filter(isInPath) || [];

  if (!isInPath(item)) return null;

  const getIcon = () => {
    if (item.isLocation || item.isSubLocation) return <LocationIcon color={hovered ? 'white' : '#2188FF'} />;
    if (item.isComponent && item.children.length === 0) return <ComponentIcon color={hovered ? 'white' : '#2188FF'} />;
    return <AssetIcon color={hovered ? 'white' : '#2188FF'} />;
  };

  const handleItemClick = () => {
    if (item.isComponent && item.children.length === 0) {
      dispatch(setSelectedItem(item));
    } else {
      setExpanded(!expanded);
    }
  };

  return (
    <li className="flex flex-col w-full items-start after:border-l-[1px] after:border-gray-300 after:solid after:absolute after:left-1 after:h-full">
      <button
        onClick={handleItemClick}
        className="flex gap-1 p-[2px] items-center hover:bg-blue-600 hover:text-white hover:fill-white"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {expanded && filteredChildren.length > 0 ? <ChevronDownIcon /> : <div className="w-[10px]" />}
        {getIcon()}
        {item.label}
        {item.sensorType === 'energy' && <BoltIcon />}
        {item.status === 'alert' && <EllipseIcon />}
      </button>
      {expanded && (
        <ul className="relative overflow-hidden transition-all duration-1000 ease-in-out max-h-0 max-h-screen w-full">
          {filteredChildren.map((child) => (
            <TreeNode key={child.id} item={child} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default TreeNode;