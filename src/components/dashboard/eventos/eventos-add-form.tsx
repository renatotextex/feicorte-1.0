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
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid2';
import type { Evento } from '@/components/dashboard/eventos/eventos-table';
import {z as zod} from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import FormHelperText from "@mui/material/FormHelperText";
import Alert from "@mui/material/Alert";
import 'dayjs/locale/pt-br';
import TextField from "@mui/material/TextField";

const status = [
  {value: 'Ativo', label: 'Ativo'},
  {value: 'Inativo', label: 'Inativo'},
] as const;


interface EventosAddFormProps {
  onClose: () => void;
  gender?: 'masculino' | 'feminino' | 'nao_informar';
  onAddEvento: (evento: Evento) => void;
  evento?: Evento | null;
}

const schema = zod.object({
  name: zod.string().min(1, { message: 'Nome é obrigatório' }),
  descritivo: zod.string().optional(),
  link: zod.string().optional().refine((val) => !val || zod.string().url().safeParse(val).success, {
      message: 'Deve ser um link válido',
    }),
  upload: zod.instanceof(File).nullable().refine((file) => file === null || (file.size <= 2 * 1024 * 1024), {
      message: 'O arquivo deve ser uma imagem de até 2MB',
    }),
  status: zod.string().min(1, { message: 'Status é obrigatório' }),
});


type FormData = zod.infer<typeof schema>;


export function EventosAddForm({onClose, onAddEvento, evento}: EventosAddFormProps): React.JSX.Element {
  const {control, handleSubmit, formState: {errors}, reset} = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      descritivo: '',
      link: '',
      upload: null,
      status: '',
    },
    mode: 'onChange',
  });

  React.useEffect(() => {
    if (evento) {
      reset({
        name: evento.name.split(' ')[0] || '',
        descritivo: evento.descritivo,
        link: evento.link,
        upload: evento.upload || null,
        status: evento.status || '',
      });
    } else {
      reset();
    }
  }, [evento, reset]);


  const onSubmit = async (data: FormData) => {
    const newEvento: Evento = {
      id: `REP-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      name: data.name || '',
      descritivo: data.descritivo || '',
      link: data.link || '',
      upload: data.upload,
      status: data.status || '',
      createdAt: new Date(),
    };
    console.table(newEvento);
    onAddEvento(newEvento);
  };

  // const onSubmit = async (data: FormData) => {
  //   const formData = new FormData();
  //
  //   formData.append('name', data.name);
  //   formData.append('descritivo', data.descritivo || '');
  //   formData.append('link', data.link || '');
  //   formData.append('upload', data.upload);
  //   formData.append('status', data.status || '');
  //
  //   try {
  //     const response = await axios.post('/api/eventos', formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     });
  //     onAddEvento(response.data);
  //     onClose();
  //   } catch (error) {
  //     console.error('Erro ao enviar os dados de eventos:', error);
  //   }
  // };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader subheader="Preencha os campos abaixo" title="Adicionar evento"/>
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
                name="link"
                control={control}
                render={({field}) => (
                  <FormControl fullWidth error={Boolean(errors.link)}>
                    <InputLabel>Link</InputLabel>
                    <OutlinedInput
                      {...field}
                      label="Link"
                      type="url"
                    />
                    {errors.link ? <FormHelperText>{errors.link.message}</FormHelperText> : null}
                  </FormControl>
                )}
              />
            </Grid>
            <Grid size={6}>
              <Controller
                name="descritivo"
                control={control}
                render={({field}) => (
                  <FormControl fullWidth error={Boolean(errors.descritivo)}>
                    <TextField
                      {...field}
                      label="Descritivo"
                      multiline
                      minRows={3}
                      maxRows={6}
                      slotProps={{
                        input: { 'aria-label': 'descritivo' },
                        htmlInput: { maxLength: 200 }
                      }}
                      helperText={errors.descritivo ? errors.descritivo.message : `${field.value.length}/200`}
                    />
                  </FormControl>
                )}
              />
            </Grid>
            <Grid size={6}>
              <InputLabel>Upload de Imagem</InputLabel>
              <Controller
                name="upload"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth error={Boolean(errors.upload)}>
                    <OutlinedInput
                      type="file"
                      inputProps={{ accept: 'image/*' }} // Aceitar apenas imagens
                      onChange={(e) => {
                        const target = e.target as HTMLInputElement;
                        const file = target.files?.[0] || null;
                        field.onChange(file);
                      }}
                      label="Upload"
                    />
                    {errors.upload ? <FormHelperText>{errors.upload.message}</FormHelperText> : null}

                    {field.value && (
                      <Button
                        variant="text"
                        onClick={() => {
                          if (field.value) { // Verifica se field.value não é undefined
                            const url = URL.createObjectURL(field.value);
                            window.open(url, '_blank');
                          }
                        }}
                      >
                        {field.value.name}
                      </Button>
                    )}
                  </FormControl>
                )}
              />
            </Grid>
            <Grid size={6}>
              <FormControl fullWidth error={Boolean(errors.status)}>
                <InputLabel>Status</InputLabel>
                <Controller
                  name="status"
                  control={control}
                  render={({field}) => (
                    <Select
                      {...field}
                      label="Status"
                    >
                      {status.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                {errors.status ? <FormHelperText>{errors.status.message}</FormHelperText> : null}
              </FormControl>
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
