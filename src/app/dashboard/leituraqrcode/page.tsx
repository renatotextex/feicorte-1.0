'use client'

import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';

import { LeituraQrcodeTable } from '@/components/dashboard/leituraqrcode/leitura-qrcode-table';
import type { Leitura } from '@/components/dashboard/leituraqrcode/leitura-qrcode-table';
import { LeiturasAddForm } from "@/components/dashboard/leituraqrcode/leitura-qrcode-add-form";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
//import axios from 'axios';

// export const metadata = { title: `Customers | Dashboard | ${config.site.name}` } satisfies Metadata;

//const listaLeituras: Leitura[] = [] satisfies Leitura[];
const listaLeituras: Leitura[] = [];

export default function Page(): React.JSX.Element {
  const [leituras, setLeituras] = React.useState<Leitura[]>(listaLeituras);
  const [showForm, setShowForm] = React.useState(false);
  const [editLeitura, setEditLeitura] = React.useState<Leitura | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [leituraToDelete, setLeituraToDelete] = React.useState<string | null>(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleOpenForm = () => setShowForm(true);
  const handleCloseForm = () => {
    setShowForm(false);
    setEditLeitura(null);
  };

  const handleAddLeitura = async (newLeitura: Leitura) => {
    try {

      // const response = await axios.post('/api/leituras', newLeitura);
      // setLeituras(prev => [...prev, response.data]);

      setLeituras(prev => {
        if (editLeitura) {
          return prev.map(read => (read.id === editLeitura.id ? newLeitura : read));
        } else {
          return [...prev, newLeitura];
        }
      });
      handleCloseForm();
    } catch (error) {
      console.error('Erro ao adicionar leitura:', error);
    }
  };

  const handleEdit = (id: string) => {
    const leituraEditar = leituras.find(rep => rep.id === id);
    if (leituraEditar) {
      setShowForm(true);
      setEditLeitura(leituraEditar);
    }
  };

  // const handleDelete = (id: string) => {
  //   try {
  //     //await axios.delete(`/api/leituras/${id}`);
  //     setLeituras(leituras.filter(rep => rep.id !== id));
  //   } catch (error) {
  //     console.error('Erro ao excluir leitura:', error);
  //   }
  // };

  React.useEffect(() => {
    const fetchLeituras = async () => {
      try {
        //const response = await axios.get('/api/leituras');
        //setLeituras(response.data);
      } catch (error) {
        console.error('Erro ao buscar leituras:', error);
      }
    };

    //fetchLeituras();
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = (id: string) => {
    setLeituraToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (leituraToDelete) {
      try {
        //await axios.delete(`/representantes/${representanteToDelete}`);
        setLeituras(leituras.filter(rep => rep.id !== leituraToDelete));
      } catch (error) {
        console.error('Erro ao excluir palestrante:', error);
      }
      setDeleteDialogOpen(false);
      setLeituraToDelete(null);
    }
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setLeituraToDelete(null);
  };

  const paginatedLeituras = applyPagination(leituras, page, rowsPerPage);

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h5">Leitura de QRCode</Typography>
        </Stack>
        <div>
          {!showForm ? (
            <Button startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained"
                    onClick={handleOpenForm}
                    sx={{ borderRadius: 2, boxShadow: 6 }}
            >
              Adicionar
            </Button>
          ) : ''}
        </div>
      </Stack>
      {showForm ? (
        <LeiturasAddForm onClose={handleCloseForm} onAddLeitura={handleAddLeitura} leitura={editLeitura} />
      ) : (
        <>
          {/*<CustomersFilters />*/}
          <LeituraQrcodeTable
            count={leituras.length}
            page={page}
            rows={paginatedLeituras}
            rowsPerPage={rowsPerPage}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}
      <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <Typography>Você tem certeza que deseja excluir esta leitura?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} variant="contained" color="primary"
                  sx={{ borderRadius: 2, boxShadow: 6 }}>
            Cancelar
          </Button>
          <Button onClick={confirmDelete} variant="contained" color="secondary" style={{ marginLeft: '10px' }}
                  sx={{ borderRadius: 2, boxShadow: 6 }}>
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}

function applyPagination(rows: Leitura[], page: number, rowsPerPage: number): Leitura[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
