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
import Grid from '@mui/material/Grid2';
import type { Empresa } from '@/components/dashboard/empresas/empresas-table';
import {z as zod} from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import FormHelperText from "@mui/material/FormHelperText";
import Alert from "@mui/material/Alert";
import 'dayjs/locale/pt-br';
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputMask from 'react-input-mask';
import { OutlinedInput, Typography } from '@mui/material';
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import axios from 'axios';


const estados = [
  { value: 'AC', label: 'Acre' },
  { value: 'AL', label: 'Alagoas' },
  { value: 'AP', label: 'Amapá' },
  { value: 'AM', label: 'Amazonas' },
  { value: 'BA', label: 'Bahia' },
  { value: 'CE', label: 'Ceará' },
  { value: 'DF', label: 'Distrito Federal' },
  { value: 'ES', label: 'Espírito Santo' },
  { value: 'GO', label: 'Goiás' },
  { value: 'MA', label: 'Maranhão' },
  { value: 'MT', label: 'Mato Grosso' },
  { value: 'MS', label: 'Mato Grosso do Sul' },
  { value: 'MG', label: 'Minas Gerais' },
  { value: 'PA', label: 'Pará' },
  { value: 'PB', label: 'Paraíba' },
  { value: 'PR', label: 'Paraná' },
  { value: 'PE', label: 'Pernambuco' },
  { value: 'PI', label: 'Piauí' },
  { value: 'RJ', label: 'Rio de Janeiro' },
  { value: 'RN', label: 'Rio Grande do Norte' },
  { value: 'RS', label: 'Rio Grande do Sul' },
  { value: 'RO', label: 'Rondônia' },
  { value: 'RR', label: 'Roraima' },
  { value: 'SC', label: 'Santa Catarina' },
  { value: 'SP', label: 'São Paulo' },
  { value: 'SE', label: 'Sergipe' },
  { value: 'TO', label: 'Tocantins' },
] as const;


interface EmpresasAddFormProps {
  onClose: () => void;
  gender?: 'masculino' | 'feminino' | 'nao_informar';
  onAddEmpresa: (empresa: { descritivo: string; createdAt: Date; identificacao: string; id: string; empresa: string }) => void;
  empresa?: Empresa | null;
}

const schema = zod.object({
  name: zod.string().min(1, {message: 'Razão Social é obrigatório'}),
  trading_name: zod.string().min(1, {message: 'Nome Fantasia é obrigatório'}),
  cnpj: zod.string().min(1, {message: 'CNPJ é obrigatório'}),
  description: zod.string().optional(),
  address: zod.string().min(1, {message: 'Endereço é obrigatório'}),
  complement: zod.string().min(1, {message: 'Complemento é obrigatório'}),
  region: zod.string().min(1, {message: 'Bairro é obrigatório'}),
  city: zod.string().min(1, {message: 'Cidade é obrigatório'}),
  state: zod.string().min(1, {message: 'Estado é obrigatório'}),
  cep: zod.string().min(1, {message: 'Cep é obrigatório'}),
  contact_email: zod.string().min(1, { message: "E-mail é obrigatório" }).email({ message: "E-mail inválido" }),
  contact_phone: zod.string().min(1, { message: "Telefone é obrigatório" }).max(12, { message: "Telefone não pode ter mais de 12 caracteres" })
                        .regex(/^\d{1,12}$/, { message: "Telefone deve conter apenas números" }),
  linkedin_url: zod.string().min(1, {message: 'Links é obrigatório'}),
  site_url: zod.string().min(1, {message: 'link é obrigatório'}),
});

type FormData = zod.infer<typeof schema>;


export function EmpresasAddForm({onClose, onAddEmpresa, empresa}: EmpresasAddFormProps): React.JSX.Element {
  const [errorDialogOpen, setErrorDialogOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const {control, handleSubmit, formState: {errors}, reset} = useForm<FormData>({
    resolver: zodResolver(schema),
      defaultValues: {
        name: '',
        trading_name: '',
        cnpj: '',
        description: '',
        address: '',
        complement: '',
        region: '',
        city: '',
        state: '',
        cep: '',
        contact_email: '',
        contact_phone: '',
        linkedin_url: '',
        site_url: '',
      },
    mode: 'onChange',
  });

  React.useEffect(() => {
    if (empresa) {
      reset({
        name: empresa.name || '',
        trading_name: empresa.trading_name || '',
        cnpj: empresa.cnpj || '',
        description: empresa.description || '',
        address: empresa.address || '',
        complement: empresa.complement || '',
        region: empresa.region || '',
        city: empresa.city || '',
        state: empresa.state || '',
        cep: empresa.cep || '',
        contact_email: empresa.contact_email || '',
        contact_phone: empresa.contact_phone || '',
        linkedin_url: empresa.linkedin_url || '',
        site_url: empresa.site_url || '',
      });
    } else {
      reset();
    }
  }, [empresa, reset]);


  const onSubmit = async (data: FormData) => {

    const newEmpresa = {
      name: data.name,
      trading_name: data.trading_name,
      cnpj: data.cnpj,
      description: data.description,
      address: data.address,
      complement: data.complement,
      region: data.region,
      city: data.city,
      state: data.state,
      cep: data.cep,
      contact_email: data.contact_email,
      contact_phone: data.contact_phone,
      linkedin_url: data.linkedin_url,
      site_url: data.site_url,
      createdAt: new Date(),
    };


    try {
      const token = localStorage.getItem('custom-auth-token');
      const response = await axios.post('https://dev-service.feicortesp.com/companies', newEmpresa, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Empresa criada com sucesso:', response.data);
      reset();
      onClose();
    } catch (error) {
      console.table(error.response?.data?.message);
      setErrorMessage(error.response?.data?.message || 'Ocorreu um erro inesperado');
      setErrorDialogOpen(true);


    }
    //const newEmpresa: { descritivo: string; createdAt: Date; identificacao: string; id: string; empresa: string } = {

    //};

    //onAddEmpresa(newEmpresa);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, onChange: (value: string) => void) => {
    const value = event.target.value.replace(/\D/g, ''); // Remove qualquer caractere que não seja dígito
    onChange(value);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader subheader="Preencha os campos abaixo" title="Adicionar empresa"/>
        <Divider/>
        <CardContent>
          <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}}>
            <Grid size={6}>
              <FormControl fullWidth error={Boolean(errors.name)}>
                <InputLabel>Razão Social</InputLabel>
                <Controller
                  name="name"
                  control={control}
                  render={({field}) => (
                    <OutlinedInput
                      {...field}
                      label="Razão Social"
                    />
                  )}
                />
                {errors.name ? <FormHelperText>{errors.name.message}</FormHelperText> : null}
              </FormControl>
            </Grid>
            <Grid size={6}>
              <FormControl fullWidth error={Boolean(errors.trading_name)}>
                <InputLabel>Nome Fantasia</InputLabel>
                <Controller
                  name="trading_name"
                  control={control}
                  render={({field}) => (
                    <OutlinedInput
                      {...field}
                      label="Nome Fantasia"
                    />
                  )}
                />
                {errors.trading_name ? <FormHelperText>{errors.trading_name.message}</FormHelperText> : null}
              </FormControl>
            </Grid>
            <Grid size={6}>
              <FormControl fullWidth error={Boolean(errors.cnpj)}>
                <InputLabel>CNPJ</InputLabel>
                <Controller
                  name="cnpj"
                  control={control}
                  render={({field}) => (
                    <InputMask
                      mask="99.999.999/9999-99"
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                    >
                      {(inputProps: any) => (
                        <OutlinedInput
                          {...inputProps}
                          inputRef={field.ref}
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
              <FormControl fullWidth error={Boolean(errors.description)}>
                <InputLabel>Descrição</InputLabel>
                <Controller
                  name="description"
                  control={control}
                  render={({field}) => (
                    <OutlinedInput
                      {...field}
                      label="Descrição"
                    />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid size={6}>
              <FormControl fullWidth error={Boolean(errors.address)}>
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
              <FormControl fullWidth error={Boolean(errors.complement)}>
                <InputLabel>Complemento</InputLabel>
                <Controller
                  name="complement"
                  control={control}
                  render={({field}) => (
                    <OutlinedInput
                      {...field}
                      label="Complemento"
                    />
                  )}
                />
                {errors.complement ? <FormHelperText>{errors.complement.message}</FormHelperText> : null}
              </FormControl>
            </Grid>
            <Grid size={6}>
              <FormControl fullWidth error={Boolean(errors.region)}>
                <InputLabel>Bairro</InputLabel>
                <Controller
                  name="region"
                  control={control}
                  render={({field}) => (
                    <OutlinedInput
                      {...field}
                      label="Bairro"
                    />
                  )}
                />
                {errors.region ? <FormHelperText>{errors.region.message}</FormHelperText> : null}
              </FormControl>
            </Grid>
            <Grid size={6}>
              <FormControl fullWidth error={Boolean(errors.city)}>
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
              <FormControl fullWidth error={Boolean(errors.state)}>
                <InputLabel>Estado</InputLabel>
                <Controller
                  name="state"
                  control={control}
                  render={({field}) => (
                    <Select
                      {...field}
                      label="Estado"
                    >
                      {estados.map((option) => (
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
              <FormControl fullWidth error={Boolean(errors.cep)}>
                <InputLabel>CEP</InputLabel>
                <Controller
                  name="cep"
                  control={control}
                  render={({field}) => (
                    <InputMask
                      mask="99999-999"
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                    >
                      {(inputProps: any) => (
                        <OutlinedInput
                          {...inputProps}
                          inputRef={field.ref}
                          label="CEP"
                        />
                      )}
                    </InputMask>
                  )}
                />
                {errors.cep ? <FormHelperText>{errors.cep.message}</FormHelperText> : null}
              </FormControl>
            </Grid>
            <Grid size={6}>
              <FormControl fullWidth error={Boolean(errors.contact_email)}>
                <InputLabel>E-mail</InputLabel>
                <Controller
                  name="contact_email"
                  control={control}
                  render={({field}) => (
                    <OutlinedInput
                      {...field}
                      label="E-mail"
                    />
                  )}
                />
                {errors.contact_email ? <FormHelperText>{errors.contact_email.message}</FormHelperText> : null}
              </FormControl>
            </Grid>
            <Grid size={6}>
              <FormControl fullWidth error={Boolean(errors.contact_phone)}>
                <InputLabel>Telefone</InputLabel>
                <Controller
                  name="contact_phone"
                  control={control}
                  render={({field}) => (
                    <OutlinedInput
                      {...field}
                      label="Telefone"
                      onChange={(event) => handleInputChange(event, field.onChange)}
                      inputProps={{
                        maxLength: 12,
                        type: "tel"
                      }}
                    />
                  )}
                />
                {errors.contact_phone ? <FormHelperText>{errors.contact_phone.message}</FormHelperText> : null}
              </FormControl>
            </Grid>
            <Grid size={6}>
              <FormControl fullWidth error={Boolean(errors.linkedin_url)}>
                <InputLabel>Links Redes Sociais</InputLabel>
                <Controller
                  name="linkedin_url"
                  control={control}
                  render={({field}) => (
                    <OutlinedInput
                      {...field}
                      label="Links Redes Sociais"
                    />
                  )}
                />
                {errors.linkedin_url ? <FormHelperText>{errors.linkedin_url.message}</FormHelperText> : null}
              </FormControl>
            </Grid>
            <Grid size={6}>
              <FormControl fullWidth error={Boolean(errors.site_url)}>
                <InputLabel>Link de Sites</InputLabel>
                <Controller
                  name="site_url"
                  control={control}
                  render={({field}) => (
                    <OutlinedInput
                      {...field}
                      label="Link de Sites"
                    />
                  )}
                />
                {errors.site_url ? <FormHelperText>{errors.site_url.message}</FormHelperText> : null}
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
      <Dialog open={errorDialogOpen} onClose={() => setErrorDialogOpen(false)}>
        <DialogTitle>Erro</DialogTitle>
        <DialogContent>
          <Typography>{errorMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setErrorDialogOpen(false)} variant="contained" color="primary"
                  sx={{ borderRadius: 2, boxShadow: 6 }}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </form>


);
}
