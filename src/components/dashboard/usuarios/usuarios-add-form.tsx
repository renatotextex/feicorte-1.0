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
import type { Usuario } from '@/components/dashboard/usuarios/usuarios-table';
import {z as zod} from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import FormHelperText from "@mui/material/FormHelperText";
import Alert from "@mui/material/Alert";
import 'dayjs/locale/pt-br';
import InputMask from 'react-input-mask';

const types = [
  {value: 'Administrador', label: 'Administrador'},
  {value: 'Gerente', label: 'Gerente'},
  {value: 'Representante', label: 'Representante'},
] as const;

const status = [
  {value: 'Ativo', label: 'Ativo'},
  {value: 'Inativo', label: 'Inativo'},
] as const;


interface UsuariosAddFormProps {
  onClose: () => void;
  gender?: 'masculino' | 'feminino' | 'nao_informar';
  onAddUsuario: (usuario: Usuario) => void;
  usuario?: Usuario | null;
}

const schema = zod.object({
  name: zod.string().min(1, {message: 'Nome é obrigatório'}),
  cpf: zod.string().optional(),
  passport: zod.string().optional(),
  email: zod.string().min(1, {message: 'Email é obrigatório'}).email({message: 'Formato de email inválido'}),
  phone: zod.string().min(1, {message: 'Telefone é obrigatório'}),
  type: zod.string().min(1, {message: 'Tipo é obrigatório'}),
  enterprise: zod.string().min(1, {message: 'Empresa é obrigatório'}),
  status: zod.string().min(1, {message: 'Status é obrigatório'})
});

type FormData = zod.infer<typeof schema>;


export function UsuariosAddForm({onClose, onAddUsuario, usuario}: UsuariosAddFormProps): React.JSX.Element {
  const {control, handleSubmit, formState: {errors}, reset} = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      cpf: '',
      passport: '',
      email: '',
      phone: '',
      type: '',
      enterprise: '',
      status: '',
    },
    mode: 'onChange',
  });

  React.useEffect(() => {
    if (usuario) {
      reset({
        name: usuario.name.split(' ')[0] || '',
        cpf: usuario.cpf,
        passport: usuario.passport,
        email: usuario.email || '',
        phone: usuario.phone || '',
        type: usuario.type || '',
        enterprise: usuario.enterprise || '',
        status: usuario.status || '',
      });
    } else {
      reset();
    }
  }, [usuario, reset]);


  const onSubmit = (data: FormData) => {
    const newUsuario: Usuario = {
      id: `REP-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      name: data.name || '',
      cpf: data.cpf || '',
      passport: data.passport || '',
      email: data.email,
      phone: data.phone || '',
      type: data.type || '',
      enterprise: data.enterprise || '',
      status: data.status || '',
      createdAt: new Date(),
    };

    onAddUsuario(newUsuario);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader subheader="Preencha os campos abaixo" title="Adicionar usuário"/>
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
                          label="cpf"
                        />
                      )}
                    </InputMask>
                  )}
                />
                {errors.cpf ? <FormHelperText>{errors.cpf.message}</FormHelperText> : null}
              </FormControl>
            </Grid>
            <Grid size={6}>
              <FormControl fullWidth error={Boolean(errors.passport)}>
                <InputLabel>Passaporte</InputLabel>
                <Controller
                  name="passport"
                  control={control}
                  render={({field}) => (
                    <OutlinedInput
                      {...field}
                      label="Passaporte"
                    />
                  )}
                />
                {errors.passport ? <FormHelperText>{errors.passport.message}</FormHelperText> : null}
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
            <Grid size={6}>
              <FormControl fullWidth error={Boolean(errors.type)}>
                <InputLabel>Tipo</InputLabel>
                <Controller
                  name="type"
                  control={control}
                  render={({field}) => (
                    <Select
                      {...field}
                      label="Tipo"
                    >
                      {types.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                {errors.type ? <FormHelperText>{errors.type.message}</FormHelperText> : null}
              </FormControl>
            </Grid>
            <Grid size={6}>
              <FormControl fullWidth error={Boolean(errors.enterprise)}>
                <InputLabel>Empresa</InputLabel>
                <Controller
                  name="enterprise"
                  control={control}
                  render={({field}) => (
                    <OutlinedInput
                      {...field}
                      label="Empresa"
                    />
                  )}
                />
                {errors.enterprise ? <FormHelperText>{errors.enterprise.message}</FormHelperText> : null}
              </FormControl>
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
