import React, { useState } from 'react'
import { useFilters } from '@context'

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
		<li className="flex flex-col items-start">
			<button onClick={() => setExpanded(!expanded)}>{item.label}</button>
			<ul className={`${getClassName()}`}>
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
