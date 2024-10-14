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
import type { Estande } from '@/components/dashboard/estandes/estandes-table';
import {z as zod} from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import FormHelperText from "@mui/material/FormHelperText";
import Alert from "@mui/material/Alert";
import 'dayjs/locale/pt-br';
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const events = [
  {value: 'evento-1', label: 'Evento 1'},
  {value: 'evento-2', label: '2Evento'}
] as const;

interface EstandesAddFormProps {
  onClose: () => void;
  gender?: 'masculino' | 'feminino' | 'nao_informar';
  onAddEstande: (estande: { evento: string; descritivo: string; createdAt: Date; identificacao: string; id: string; estande: string }) => void;
  estande?: Estande | null;
}

const schema = zod.object({
  event: zod.string().nonempty({message: 'Evento é obrigatório'}),
  identificacao: zod.string().min(1, {message: 'Identificação é obrigatório'}),
  empresa: zod.string().optional(),
  descritivo: zod.string().optional(),
});

type FormData = zod.infer<typeof schema>;


export function EstandesAddForm({onClose, onAddEstande, estande}: EstandesAddFormProps): React.JSX.Element {
  const {control, handleSubmit, formState: {errors}, reset} = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      event: '',
      identificacao: '',
      empresa: '',
      descritivo: ''
    },
    mode: 'onChange',
  });

  React.useEffect(() => {
    if (estande) {
      reset({
        event: estande.event || '',
        identificacao: estande.identificacao || '',
        empresa: estande.empresa || '',
        descritivo: estande.descritivo || '',
      });
    } else {
      reset();
    }
  }, [estande, reset]);


  const onSubmit = (data: FormData) => {
    const newEstande: { descritivo: string; createdAt: Date; identificacao: string; id: string; estande: string } = {
      id: `REP-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      event: data.event,
      identificacao: data.identificacao,
      empresa: data.empresa,
      descritivo: data.descritivo || '',
      createdAt: new Date(),
    };

    onAddEstande(newEstande);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader subheader="Preencha os campos abaixo" title="Adicionar estande"/>
        <Divider/>
        <CardContent>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid size={6}>
              <FormControl fullWidth error={Boolean(errors.event)}>
                <InputLabel>Evento</InputLabel>
                <Controller
                  name="event"
                  control={control}
                  render={({field}) => (
                    <Select
                      {...field}
                      label="Evento"
                    >
                      {events.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                {errors.event ? <FormHelperText>{errors.event.message}</FormHelperText> : null}
              </FormControl>
            </Grid>
            <Grid size={6}>
              <FormControl fullWidth error={Boolean(errors.identificacao)}>
                <InputLabel>Número de identificação</InputLabel>
                <Controller
                  name="identificacao"
                  control={control}
                  render={({field}) => (
                    <OutlinedInput
                      {...field}
                      label="Número de identificação"
                    />
                  )}
                />
                {errors.identificacao ? <FormHelperText>{errors.identificacao.message}</FormHelperText> : null}
              </FormControl>
            </Grid>
            <Grid size={6}>
              <FormControl fullWidth error={Boolean(errors.empresa)}>
                <InputLabel>Empresa</InputLabel>
                <Controller
                  name="empresa"
                  control={control}
                  render={({field}) => (
                    <OutlinedInput
                      {...field}
                      label="empresa"
                    />
                  )}
                />
                {errors.estande ? <FormHelperText>{errors.estande.message}</FormHelperText> : null}
              </FormControl>
            </Grid>
            <Grid size={6}>
              <Controller
                name="descritivo"
                control={control}
                render={({field}) => (
                  <FormControl fullWidth error={Boolean(errors.descritivo)}>
                    {/*<InputLabel>Descritivo</InputLabel>*/}
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
                    {/*{errors.descritivo ? <FormHelperText>{errors.descritivo.message}</FormHelperText> : `${field.value.length}/200`}*/}
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
