export interface Airports {
    // last_refresh: number,
    locations: any[],
    // meta: {}, 
    // results_retrieved: number
}

export interface  Airport {
    id: string,
    city: {
        name: string
    }
}