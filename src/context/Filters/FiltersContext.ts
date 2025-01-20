import React, { createContext, useContext } from 'react'

import type { Filters } from '@types'
import type { FilterAction } from '@context'

import { initialFilters } from '@context'

const FiltersContext = createContext<{
	filters: Filters
	dispatch: React.Dispatch<FilterAction>
}>({ filters: initialFilters, dispatch: () => null })

const useFilters = () => useContext(FiltersContext)

export { useFilters, FiltersContext }
