
export interface Organization
{
    id: number,
    name: string,
    created: Date,
    updated: Date
}

export interface Account
{
    id: number,
    organization_id: number,
    name: string,
    created: Date,
    updated: Date
}

export interface Deal
{
    id: number,
    account_id: number,
    name: string,
    amount: number,
    created: Date,
    updated: Date
}