import type { Map } from "../../../../shared/types";

export async function mapsLoader(): Promise<Map[]> {
    const response = await fetch('http://localhost:3000/maps', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if(!response.ok){
        const errorData = await response.json();
        throw new Response(
            JSON.stringify({
                error: errorData.error || 'Could not fetch maps',
                status: response.status
            }),
            {
                status: response.status,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
    }

    const data: Map[] = await response.json();
    return data;
}

