'use client'

import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';

import { EventosTable } from '@/components/dashboard/eventos/eventos-table';
import type { Evento } from '@/components/dashboard/eventos/eventos-table';
import { EventosAddForm } from "@/components/dashboard/eventos/eventos-add-form";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
//import axios from 'axios';

// export const metadata = { title: `Customers | Dashboard | ${config.site.name}` } satisfies Metadata;

const listaEventos: Evento[] = [];

export default function Page(): React.JSX.Element {
  const [eventos, setEventos] = React.useState<Evento[]>(listaEventos);
  const [showForm, setShowForm] = React.useState(false);
  const [editEvento, setEditEvento] = React.useState<Evento | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [eventoToDelete, setEventoToDelete] = React.useState<string | null>(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleOpenForm = () => setShowForm(true);
  const handleCloseForm = () => {
    setShowForm(false);
    setEditEvento(null);
  };

  const handleAddEvento = async (newEvento: Evento) => {
    try {
      // Exemplo de chamada à API usando Axios
      // const response = await axios.post('/api/eventos', newEvento);
      // setEventos(prev => [...prev, response.data]);

      setEventos(prev => {
        if (editEvento) {
          return prev.map(read => (read.id === editEvento.id ? newEvento : read));
        } else {
          return [...prev, newEvento];
        }
      });
      handleCloseForm();
    } catch (error) {
      console.error('Erro ao adicionar evento:', error);
    }
  };

  const handleEdit = (id: string) => {
    const eventoEditar = eventos.find(rep => rep.id === id);
    if (eventoEditar) {
      setShowForm(true);
      setEditEvento(eventoEditar);
    }
  };

  // const handleDelete = (id: string) => {
  //   try {
  //     //await axios.delete(`/api/eventos/${id}`);
  //     setEventos(eventos.filter(rep => rep.id !== id));
  //   } catch (error) {
  //     console.error('Erro ao excluir evento:', error);
  //   }
  // };

  React.useEffect(() => {
    const fetchEventos = async () => {
      try {
        //const response = await axios.get('/api/eventos');
        //setEventos(response.data);
      } catch (error) {
        console.error('Erro ao buscar eventos:', error);
      }
    };

    //fetchEventos();
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = (id: string) => {
    setEventoToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (eventoToDelete) {
      try {
        //await axios.delete(`/representantes/${representanteToDelete}`);
        setEventos(eventos.filter(rep => rep.id !== eventoToDelete));
      } catch (error) {
        console.error('Erro ao excluir evento:', error);
      }
      setDeleteDialogOpen(false);
      setEventoToDelete(null);
    }
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setEventoToDelete(null);
  };

  const paginatedEventos = applyPagination(eventos, page, rowsPerPage);

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h5">Eventos</Typography>
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
        <EventosAddForm onClose={handleCloseForm} onAddEvento={handleAddEvento} evento={editEvento} />
      ) : (
        <>
          {/*<CustomersFilters />*/}
          <EventosTable
            count={eventos.length}
            page={page}
            rows={paginatedEventos}
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
          <Typography>Você tem certeza que deseja excluir este evento?</Typography>
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

function applyPagination(rows: Evento[], page: number, rowsPerPage: number): Evento[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
