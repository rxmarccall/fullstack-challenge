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
    TextField,
    InputLabel,
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
    const [deals, setDeals] = useState<Deal[]>([]);
    const [filterStatus, setFilterStatus] = useState<FilterStatus>('None');
    const [filterYear, setFilterYear] = useState<number | string>('2025');

  useEffect(() => {
    const fetchData = async () => {
        const deals = await getDeals(organization_id);
        setDeals(deals);
    };

    fetchData();
  }, [organization_id]);

    // Filter by Status and Year
    const filteredDeals = deals
        .filter((deal) => filterStatus === 'None' || deal.status === filterStatus)
        .filter((deal) => !filterYear || new Date(deal.created_at).getFullYear() === Number(filterYear));

  return (
    <div>
        <Card sx={{ maxWidth: 1920, marginBottom: 3 }}>
            <CardHeader
                title={`${organization_name} Deals`}
            />
            <CardContent>
                {/* TODO: Put these filter options into separate components */}
                <FormControl>
                    <InputLabel id="filter-status-label">Status</InputLabel>
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
                <TextField
                    label="Filter Year"
                    type="number"
                    value={filterYear}
                    onChange={(event) => setFilterYear(event.target.value)}
                    style={{ marginLeft: 16 }}
                />

                <hr style={{ margin: '16px 0' }} />

                {/* Render filtered deals data*/}
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
                                    <TableCell>${deal.amount}</TableCell>
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
