'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import dayjs from 'dayjs';

export interface Empresa {
  id: string;
  name: string,
  trading_name: string,
  cnpj: string,
  description: string,
  address: string,
  complement: string,
  region: string,
  city: string,
  state:  string,
  cep: string,
  contact_email: string,
  contact_phone: string,
  linkedin_url: string,
  site_url: string,
  created_at: Date;
}

interface EmpresasTableProps {
  count?: number;
  page: number;
  rows?: Empresa[];
  rowsPerPage: number;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function EmpresasTable({
    count = 0,
    rows = [],
    onEdit,
    onDelete,
  }: EmpresasTableProps): React.JSX.Element {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handlePageChange = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const displayedRows = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Card sx={{ borderRadius: 4, boxShadow: 6 }}>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '800px' }}>
          <TableHead>
            <TableRow>
              <TableCell>Razão Social</TableCell>
              <TableCell>Nome Fantasia</TableCell>
              <TableCell>CNPJ</TableCell>
              <TableCell>Descritivo</TableCell>
              <TableCell>Endereço</TableCell>
              <TableCell>Complemento</TableCell>
              <TableCell>Bairro</TableCell>
              <TableCell>Cidade</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>CEP</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Telefone</TableCell>
              <TableCell>Links</TableCell>
              <TableCell>Link</TableCell>
              <TableCell>Data de Inclusão</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedRows.map((row) => (
              <TableRow hover key={row.id}>
                <TableCell>
                  <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
                    <Typography variant="subtitle2">{row.name}</Typography>
                  </Stack>
                </TableCell>
                <TableCell>{row.trading_name}</TableCell>
                <TableCell>{row.cnpj}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.address}</TableCell>
                <TableCell>{row.complement}</TableCell>
                <TableCell>{row.region}</TableCell>
                <TableCell>{row.city}</TableCell>
                <TableCell>{row.state}</TableCell>
                <TableCell>{row.cep}</TableCell>
                <TableCell>{row.contact_email}</TableCell>
                <TableCell>{row.contact_phone}</TableCell>
                <TableCell>{row.linkedin_url}</TableCell>
                <TableCell>{row.site_url}</TableCell>
                <TableCell>{dayjs(row.created_at).format('DD/MM/YYYY')}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => { onEdit(row.id)}}
                          sx={{ borderRadius: 2, boxShadow: 6 }}>
                    Editar
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => { onDelete(row.id)}}
                    style={{ marginLeft: '10px' }}
                    sx={{ borderRadius: 2, boxShadow: 6 }}
                  >
                    Excluir
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
      <Divider />
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={count}
        page={page}
        onPageChange={handlePageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleRowsPerPageChange}
        labelRowsPerPage="Linhas por página"
      />
    </Card>
  );
}
