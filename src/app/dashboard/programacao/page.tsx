'use client'

import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';

import { ProgramacaoTable } from '@/components/dashboard/programacao/programacao-table';
import type { Programacao } from '@/components/dashboard/programacao/programacao-table';
import { ProgramacoesAddForm } from "@/components/dashboard/programacao/programacao-add-form";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
//import axios from 'axios';

// export const metadata = { title: `Customers | Dashboard | ${config.site.name}` } satisfies Metadata;

//const listaProgramacoes: Programacao[] = [] satisfies Programacao[];
const listaProgramacoes: Programacao[] = [];

export default function Page(): React.JSX.Element {
  const [programacoes, setProgramacoes] = React.useState<Programacao[]>(listaProgramacoes);
  const [showForm, setShowForm] = React.useState(false);
  const [editProgramacao, setEditProgramacao] = React.useState<Programacao | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [programacaoToDelete, setProgramacaoToDelete] = React.useState<string | null>(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleOpenForm = () => setShowForm(true);
  const handleCloseForm = () => {
    setShowForm(false);
    setEditProgramacao(null);
  };

  const handleAddProgramacao = async (newProgramacao: Programacao) => {
    try {

      // const response = await axios.post('/api/programacoes', newProgramacao);
      // setProgramacoes(prev => [...prev, response.data]);

      setProgramacoes(prev => {
        if (editProgramacao) {
          return prev.map(read => (read.id === editProgramacao.id ? newProgramacao : read));
        } else {
          return [...prev, newProgramacao];
        }
      });
      handleCloseForm();
    } catch (error) {
      console.error('Erro ao adicionar programacao:', error);
    }
  };

  const handleEdit = (id: string) => {
    const programacaoEditar = programacoes.find(rep => rep.id === id);
    if (programacaoEditar) {
      setShowForm(true);
      setEditProgramacao(programacaoEditar);
    }
  };

  // const handleDelete = (id: string) => {
  //   try {
  //     //await axios.delete(`/api/programacoes/${id}`);
  //     setProgramacoes(programacoes.filter(rep => rep.id !== id));
  //   } catch (error) {
  //     console.error('Erro ao excluir programacao:', error);
  //   }
  // };

  React.useEffect(() => {
    const fetchProgramacoes = async () => {
      try {
        //const response = await axios.get('/api/programacoes');
        //setProgramacoes(response.data);
      } catch (error) {
        console.error('Erro ao buscar programacoes:', error);
      }
    };

    //fetchProgramacoes();
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = (id: string) => {
    setProgramacaoToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (programacaoToDelete) {
      try {
        //await axios.delete(`/representantes/${representanteToDelete}`);
        setProgramacoes(programacoes.filter(rep => rep.id !== programacaoToDelete));
      } catch (error) {
        console.error('Erro ao excluir palestrante:', error);
      }
      setDeleteDialogOpen(false);
      setProgramacaoToDelete(null);
    }
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setProgramacaoToDelete(null);
  };

  const paginatedProgramacoes = applyPagination(programacoes, page, rowsPerPage);

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h5">Programação</Typography>
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
        <ProgramacoesAddForm onClose={handleCloseForm} onAddProgramacao={handleAddProgramacao} programacao={editProgramacao} />
      ) : (
        <>
          {/*<CustomersFilters />*/}
          <ProgramacaoTable
            count={programacoes.length}
            page={page}
            rows={paginatedProgramacoes}
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
          <Typography>Você tem certeza que deseja excluir esta programação?</Typography>
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

function applyPagination(rows: Programacao[], page: number, rowsPerPage: number): Programacao[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
