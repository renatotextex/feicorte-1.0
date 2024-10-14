'use client'

import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';

import { EstandesTable } from '@/components/dashboard/estandes/estandes-table';
import type { Estande } from '@/components/dashboard/estandes/estandes-table';
import { EstandesAddForm } from "@/components/dashboard/estandes/estandes-add-form";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
//import axios from 'axios';

// export const metadata = { title: `Customers | Dashboard | ${config.site.name}` } satisfies Metadata;

//const listaEstandes: Estande[] = [] satisfies Estande[];
const listaEstandes: Estande[] = [];

export default function Page(): React.JSX.Element {
  const [estandes, setEstandes] = React.useState<Estande[]>(listaEstandes);
  const [showForm, setShowForm] = React.useState(false);
  const [editEstande, setEditEstande] = React.useState<Estande | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [estandeToDelete, setEstandesToDelete] = React.useState<string | null>(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleOpenForm = () => setShowForm(true);
  const handleCloseForm = () => {
    setShowForm(false);
    setEditEstande(null);
  };

  const handleAddEstande = async (newEstande: Estande) => {
    try {
      // const response = await axios.post('/api/estandes', newEstande);
      // setEstandes(prev => [...prev, response.data]);

      setEstandes(prev => {
        if (editEstande) {
          return prev.map(read => (read.id === editEstande.id ? newEstande : read));
        } else {
          return [...prev, newEstande];
        }
      });
      handleCloseForm();
    } catch (error) {
      console.error('Erro ao adicionar estande:', error);
    }
  };

  const handleEdit = (id: string) => {
    const estandeEditar = estandes.find(rep => rep.id === id);
    if (estandeEditar) {
      setShowForm(true);
      setEditEstande(estandeEditar);
    }
  };

  // const handleDelete = (id: string) => {
  //   try {
  //     //await axios.delete(`/api/estandes/${id}`);
  //     setEstandes(estandes.filter(rep => rep.id !== id));
  //   } catch (error) {
  //     console.error('Erro ao excluir estande:', error);
  //   }
  // };

  React.useEffect(() => {
    const fetchEstandes = async () => {
      try {
        //const response = await axios.get('/api/estandes');
        //setEstandes(response.data);
      } catch (error) {
        console.error('Erro ao buscar estandes:', error);
      }
    };

    //fetchEstandes();
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = (id: string) => {
    setEstandesToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (estandeToDelete) {
      try {
        //await axios.delete(`/representantes/${representanteToDelete}`);
        setEstandes(estandes.filter(rep => rep.id !== estandeToDelete));
      } catch (error) {
        console.error('Erro ao excluir palestrante:', error);
      }
      setDeleteDialogOpen(false);
      setEstandesToDelete(null);
    }
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setEstandesToDelete(null);
  };

  const paginatedEstandes = applyPagination(estandes, page, rowsPerPage);

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h5">Estandes</Typography>
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
        <EstandesAddForm onClose={handleCloseForm} onAddEstande={handleAddEstande} estande={editEstande} />
      ) : (
        <>
          {/*<CustomersFilters />*/}
          <EstandesTable
            count={estandes.length}
            page={page}
            rows={paginatedEstandes}
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
          <Typography>Você tem certeza que deseja excluir este estande?</Typography>
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

function applyPagination(rows: Estande[], page: number, rowsPerPage: number): Estande[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
