'use client'

import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';

import { UsuariosTable } from '@/components/dashboard/usuarios/usuarios-table';
import type { Usuario } from '@/components/dashboard/usuarios/usuarios-table';
import { UsuariosAddForm } from "@/components/dashboard/usuarios/usuarios-add-form";
//import axios from 'axios';

// export const metadata = { title: `Customers | Dashboard | ${config.site.name}` } satisfies Metadata;

const listaUsuarios: Usuario[] = [];

export default function Page(): React.JSX.Element {
  const [usuarios, setUsuarios] = React.useState<Usuario[]>(listaUsuarios);
  const [showForm, setShowForm] = React.useState(false);
  const [editUsuario, setEditUsuario] = React.useState<Usuario | null>(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleOpenForm = () => setShowForm(true);
  const handleCloseForm = () => {
    setShowForm(false);
    setEditUsuario(null);
  };

  const handleAddUsuario = async (newUsuario: Usuario) => {
    try {
      // Exemplo de chamada à API usando Axios
      // const response = await axios.post('/api/usuarios', newUsuario);
      // setUsuarios(prev => [...prev, response.data]);

      setUsuarios(prev => {
        if (editUsuario) {
          return prev.map(read => (read.id === editUsuario.id ? newUsuario : read));
        } else {
          return [...prev, newUsuario];
        }
      });
      handleCloseForm();
    } catch (error) {
      console.error('Erro ao adicionar usuario:', error);
    }
  };

  const handleEdit = (id: string) => {
    const usuarioEditar = usuarios.find(rep => rep.id === id);
    if (usuarioEditar) {
      setShowForm(true);
      setEditUsuario(usuarioEditar);
    }
  };

  const handleDelete = (id: string) => {
    try {
      //await axios.delete(`/api/usuarios/${id}`);
      setUsuarios(usuarios.filter(rep => rep.id !== id));
    } catch (error) {
      console.error('Erro ao excluir usuario:', error);
    }
  };

  React.useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        //const response = await axios.get('/api/usuarios');
        //setUsuarios(response.data);
      } catch (error) {
        console.error('Erro ao buscar usuarios:', error);
      }
    };

    //fetchUsuarios();
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedUsuarios = applyPagination(usuarios, page, rowsPerPage);

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h5">Usuários</Typography>
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
        <UsuariosAddForm onClose={handleCloseForm} onAddUsuario={handleAddUsuario} usuario={editUsuario} />
      ) : (
        <>
          {/*<CustomersFilters />*/}
          <UsuariosTable
            count={usuarios.length}
            page={page}
            rows={paginatedUsuarios}
            rowsPerPage={rowsPerPage}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}
    </Stack>
  );
}

function applyPagination(rows: Usuario[], page: number, rowsPerPage: number): Usuario[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
