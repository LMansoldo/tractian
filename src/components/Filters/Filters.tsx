import { useFilters } from '@context'
import { Button } from '@components'
import { ExclamationIcon, LightningIcon } from '@assets'

const Filters = () => {
	const { dispatch } = useFilters()

	const toggleFilter = (key: 'TOGGLE_ENERGY' | 'TOGGLE_CRITICAL') => {
		dispatch({ type: key })
	}

	return (
		<div className="flex flex-row gap-2 items-center">
			<Button
				onClick={() => toggleFilter('TOGGLE_ENERGY')}
				size="medium"
				type="secondary"
			>
				<ExclamationIcon />
				Sensor de Energia
			</Button>
			<Button
				onClick={() => toggleFilter('TOGGLE_CRITICAL')}
				size="medium"
				type="secondary"
			>
				<LightningIcon />
				Crítico
			</Button>
		</div>
	)
}

export default Filters
