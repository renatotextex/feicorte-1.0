'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Grid from '@mui/material/Grid2';
import type { Palestrante } from '@/components/dashboard/palestrantes/palestrantes-table';
import {z as zod} from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import FormHelperText from "@mui/material/FormHelperText";
import Alert from "@mui/material/Alert";
import 'dayjs/locale/pt-br';
import TextField from "@mui/material/TextField";


interface PalestrantesAddFormProps {
  onClose: () => void;
  gender?: 'masculino' | 'feminino' | 'nao_informar';
  onAddPalestrante: (palestrante: Palestrante) => void;
  palestrante?: Palestrante | null;
}

const schema = zod.object({
  name: zod.string().min(1, {message: 'Nome é obrigatório'}),
  minibio: zod.string().optional()
});

type FormData = zod.infer<typeof schema>;


export function PalestrantesAddForm({onClose, onAddPalestrante, palestrante}: PalestrantesAddFormProps): React.JSX.Element {
  const {control, handleSubmit, formState: {errors}, reset} = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      minibio: ''
    },
    mode: 'onChange',
  });

  React.useEffect(() => {
    if (palestrante) {
      reset({
        name: palestrante.name.split(' ')[0] || '',
        minibio: palestrante.minibio
      });
    } else {
      reset();
    }
  }, [palestrante, reset]);


  const onSubmit = (data: FormData) => {
    const newPalestrante: Palestrante = {
      id: `REP-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      name: data.name || '',
      minibio: data.minibio || '',
      createdAt: new Date(),
    };

    onAddPalestrante(newPalestrante);
  };

  // const onSubmit = async (data: FormData) => {
  //   const formData = new FormData();
  //
  //   formData.append('name', data.name);
  //   formData.append('minibio', data.minibio || '');
  //
  //   try {
  //     const response = await axios.post('/api/palestrantes', formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     });
  //     onAddPalestrante(response.data);
  //     onClose();
  //   } catch (error) {
  //     console.error('Erro ao enviar os dados de palestrantes:', error);
  //   }
  // };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader subheader="Preencha os campos abaixo" title="Adicionar palestrante"/>
        <Divider/>
        <CardContent>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid size={6}>
              <FormControl fullWidth error={Boolean(errors.name)}>
                <InputLabel>Nome</InputLabel>
                <Controller
                  name="name"
                  control={control}
                  render={({field}) => (
                    <OutlinedInput
                      {...field}
                      label="Nome"
                    />
                  )}
                />
                {errors.name ? <FormHelperText>{errors.name.message}</FormHelperText> : null}
              </FormControl>
            </Grid>
            <Grid size={6}>
              <Controller
                name="minibio"
                control={control}
                render={({field}) => (
                  <FormControl fullWidth error={Boolean(errors.minibio)}>
                    <TextField
                      {...field}
                      label="Mini Biografia"
                      multiline
                      minRows={3}
                      maxRows={6}
                      slotProps={{
                        input: { 'aria-label': 'minibio' },
                        htmlInput: { maxLength: 200 }
                      }}
                      helperText={errors.minibio ? errors.minibio.message : `${field.value.length}/200`}
                    />
                  </FormControl>
                )}
              />
            </Grid>
            </Grid>
        </CardContent>
        <Divider/>
        <CardActions sx={{justifyContent: 'flex-end'}}>
          <Button type="submit" variant="contained">Salvar</Button>
          <Button onClick={onClose}>Cancelar</Button>
        </CardActions>
      </Card>
      {errors.root ? <Alert color="error">{errors.root.message}</Alert> : null}
    </form>
  );
}
