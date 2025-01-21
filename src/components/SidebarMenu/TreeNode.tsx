import React, { useState, useEffect } from 'react'
import { useFilters } from '@context'
import { useDispatch } from 'react-redux';
import { AssetIcon, ComponentIcon, LocationIcon, ChevronDownIcon, EllipseIcon, EllipseGreenIcon, BoltIcon } from '@assets'
import { setSelectedItem } from '@store';

import type { TreeNodeProps } from '@types'
const TreeNode: React.FC<{ item: TreeNodeProps }> = ({ item }) => {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { filters } = useFilters();

  const matchesFilters = (node: TreeNodeProps): boolean => {
    if (filters.text && !node.label.toLowerCase().includes(filters.text.toLowerCase())) return false;
    if (filters.energy && node.sensorType !== 'energy') return false;
    if (filters.critical && node.status !== 'alert') return false;
    return true;
  };

  const findComponents = (node: TreeNodeProps): TreeNodeProps[] => {
    const result: TreeNodeProps[] = [];
    if (node.isComponent) result.push(node);
    node.children?.forEach((child) => result.push(...findComponents(child)));
    return result;
  };

  const findLocations = (node: TreeNodeProps): TreeNodeProps[] => {
    const result: TreeNodeProps[] = [];
    if (node.isLocation) result.push(node);
    node.children?.forEach((child) => result.push(...findLocations(child)));
    return result;
  };

  const findAssets = (node: TreeNodeProps): TreeNodeProps[] => {
    const result: TreeNodeProps[] = [];
    if (node.isAsset) result.push(node);
    node.children?.forEach((child) => result.push(...findAssets(child)));
    return result;
  };

  const findByCriteria = (node: TreeNodeProps, criteria: (node: TreeNodeProps) => boolean): TreeNodeProps[] => {
    const result: TreeNodeProps[] = [];
    if (criteria(node)) result.push(node);
    node.children?.forEach((child) => result.push(...findByCriteria(child, criteria)));
    return result;
  };

  const isInPath = (node: TreeNodeProps): boolean =>
    matchesFilters(node) || node.children?.some(isInPath) || false;

  const filteredChildren = item.children?.filter(isInPath) || [];

	useEffect(() => {
    if (filters.text && filters.text.length > 3) {
      return setExpanded(true)
    }
		return setExpanded(false)
  }, [filters.text])

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

  const getClassName = () => {
    return item.isLocation ||
      item.isSubLocation ||
      item.isAsset ||
      item.isSubAsset ||
      item.isComponent
      ? 'pl-4 relative'
      : '';
  };

  return (
    <li className="flex flex-col w-full items-start">
      <button
        onClick={handleItemClick}
        className=" hover:bg-blue-600 hover:text-white hover:fill-white py-1 w-full"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="flex gap-1 items-center text-start shrink-0 w-full pl-2">
          {expanded && filteredChildren.length > 0 ? <ChevronDownIcon /> : <div className="w-[8px]" />}
          {getIcon()}
          {item.label}
          {item.sensorType === 'energy' && <BoltIcon />}
          {item.status === 'alert' && <EllipseIcon />}
					{item.status === 'operating' && <EllipseGreenIcon />}
        </div>
      </button>
      {expanded && (
        <ul
          className={`${getClassName()} overflow-hidden w-full transition-all duration-1000 ease-in-out max-h-0 ${
            expanded ? 'max-h-screen' : ''
          }`}
        >
          {filteredChildren.map((child) => (
            <TreeNode key={child.id} item={child} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default TreeNode;