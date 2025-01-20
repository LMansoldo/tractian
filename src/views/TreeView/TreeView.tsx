import { useSelector } from 'react-redux'

import { ItemsTree } from '@components'
import type { TreeState } from '@types'

const TreeViewMenu = () => {
	const { items, isLoading, error } = useSelector(
		(state: TreeState) => state.tree,
	)

	if (isLoading) {
		return <p>Loading menu...</p>
	}

	if (error) {
		return <p>Error loading menu: {error}</p>
	}

	if (items) {
		return <ItemsTree items={items} />
	}

	return <>Select a company</>
}

export default TreeViewMenu
