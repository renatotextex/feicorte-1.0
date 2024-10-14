'use client'

import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';

import { PalestrantesTable } from '@/components/dashboard/palestrantes/palestrantes-table';
import type { Palestrante } from '@/components/dashboard/palestrantes/palestrantes-table';
import { PalestrantesAddForm } from "@/components/dashboard/palestrantes/palestrantes-add-form";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
//import axios from 'axios';

// export const metadata = { title: `Customers | Dashboard | ${config.site.name}` } satisfies Metadata;

const listaPalestrantes: Palestrante[] = [];

export default function Page(): React.JSX.Element {
  const [palestrantes, setPalestrantes] = React.useState<Palestrante[]>(listaPalestrantes);
  const [showForm, setShowForm] = React.useState(false);
  const [editPalestrante, setEditPalestrante] = React.useState<Palestrante | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [palestranteToDelete, setPalestranteToDelete] = React.useState<string | null>(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleOpenForm = () => setShowForm(true);
  const handleCloseForm = () => {
    setShowForm(false);
    setEditPalestrante(null);
  };

  const handleAddPalestrante = async (newPalestrante: Palestrante) => {
    try {
      // Exemplo de chamada à API usando Axios
      // const response = await axios.post('/api/palestrantes', newPalestrante);
      // setPalestrantes(prev => [...prev, response.data]);

      setPalestrantes(prev => {
        if (editPalestrante) {
          return prev.map(read => (read.id === editPalestrante.id ? newPalestrante : read));
        } else {
          return [...prev, newPalestrante];
        }
      });
      handleCloseForm();
    } catch (error) {
      console.error('Erro ao adicionar palestrante:', error);
    }
  };

  const handleEdit = (id: string) => {
    const palestranteEditar = palestrantes.find(rep => rep.id === id);
    if (palestranteEditar) {
      setShowForm(true);
      setEditPalestrante(palestranteEditar);
    }
  };

  // const handleDelete = (id: string) => {
  //   try {
  //     //await axios.delete(`/api/palestrantes/${id}`);
  //     setPalestrantes(palestrantes.filter(rep => rep.id !== id));
  //   } catch (error) {
  //     console.error('Erro ao excluir palestrante:', error);
  //   }
  // };

  React.useEffect(() => {
    const fetchPalestrantes = async () => {
      try {
        //const response = await axios.get('/api/palestrantes');
        //setPalestrantes(response.data);
      } catch (error) {
        console.error('Erro ao buscar palestrantes:', error);
      }
    };

    //fetchPalestrantes();
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = (id: string) => {
    setPalestranteToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (palestranteToDelete) {
      try {
        //await axios.delete(`/palestrantes/${palestrantesToDelete}`);
        setPalestrantes(palestrantes.filter(rep => rep.id !== palestranteToDelete));
      } catch (error) {
        console.error('Erro ao excluir palestrante:', error);
      }
      setDeleteDialogOpen(false);
      setPalestranteToDelete(null);
    }
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setPalestranteToDelete(null);
  };

  const paginatedPalestrantes = applyPagination(palestrantes, page, rowsPerPage);

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h5">Palestrantes</Typography>
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
        <PalestrantesAddForm onClose={handleCloseForm} onAddPalestrante={handleAddPalestrante} palestrante={editPalestrante} />
      ) : (
        <>
          {/*<CustomersFilters />*/}
          <PalestrantesTable
            count={palestrantes.length}
            page={page}
            rows={paginatedPalestrantes}
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
          <Typography>Você tem certeza que deseja excluir este palestrante?</Typography>
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

function applyPagination(rows: Palestrante[], page: number, rowsPerPage: number): Palestrante[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
