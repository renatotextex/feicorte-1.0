'use client'

import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';

import { EmpresasTable } from '@/components/dashboard/empresas/empresas-table';
import type { Empresa } from '@/components/dashboard/empresas/empresas-table';
import { EmpresasAddForm } from "@/components/dashboard/empresas/empresas-add-form";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import axios from 'axios';

const listaEmpresas: Empresa[] = [];

export default function Page(): React.JSX.Element {
  const [empresas, setEmpresas] = React.useState<Empresa[]>(listaEmpresas);
  const [showForm, setShowForm] = React.useState(false);
  const [editEmpresa, setEditEmpresa] = React.useState<Empresa | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [empresaToDelete, setEmpresaToDelete] = React.useState<string | null>(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  //Listar empresas
  const fetchEmpresas = async () => {
    try {
      const token = localStorage.getItem('custom-auth-token');
      const response = await axios.get('https://dev-service.feicortesp.com/companies', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEmpresas(response.data);
    } catch (error) {
      console.error('Erro ao buscar empresas:', error);
    }
  };

  React.useEffect(() => {
    fetchEmpresas();
  }, []);


  const handleOpenForm = () => setShowForm(true);
  const handleCloseForm = () => {
    setShowForm(false);
    setEditEmpresa(null);
  };

  const handleAddEmpresa = async (newEmpresa: Empresa) => {
    try {
      // const response = await axios.post('/api/empresas', newEmpresa);
      // setEmpresas(prev => [...prev, response.data]);

      setEmpresas(prev => {
        if (editEmpresa) {
          return prev.map(read => (read.id === editEmpresa.id ? newEmpresa : read));
        } else {
          return [...prev, newEmpresa];
        }
      });
      handleCloseForm();
    } catch (error) {
      console.error('Erro ao adicionar empresa:', error);
    }
  };

  const handleEdit = (id: string) => {
    const empresaEditar = empresas.find(rep => rep.id === id);
    if (empresaEditar) {
      setShowForm(true);
      setEditEmpresa(empresaEditar);
    }
  };

  // const handleDelete = (id: string) => {
  //   try {
  //     //await axios.delete(`/api/empresas/${id}`);
  //     setEmpresas(empresas.filter(rep => rep.id !== id));
  //   } catch (error) {
  //     console.error('Erro ao excluir empresa:', error);
  //   }
  // };

  React.useEffect(() => {
    const fetchEmpresas = async () => {
      try {
        //const response = await axios.get('/api/empresas');
        //setEmpresas(response.data);
      } catch (error) {
        console.error('Erro ao buscar empresas:', error);
      }
    };

    //fetchEmpresas();
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = (id: string) => {
    setEmpresaToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (empresaToDelete) {
      try {
        //await axios.delete(`/representantes/${representanteToDelete}`);
        setEmpresas(empresas.filter(rep => rep.id !== empresaToDelete));
      } catch (error) {
        console.error('Erro ao excluir palestrante:', error);
      }
      setDeleteDialogOpen(false);
      setEmpresaToDelete(null);
    }
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setEmpresaToDelete(null);
  };

  const paginatedEmpresas = applyPagination(empresas, page, rowsPerPage);

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h5">Empresas</Typography>
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
        <EmpresasAddForm onClose={handleCloseForm} onAddEmpresa={handleAddEmpresa} empresa={editEmpresa} />
      ) : (
        <>
          {/*<CustomersFilters />*/}
          <EmpresasTable
            count={empresas.length}
            page={page}
            rows={paginatedEmpresas}
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
          <Typography>Você tem certeza que deseja excluir esta empresa?</Typography>
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

function applyPagination(rows: Empresa[], page: number, rowsPerPage: number): Empresa[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
