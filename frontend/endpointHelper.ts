import {Organization} from "./types";

export async function getOrganizations(): Promise<Organization[]> {
    try {
        // Ran into issue where fetch is not defaulting to port 3000 so hardcoding for now
        const res = await fetch('http://localhost:3000/api/organizations');

        if (!res.ok)
            throw new Error("Get organizations failed...");

        return await res.json();
        
    } catch (error) {
        console.log('Failed to get Organizations: ' + error);
        return [];
    }
}