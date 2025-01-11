import React, { useEffect, useState } from 'react';
import { Organization } from "../types";
import { getOrganizations } from '../endpointHelper';

const AccountDeals: React.FC = () => {
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
      <span>
        Organizations
      </span>
      <ul>
        {organizations?.map((organization) => (
          <li key={organization.id}>{organization.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default AccountDeals;
