export const fetchTreeItems = async (mainId: string) => {
	try {
		const response = await fetch(`http://localhost:8080/${mainId}`)

		if (!response.ok) throw new Error('Failed to fetch menu items')
		const data = await response.json()
		return data
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(error.message || 'Unexpected error')
		} else {
			throw new Error('Unexpected error')
		}
	}
}
