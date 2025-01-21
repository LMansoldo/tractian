import { useFilters } from "@context";

const SearchInput = () => {
	const { dispatch } = useFilters()

	const applyFilter = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		dispatch({ type: 'SET_TEXT', payload: e.target.value });
  };

		return (
			<input
				type="text"
				placeholder="Buscar por Ativo ou Local"
				onChange={(e) => applyFilter(e)}
			/>
		)
}

export default SearchInput