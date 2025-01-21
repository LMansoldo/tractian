import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTreeItemsThunk, fetchCompanyDataThunk, AppDispatch } from '@store'
import { Filters, Header, Button, SearchInput } from '@components'
import { ReactNode } from 'react'
import { CompanyIcon } from '@assets'

import type { CompanyState, Company } from '@types'

const NavigationComponent = ({
	data,
	dispatch,
}: {
	data: Company[]
	dispatch: AppDispatch
}) => {
	return (
		data &&
		data.map(({ id, name }) => (
			<Button onClick={() => dispatch(fetchTreeItemsThunk(id))} size="small" >
				<CompanyIcon />
				{name}
			</Button>
		))
	)
}

const MainLayout = ({ children }: { children: ReactNode }) => {
	const dispatch = useDispatch<AppDispatch>()
	const { data, isLoading, error } = useSelector(
		(state: CompanyState) => state.company || {},
	)

	useEffect(() => {
		const handleFetch = async () => {
			if (!data) {
				await dispatch(fetchCompanyDataThunk())
			}
		}

		handleFetch()
	}, [data, dispatch])

	if (isLoading) {
		return <p>Loading...</p>
	}

	if (error) {
		return <p>Error: {error}</p>
	}

	if (data) {
		return (
			<>
				<Header>
					<NavigationComponent data={data} dispatch={dispatch} />
				</Header>
				<main className="border solid rounded-md shadow-lg bg-white p-4 m-4 h-[calc(100vh-100px)]">
					<div className="flex flex-row justify-end items-center pb-4">
						<SearchInput />
						<Filters />
					</div>
					<div className="grid grid-cols-[30vw_1fr] w-full gap-2">
						{children}
					</div>
				</main>
			</>
		)
	}
}

export default MainLayout
