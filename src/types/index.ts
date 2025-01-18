export type Company = {
    id: string,
    name: string
}

export interface CompanyState {
    company: {
        data: Company[] | null;
        isLoading: boolean;
        error: string | null;
    }
}

export type Location = {
    id: string
    name: string
    parentId: string
}

export type Asset = {
    id: string,
    name: string,
    parentId: string | null,
    sensorId: string,
    sensorType: string,
    status: string,
    gatewayId: string,
    locationId: string | null
}

export interface TreeState {
    tree: {
        items: Asset[] | null;
        isLoading: boolean;
        error: string | null;
    }
}