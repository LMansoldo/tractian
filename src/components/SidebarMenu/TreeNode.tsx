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

	const ChevronIcon = () => expanded && item.children.length ? <ChevronDownIcon /> : ''

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
		<li className="flex flex-col items-start w-full">
			<button onClick={() => setExpanded(!expanded)} className="flex gap-2 p-1 items-center">
				{ChevronIcon()}
				{getIcon()}
				{item.label}
			</button>
			<ul className={`${getClassName()} overflow-hidden transition-all duration-1000 ease-in-out max-h-0 ${expanded ? 'max-h-screen' : ''} w-full`}>
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
