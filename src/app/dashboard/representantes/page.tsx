'use client'

import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';


import { RepresentantesTable } from '@/components/dashboard/representantes/representantes-table';
import type { Representante } from '@/components/dashboard/representantes/representantes-table';
import { RepresentantesAddForm } from "@/components/dashboard/representantes/representante-add-form";

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

//import axios from 'axios';

// export const metadata = { title: `Customers | Dashboard | ${config.site.name}` } satisfies Metadata;

//const listaRepresentantes: Representante[] = [] satisfies Representante[];
const listaRepresentantes: Representante[] = [];

export default function Page(): React.JSX.Element {
  const [representantes, setRepresentantes] = React.useState<Representante[]>(listaRepresentantes);
  const [showForm, setShowForm] = React.useState(false);
  const [editRepresentante, setEditRepresentante] = React.useState<Representante | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [representanteToDelete, setRepresentanteToDelete] = React.useState<string | null>(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleOpenForm = () => setShowForm(true);
  const handleCloseForm = () => {
    setShowForm(false);
    setEditRepresentante(null);
  };

  const handleAddRepresentante = async (newRepresentante: Representante) => {
    try {
      // const response = await axios.post('/api/representantes', newRepresentante);
      // setRepresentantes(prev => [...prev, response.data]);

      setRepresentantes(prev => {
        if (editRepresentante) {
          return prev.map(read => (read.id === editRepresentante.id ? newRepresentante : read));
        } else {
          return [...prev, newRepresentante];
        }
      });
      handleCloseForm();
    } catch (error) {
      console.error('Erro ao adicionar representante:', error);
    }
  };

  const handleEdit = (id: string) => {
    const representanteEditar = representantes.find(rep => rep.id === id);
    if (representanteEditar) {
      setShowForm(true);
      setEditRepresentante(representanteEditar);
    }
  };

  const handleDelete = (id: string) => {
    setRepresentanteToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (representanteToDelete) {
      try {
        //await axios.delete(`/representantes/${representanteToDelete}`);
        setRepresentantes(representantes.filter(rep => rep.id !== representanteToDelete));
      } catch (error) {
        console.error('Erro ao excluir representante:', error);
      }
      setDeleteDialogOpen(false);
      setRepresentanteToDelete(null);
    }
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setRepresentanteToDelete(null);
  };

  // const handleDelete = (id: string) => {
  //   try {
  //     //await axios.delete(`/api/representantes/${id}`);
  //     setRepresentantes(representantes.filter(rep => rep.id !== id));
  //   } catch (error) {
  //     console.error('Erro ao excluir representante:', error);
  //   }
  // };

  React.useEffect(() => {
    const fetchRepresentantes = async () => {
      try {
        //const response = await axios.get('/api/representantes');
        //setRepresentantes(response.data);
      } catch (error) {
        console.error('Erro ao buscar representantes:', error);
      }
    };

    //fetchRepresentantes();
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedRepresentantes = applyPagination(representantes, page, rowsPerPage);

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h5">Representantes</Typography>
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
        <RepresentantesAddForm onClose={handleCloseForm} onAddRepresentante={handleAddRepresentante} representante={editRepresentante} />
      ) : (
        <>
          {/*<CustomersFilters />*/}
          <RepresentantesTable
            count={representantes.length}
            page={page}
            rows={paginatedRepresentantes}
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
          <Typography>Você tem certeza que deseja excluir este representante?</Typography>
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

function applyPagination(rows: Representante[], page: number, rowsPerPage: number): Representante[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
