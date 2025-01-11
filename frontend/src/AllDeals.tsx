import {getOrganizations} from "./endpointHelper.ts";
import {useEffect, useState} from "react";
import AccountDeals from "./AccountDeals.tsx";

import {Organization} from "./types.ts";


const AllDeals: React.FC = () => {
    const [organizations, setOrganizations] = useState<Organization[]>()

    useEffect(() => {
        const fetchData = async () => {
            const organizations = await getOrganizations();
            setOrganizations(organizations);

        };

        fetchData();
    }, []);

    return (
        <div>
            {organizations?.map((organization) => (
                <AccountDeals organization_id={organization.id} organization_name={organization.name} />
            ))}
        </div>
    );
}

export default AllDeals;
