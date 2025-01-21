const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchTreeItems = async (mainId: string) => {
	try {
		await delay(3000); 
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
