import {Account, Deal, Organization} from "./types.ts";

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

export async function getAccounts(organizationId: number): Promise<Account[]> {
    try {
        // Ran into issue where fetch is not defaulting to port 3000 so hardcoding for now
        const res = await fetch(`http://localhost:3000/api/accounts/${organizationId}`);

        if (!res.ok)
            throw new Error("Get accounts failed...");

        return await res.json();

    } catch (error) {
        console.log('Failed to get Accounts: ' + error);
        return [];
    }
}

export async function getDeals(organizationId: number): Promise<Deal[]> {
    try {
        // Ran into issue where fetch is not defaulting to port 3000 so hardcoding for now
        const res = await fetch(`http://localhost:3000/api/deals/${organizationId}`);

        if (!res.ok)
            throw new Error("Get deals failed...");

        const data = await res.json();
        return data;
    } catch (error) {
        console.log('Failed to get Deals: ' + error);
        return [];
    }
}