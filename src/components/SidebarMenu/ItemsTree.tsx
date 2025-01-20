import React from 'react'
import TreeNode from './TreeNode'

import type { Item, TreeNodeProps } from '@types'

const ItemTree: React.FC<{ items: Item }> = ({ items }) => {
	const organizeTree = ({ assets, locations }: Item): TreeNodeProps[] => {
		const map = new Map<string, TreeNodeProps>()

		locations.forEach((location) => {
			map.set(location.id, {
				id: location.id,
				label: location.name,
				isLocation: true,
				isSubLocation: !!location.parentId,
				isAsset: false,
				isSubAsset: false,
				isComponent: false,
				children: [],
			})
		})

		assets.forEach((asset) => {
			map.set(asset.id, {
				id: asset.id,
				label: asset.name,
				sensorType: asset.sensorType,
				status: asset.status,
				isLocation: false,
				isSubLocation: false,
				isAsset: !asset.parentId && !!asset.locationId,
				isSubAsset: !!asset.parentId,
				isComponent: !!asset.sensorType,
				children: [],
			})
		})

		const result: TreeNodeProps[] = []

		locations.forEach((location) => {
			if (location.parentId) {
				const parent = map.get(location.parentId)
				if (parent) {
					parent.children!.push(map.get(location.id)!)
				}
			} else {
				result.push(map.get(location.id)!)
			}
		})

		assets.forEach((asset) => {
			if (asset.locationId) {
				const parent = map.get(asset.locationId)
				if (parent) {
					parent.children!.push(map.get(asset.id)!)
				}
			} else if (asset.parentId) {
				const parent = map.get(asset.parentId)
				if (parent) {
					parent.children!.push(map.get(asset.id)!)
				}
			} else {
				result.push(map.get(asset.id)!)
			}
		})

		return result
	}

	const organizedItems = organizeTree(items)

	return (
		<ul className="items-tree flex flex-col items-start justify-start relative">
			{organizedItems.map((item) => (
				<TreeNode key={item.id} item={item} />
			))}
		</ul>
	)
}

export default ItemTree
