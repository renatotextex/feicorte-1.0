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
import type { Representante } from '@/components/dashboard/representantes/representantes-table';
import {z as zod} from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import FormHelperText from "@mui/material/FormHelperText";
import Alert from "@mui/material/Alert";
import 'dayjs/locale/pt-br';
import InputMask from 'react-input-mask';


interface RepresentantesAddFormProps {
  onClose: () => void;
  gender?: 'masculino' | 'feminino' | 'nao_informar';
  onAddRepresentante: (representante: {
    createdAt: Date;
    phone: string;
    name: string;
    cpf: string;
    id: string;
    empresa: string;
    email: string
  }) => void;
  representante?: Representante | null;
}

const schema = zod.object({
  empresa: zod.string().min(1, {message: 'Empresa é obrigatório'}),
  name: zod.string().min(1, {message: 'Nome é obrigatório'}),
  cpf: zod.string().min(1, {message: 'CPF é obrigatório'}),
  email: zod.string().min(1, {message: 'Email é obrigatório'}).email({message: 'Formato de email inválido'}),
  phone: zod.string().min(1, {message: 'Telefone é obrigatório'}),
});

type FormData = zod.infer<typeof schema>;


export function RepresentantesAddForm({onClose, onAddRepresentante, representante}: RepresentantesAddFormProps): React.JSX.Element {
  const {control, handleSubmit, formState: {errors}, reset} = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      empresa: '',
      name: '',
      cpf: '',
      email: '',
      phone: '',
    },
    mode: 'onChange',
  });

  React.useEffect(() => {
    if (representante) {
      reset({
        empresa: representante.empresa || '',
        name: representante.name || '',
        cpf: representante.cpf,
        email: representante.email || '',
        phone: representante.phone || '',
      });
    } else {
      reset();
    }
  }, [representante, reset]);

  const onSubmit = (data: FormData) => {
    const newRepresentante: {
      createdAt: Date;
      phone: string;
      name: string;
      cpf: string;
      id: string;
      empresa: string;
      email: string
    } = {
      id: `REP-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      empresa: data.empresa || '',
      name: data.name || '',
      cpf: data.cpf || '',
      email: data.email,
      phone: data.phone || '',
      createdAt: new Date()
    };

    onAddRepresentante(newRepresentante);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader subheader="Preencha os campos abaixo" title="Adicionar representante"/>
        <Divider/>
        <CardContent>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid size={6}>
              <FormControl fullWidth error={Boolean(errors.empresa)}>
                <InputLabel>Empresa</InputLabel>
                <Controller
                  name="empresa"
                  control={control}
                  render={({field}) => (
                    <OutlinedInput
                      {...field}
                      label="Empresa"
                    />
                  )}
                />
                {errors.empresa ? <FormHelperText>{errors.empresa.message}</FormHelperText> : null}
              </FormControl>
            </Grid>
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
              <FormControl fullWidth error={Boolean(errors.cpf)}>
                <InputLabel>CPF</InputLabel>
                <Controller
                  name="cpf"
                  control={control}
                  render={({ field }) => (
                    <InputMask
                      {...field}
                      mask="999.999.999-99"
                      maskChar={null}
                    >
                      {(inputProps: React.ComponentProps<typeof OutlinedInput>) => (
                        <OutlinedInput
                          {...inputProps}
                          label="CPF"
                        />
                      )}
                    </InputMask>
                  )}
                />
                {errors.cpf ? <FormHelperText>{errors.cpf.message}</FormHelperText> : null}
              </FormControl>
            </Grid>
            <Grid size={6}>
              <Controller
                name="email"
                control={control}
                render={({field}) => (
                  <FormControl fullWidth error={Boolean(errors.email)}>
                    <InputLabel>Email</InputLabel>
                    <OutlinedInput
                      {...field}
                      label="Email"
                      type="email"
                    />
                    {errors.email ? <FormHelperText>{errors.email.message}</FormHelperText> : null}
                  </FormControl>
                )}
              />
            </Grid>
            <Grid size={6}>
              <FormControl fullWidth error={Boolean(errors.phone)}> {/* Linha alterada */}
                <InputLabel>Telefone</InputLabel>
                <Controller
                  name="phone"
                  control={control}
                  render={({field}) => (
                    <OutlinedInput
                      {...field}
                      label="Telefone"
                      type="tel"
                    />
                  )}
                />
                {errors.phone ? <FormHelperText>{errors.phone.message}</FormHelperText> : null}
              </FormControl>
            </Grid>
            </Grid>
        </CardContent>
        {/*<Divider/>*/}
        <CardActions sx={{justifyContent: 'flex-end'}}>
          <Button sx={{ borderRadius: 2, boxShadow: 3 }} type="submit" variant="contained">Salvar</Button>
          <Button sx={{ borderRadius: 2, boxShadow: 3 }} onClick={onClose}>Cancelar</Button>
        </CardActions>
      </Card>
      {errors.root ? <Alert color="error">{errors.root.message}</Alert> : null}
    </form>
  );
}
