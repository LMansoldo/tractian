const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchCompanyData = async () => {
    try {
        await delay(2000); 
        const response = await fetch('http://localhost:8080/companies');
        if (!response.ok) throw new Error('Failed to fetch main data');
        const data = await response.json();
        return data;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message || 'Unexpected error');
        } else {
            throw new Error('Unexpected error');
        }
    }
};