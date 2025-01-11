import React, { useEffect, useState } from 'react';
import { Deal } from "./types.ts";
import { getDeals } from './endpointHelper.ts';
import {
    Card,
    CardContent,
    CardHeader,
    Paper,
    Table, TableBody,
    TableCell,
    TableContainer, TableHead, TableRow,
} from "@mui/material";

interface AccountDealsProps {
    organization_id: number;
    organization_name: string;
}

const AccountDeals: React.FC<AccountDealsProps> = ({ organization_id, organization_name }) => {
    // const [organizations, setOrganizations] = useState<Organization[]>()
    // const [accounts, setAccounts] = useState<Account[]>();
    const [deals, setDeals] = useState<Deal[]>();

  useEffect(() => {
    const fetchData = async () => {
        // const organizations = await getOrganizations();
        // setOrganizations(organizations);

        // const accounts = await getAccounts(account.organization_id);
        // setAccounts(accounts);

        const deals = await getDeals(organization_id);
        setDeals(deals);
    };

    fetchData();
  }, []);

  return (
    <div>
        <Card sx={{ minWidth: 275, maxWidth: 500 }}>
            <CardHeader
                title={`${organization_name} Deals`}
            />
            <CardContent>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="right">Amount</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {deals?.map((deal) => (
                                <TableRow
                                    key={deal.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {deal.name}
                                    </TableCell>
                                    <TableCell align="right">{deal.amount}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    </div>
  );
}

export default AccountDeals;
