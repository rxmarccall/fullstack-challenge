import React, { useEffect, useState } from 'react';
import { Deal } from "./types.ts";
import { getDeals } from './endpointHelper.ts';
import {
    Card,
    CardContent,
    CardHeader,
    Paper,
    FormControl,
    Select,
    MenuItem,
    Table, TableBody,
    TableCell,
    TableContainer, TableHead, TableRow,
} from "@mui/material";

interface AccountDealsProps {
    organization_id: number;
    organization_name: string;
}

type FilterStatus = 'None' | 'Proposal' | 'Pitch' | 'Approved';

const AccountDeals: React.FC<AccountDealsProps> = ({ organization_id, organization_name }) => {
    const [deals, setDeals] = useState<Deal[]>();
    const [filterStatus, setFilterStatus] = useState<FilterStatus>('None');

  useEffect(() => {
    const fetchData = async () => {
        const deals = await getDeals(organization_id);
        setDeals(deals);
    };

    fetchData();
  }, []);

  let filteredDeals = deals;

    if (filterStatus !== 'None') {
        filteredDeals = deals?.filter((deal) => deal.status === filterStatus);
    }

  return (
    <div>
        <Card sx={{  maxWidth: 1920 }}>
            <CardHeader
                title={`${organization_name} Deals`}
            />
            <CardContent>
                <FormControl>
                    <Select
                        value={filterStatus}
                        onChange={(event) => setFilterStatus(event.target.value as FilterStatus)}
                    >
                        <MenuItem value="None">All</MenuItem>
                        <MenuItem value="Proposal">Proposal</MenuItem>
                        <MenuItem value="Pitch">Pitch</MenuItem>
                        <MenuItem value="Approved">Approved</MenuItem>
                    </Select>
                </FormControl>

                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Amount</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredDeals?.map((deal) => (
                                <TableRow
                                    key={deal.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {deal.name}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {deal.status}
                                    </TableCell>
                                    <TableCell>{deal.amount}</TableCell>
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
