import { useSelector } from 'react-redux'

import { MainScreen } from '@components'

const MainView = () => {
	const { selectedItem } = useSelector((state) => state?.selection);

	return <MainScreen selectedItem={selectedItem} />

}

export default MainView
