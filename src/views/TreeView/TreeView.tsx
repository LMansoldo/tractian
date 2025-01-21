import { useSelector } from 'react-redux'

import { ItemsTree, Skeleton } from '@components'
import type { TreeState } from '@types'

const TreeViewMenu = () => {
	const { items, isLoading, error } = useSelector(
		(state: TreeState) => state.tree,
	)

	if (isLoading) {
		return (
			<div className="p-4">
				<div className="flex flex-col gap-2">

					<Skeleton className="h-6 w-full" />
					<Skeleton className="h-6 w-full" />
					<Skeleton className="h-6 w-full" />
					<Skeleton className="h-6 w-full" />
					<Skeleton className="h-6 w-full" />
					<Skeleton className="h-6 w-full" />
					<Skeleton className="h-6 w-full" />
					<Skeleton className="h-6 w-full" />
					<Skeleton className="h-6 w-full" />
					<Skeleton className="h-6 w-full" />
				</div>
			</div>
		);
	}

	if (error) {
		return <p>Error loading menu: {error}</p>
	}

	if (items) {
		return <ItemsTree items={items} />
	}

	return <div className="p-4 text-center text-slate-400 text-sm">Selecione uma Unidade</div>
}

export default TreeViewMenu
