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
				<div className="flex flex-col gap-4">

					<Skeleton className="h-6 w-1/3" />
					<Skeleton className="h-8 w-full" />
	
					<div className="flex gap-2">
						<Skeleton className="h-10 w-20" />
						<Skeleton className="h-10 w-20" />
						<Skeleton className="h-10 w-20" />
					</div>

					<div className="grid grid-cols-[30vw_1fr] gap-2 mt-4">
						<Skeleton className="h-[300px] w-full" />
						<Skeleton className="h-[300px] w-full" />
					</div>
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
