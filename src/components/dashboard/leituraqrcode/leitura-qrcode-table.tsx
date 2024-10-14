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

export interface Leitura {
  id: string;
  idsympla: string;
  event: string;
  date: string;
  time: dayjs.ConfigType;
  representante: string;
  createdAt: Date;
}

interface LeiturasTableProps {
  count?: number;
  page: number;
  rows?: Leitura[];
  rowsPerPage: number;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function LeituraQrcodeTable({
    count = 0,
    rows = [],
    onEdit,
    onDelete,
  }: LeiturasTableProps): React.JSX.Element {
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
              <TableCell>ID Sympla</TableCell>
              <TableCell>Evento</TableCell>
              <TableCell>Data</TableCell>
              <TableCell>Horário</TableCell>
              <TableCell>Representante</TableCell>
              <TableCell>Data de Inclusão</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedRows.map((row) => (
              <TableRow hover key={row.id}>
                <TableCell>{row.idsympla}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.time}</TableCell>
                <TableCell>{row.representante}</TableCell>
                <TableCell>{dayjs(row.createdAt).format('DD/MM/YYYY')}</TableCell>
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
