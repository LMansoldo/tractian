import { useState } from "react"
import { useFilters } from '@context'
import { Button } from '@components'
import { ExclamationIcon, LightningIcon } from '@assets'

const Filters = () => {
	const [ hovered, setHovered ] = useState({ energy: false, critical: false })
	const { filters, dispatch } = useFilters()

	const toggleFilter = (key: 'TOGGLE_ENERGY' | 'TOGGLE_CRITICAL') => {
		dispatch({ type: key })
	}

	const getIconColor = (isActive: boolean, filter: boolean | undefined): string => {
		if (isActive || filter) return 'white'
		return '#2188FF'
	}

	return (
		<div className="flex flex-row gap-2 items-center">
			<Button
				onClick={() => toggleFilter('TOGGLE_ENERGY')}
				onMouseEnter={() => setHovered((hovered) => ({...hovered, energy: true}))}
				onMouseLeave={() => setHovered((hovered) => ({...hovered, energy: false}))}
				isSelected={filters.energy}
				size="medium"
				type="secondary"
			>
				<LightningIcon color={getIconColor(hovered.energy, filters.energy)}/>
				Sensor de Energia
			</Button>
			<Button
				onClick={() => toggleFilter('TOGGLE_CRITICAL')}
				onMouseEnter={() => setHovered((hovered) => ({...hovered, critical: true}))}
				onMouseLeave={() => setHovered((hovered) => ({...hovered, critical: false}))}
				isSelected={filters.critical}
				size="medium"
				type="secondary"
			>
				<ExclamationIcon color={getIconColor(hovered.critical, filters.critical)} />
				Crítico
			</Button>
		</div>
	)
}

export default Filters
