export type Company = {
	id: string
	name: string
}

export interface CompanyState {
	company: {
		data: Company[] | null
		isLoading: boolean
		error: string | null
	}
}

export type Location = {
	id: string
	name: string
	parentId: string
}

export type Asset = {
	id: string
	name: string
	parentId: string | null
	sensorId: string
	sensorType?: string
	status?: string
	gatewayId: string
	locationId: string | null
	children?: Asset[]
}

export interface TreeState {
	tree: {
		items: Item | null
		isLoading: boolean
		error: string | null
	}
}

export interface Item {
	assets: Asset[]
	locations: Location[]
}

export interface TreeNodeProps {
	id: string
	label: string
	sensorType?: string
	status?: string
	isLocation: boolean
	isSubLocation: boolean
	isAsset: boolean
	isSubAsset: boolean
	isComponent: boolean
	children: TreeNodeProps[]
}

export type SelectionProps = {
	selectedItem: TreeNodeProps[]
}

export interface Filters {
	text?: string
	energy?: boolean
	critical?: boolean
}
