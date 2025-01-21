import { useSelector } from 'react-redux'

import { MainScreen } from '@components'

import { RootState } from '@store';

const MainView = () => {
	const { selectedItem } = useSelector((state: RootState) => state.selection);

	return <MainScreen selectedItem={selectedItem} />

}

export default MainView
