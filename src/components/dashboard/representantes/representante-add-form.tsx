'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid2';
import type { Representante } from '@/components/dashboard/representantes/representantes-table';
import {z as zod} from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import FormHelperText from "@mui/material/FormHelperText";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
//import { TextField } from "@mui/material";
import TextField from '@mui/material/TextField';
import dayjs from "dayjs";
import 'dayjs/locale/pt-br';
import { forwardRef } from "react";
import CustomTextField from "@/components/dashboard/representantes/CustomTextField";
import InputMask from 'react-input-mask';

const states = [
  {value: 'acre', label: 'Acre'},
  {value: 'alagoas', label: 'Alagoas'},
  {value: 'amapa', label: 'Amapá'},
  {value: 'amazonas', label: 'Amazonas'},
  {value: 'bahia', label: 'Bahia'},
  {value: 'ceara', label: 'Ceará'},
  {value: 'distrito-federal', label: 'Distrito Federal'},
  {value: 'espirito-santo', label: 'Espírito Santo'},
  {value: 'goias', label: 'Goiás'},
  {value: 'maranhao', label: 'Maranhão'},
  {value: 'matogrosso', label: 'Mato Grosso'},
  {value: 'matogrosso-do-sul', label: 'Mato Grosso do Sul'},
  {value: 'minas-gerais', label: 'Minas Gerais'},
  {value: 'para', label: 'Pará'},
  {value: 'paraiba', label: 'Paraíba'},
  {value: 'parana', label: 'Paraná'},
  {value: 'pernambuco', label: 'Pernambuco'},
  {value: 'piaui', label: 'Piauí'},
  {value: 'rio-de-janeiro', label: 'Rio de Janeiro'},
  {value: 'rio-grande-do-norte', label: 'Rio Grande do Norte'},
  {value: 'rio-grande-do-sul', label: 'Rio Grande do Sul'},
  {value: 'rondonia', label: 'Rondônia'},
  {value: 'roraima', label: 'Roraima'},
  {value: 'sao-paulo', label: 'São Paulo'},
  {value: 'sergipe', label: 'Sergipe'},
  {value: 'tocantins', label: 'Tocantins'},
] as const;


interface RepresentantesAddFormProps {
  onClose: () => void;
  gender?: 'masculino' | 'feminino' | 'nao_informar';
  onAddRepresentante: (representante: Representante) => void;
  representante?: Representante | null;
}

const schema = zod.object({
  name: zod.string().min(1, {message: 'Nome é obrigatório'}),
  surname: zod.string().min(1, {message: 'Sobrenome é obrigatório'}),
  email: zod.string().min(1, {message: 'Email é obrigatório'}).email({message: 'Formato de email inválido'}),
  phone: zod.string().optional(),
  address: zod.string().optional(),
  cpf: zod.string().optional(),
  cnpj: zod.string().optional(),
  city: zod.string().optional(),
  state: zod.string().nonempty({message: 'Estado é obrigatório'}),
  gender: zod.enum(['masculino', 'feminino', 'nao_informar'], {required_error: 'Por favor, selecione uma opção de sexo.'}),
  date: zod.date().refine(value => !isNaN(value.getTime()), { message: 'Data é obrigatória' }),
  time: zod.date().refine(value => !isNaN(value.getTime()), { message: 'Hora é obrigatória' }),

});

type FormData = zod.infer<typeof schema>;


export function RepresentantesAddForm({onClose, onAddRepresentante, representante}: RepresentantesAddFormProps): React.JSX.Element {
  const {control, handleSubmit, formState: {errors}, reset} = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      surname: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      gender: undefined,
      date: undefined,
      time: undefined,
      cpf: '',
      cnpj: '',
    },
    mode: 'onChange',
  });

  React.useEffect(() => {
    if (representante) {
      reset({
        name: representante.name.split(' ')[0] || '',
        surname: representante.name.split(' ').slice(1).join(' ') || '',
        email: representante.email || '',
        phone: representante.phone || '',
        address: representante.address.street || '',
        city: representante.address.city || '',
        state: representante.address.state || '',
        gender: formatGender(representante.gender),
        date: dayjs(representante.date, 'DD/MM/YYYY').toDate(),
        time: dayjs(representante.time, 'HH:mm').toDate(),
        cpf: representante.cpf,
        cnpj: representante.cnpj,
      });
    } else {
      reset();
    }
  }, [representante, reset]);

  const formatGender = (gender: string | undefined): "masculino" | "feminino" | "nao_informar" | undefined => {
    if (gender === "masculino" || gender === "feminino" || gender === "nao_informar") {
      return gender;
    }
    return undefined;
  };

  const onSubmit = (data: FormData) => {
    const newRepresentante: Representante = {
      id: `REP-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      name: `${data.name} ${data.surname}`,
      email: data.email,
      phone: data.phone || '',
      gender: data.gender || undefined,
      address: {city: data.city || '', state: data.state, country: '', street: data.address || ''},
      createdAt: new Date(),
      avatar: '',
      date: dayjs(data.date).format('DD/MM/YYYY'),
      time: dayjs(data.time).format('HH:mm'),
      cpf: data.cpf || '',
      cnpj: data.cnpj || ''
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
              <FormControl fullWidth error={Boolean(errors.surname)}>
                <InputLabel>Sobrenome</InputLabel>
                <Controller
                  name="surname"
                  control={control}
                  render={({field}) => (
                    <OutlinedInput
                      {...field}
                      label="Sobrenome"
                    />
                  )}
                />
                {errors.surname ? <FormHelperText>{errors.surname.message}</FormHelperText> : null}
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
              <FormControl fullWidth error={Boolean(errors.cnpj)}>
                <InputLabel>CNPJ</InputLabel>
                <Controller
                  name="cnpj"
                  control={control}
                  render={({ field }) => (
                    <InputMask
                      {...field}
                      mask="99.999.999/9999-99"
                      maskChar={null}
                    >
                      {(inputProps: React.ComponentProps<typeof OutlinedInput>) => (
                        <OutlinedInput
                          {...inputProps}
                          label="CNPJ"
                        />
                      )}
                    </InputMask>
                  )}
                />
                {errors.cnpj ? <FormHelperText>{errors.cnpj.message}</FormHelperText> : null}
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
              <FormControl fullWidth error={Boolean(errors.state)}> {/* Linha alterada */}
                <InputLabel>Estado</InputLabel>
                <Controller
                  name="state"
                  control={control}
                  render={({field}) => (
                    <Select
                      {...field}
                      label="Estado"
                    >
                      {states.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                {errors.state ? <FormHelperText>{errors.state.message}</FormHelperText> : null}
              </FormControl>
            </Grid>
            <Grid size={6}>
              <FormControl fullWidth error={Boolean(errors.city)}> {/* Linha alterada */}
                <InputLabel>Cidade</InputLabel>
                <Controller
                  name="city"
                  control={control}
                  render={({field}) => (
                    <OutlinedInput
                      {...field}
                      label="Cidade"
                    />
                  )}
                />
                {errors.city ? <FormHelperText>{errors.city.message}</FormHelperText> : null}
              </FormControl>
            </Grid>
            <Grid size={6}>
              <FormControl fullWidth error={Boolean(errors.address)}> {/* Linha alterada */}
                <InputLabel>Endereço</InputLabel>
                <Controller
                  name="address"
                  control={control}
                  render={({field}) => (
                    <OutlinedInput
                      {...field}
                      label="Endereço"
                    />
                  )}
                />
                {errors.address ? <FormHelperText>{errors.address.message}</FormHelperText> : null}
              </FormControl>
            </Grid>
            <Grid size={6}>
              <FormControl fullWidth error={Boolean(errors.date)}>
                <Controller
                  name="date"
                  control={control}
                  render={({ field }) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        {...field}
                        label="Data"
                        format="DD/MM/YYYY"
                        value={field.value ? dayjs(field.value) : null}
                        onChange={(newValue) => {
                          const dateObject = newValue ? newValue.toDate() : null;
                          //const dateObject = new Date(dayValue);
                          field.onChange(dateObject);
                        }}
                        slots={{
                          textField: CustomTextField,
                        }}
                      />
                    </LocalizationProvider>
                  )}
                />
                {errors.date && <FormHelperText>{errors.date.message}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid size={6}>
              <FormControl fullWidth error={Boolean(errors.time)}>
                <Controller
                  name="time"
                  control={control}
                  render={({ field }) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        {...field}
                        label="Hora"
                        value={field.value ? dayjs(field.value) : null}
                        onChange={(newValue) => {
                          const dayValue = newValue ? newValue.toISOString() : null;
                          const dateObject = new Date(dayValue);
                          field.onChange(dateObject);
                        }}
                        slots={{
                          textField: CustomTextField, // Passando CustomTextField diretamente
                        }}
                        ampm={false}
                      />
                    </LocalizationProvider>
                  )}
                />
                {errors?.time && <FormHelperText>{errors?.time.message}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid direction="column" md={6} xs={12} >
              <FormControl component="fieldset" error={Boolean(errors.gender)}>
                <Typography variant="h6">Sexo:</Typography>
                <Controller
                  name="gender"
                  control={control}
                  defaultValue={undefined}
                  render={({field}) => (
                    <RadioGroup {...field} value={field.value || ''} onChange={field.onChange}>
                      <FormControlLabel value="masculino"
                                        control={<Radio sx={{color: '#727272', '&.Mui-checked': {color: '#4F0100'}}}/>}
                                        label="Masculino"/>
                      <FormControlLabel value="feminino"
                                        control={<Radio sx={{color: '#727272', '&.Mui-checked': {color: '#4F0100'}}}/>}
                                        label="Feminino"/>
                      <FormControlLabel value="nao_informar"
                                        control={<Radio sx={{color: '#727272', '&.Mui-checked': {color: '#4F0100'}}}/>}
                                        label="Não quero informar"/>
                    </RadioGroup>
                  )}
                />
                {errors.gender ? <FormHelperText>{errors.gender.message}</FormHelperText> : null}
              </FormControl>
          </Grid>
          </Grid>
        </CardContent>
        <Divider/>
        <CardActions sx={{justifyContent: 'flex-end'}}>
          <Button sx={{ borderRadius: 2, boxShadow: 3 }} type="submit" variant="contained">Salvar</Button>
          <Button sx={{ borderRadius: 2, boxShadow: 3 }} onClick={onClose}>Cancelar</Button>
        </CardActions>
      </Card>
      {errors.root ? <Alert color="error">{errors.root.message}</Alert> : null}
    </form>
  );
}
