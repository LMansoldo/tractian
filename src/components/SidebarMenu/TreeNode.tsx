import React, { useState } from 'react'
import { useFilters } from '@context'
import { AssetIcon, ComponentIcon, LocationIcon, ChevronDownIcon } from '@assets'

import type { TreeNodeProps } from '@types'

const TreeNode: React.FC<{ item: TreeNodeProps }> = ({ item }) => {
	const [expanded, setExpanded] = useState(false)
	const { filters } = useFilters()

	const matchesFilters = () => {
		if (
			filters.text &&
			!item.label.toLowerCase().includes(filters.text.toLowerCase())
		) {
			return false
		}

		return true
	}

	if (!matchesFilters()) return null



	const getIcon = () => {
		if (item.isLocation || item.isSubLocation) return <LocationIcon />
		if (item.isAsset && item.children.length) return <AssetIcon />
		return <ComponentIcon />
	}

	const ChevronIcon = () => expanded && item.children.length ? <ChevronDownIcon /> : <div className="w-[10px] " />

	const getClassName = () => {
		return item.isLocation ||
			item.isSubLocation ||
			item.isAsset ||
			item.isSubAsset ||
			item.isComponent
			? 'left-9 relative'
			: ''
	}

	return (
		<li className="flex flex-col items-start w-full after:border-l-[1px]  after:border-gray-300 after:solid after:absolute after:left-1 after:h-full">
			<button onClick={() => setExpanded(!expanded)} className="flex gap-1 p-[2px] items-center hover:bg-blue-600 hover:text-white hover:fill-white">
				{ChevronIcon()}
				{getIcon()}
				{item.label}
			</button>
			<ul className={`${getClassName()} relative overflow-hidden transition-all duration-1000 ease-in-out max-h-0 ${expanded ? 'max-h-screen' : ''} w-full`}>
				{expanded && item.children && (
					<>
						{item.children.map((child) => (
							<TreeNode key={child.id} item={child} />
						))}
					</>
				)}
			</ul>
		</li>
	)
}

export default TreeNode
