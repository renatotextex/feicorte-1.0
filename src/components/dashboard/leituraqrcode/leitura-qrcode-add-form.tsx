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
import type { Leitura } from '@/components/dashboard/leituraqrcode/leitura-qrcode-table';
import {z as zod} from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import FormHelperText from "@mui/material/FormHelperText";
import Alert from "@mui/material/Alert";
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import 'dayjs/locale/pt-br';
import CustomTextField from "@/components/dashboard/representantes/CustomTextField";
import TextField from "@mui/material/TextField";

const events = [
  {value: 'evento-1', label: 'Evento 1'},
] as const;

const palestrante = [
  {value: 'palestrante-1', label: 'Palestrante 1'},
] as const;



interface LeiturasAddFormProps {
  onClose: () => void;
  gender?: 'masculino' | 'feminino' | 'nao_informar';
  onAddLeitura: (leitura: Leitura) => void;
  leitura?: Leitura | null;
}

const schema = zod.object({
  idsympla: zod.string().nonempty({message: 'ID Sympla é obrigatório'}),
  event: zod.string().nonempty({message: 'Evento é obrigatório'}),
  date: zod.date().refine(value => !isNaN(value.getTime()), { message: 'Data é obrigatória' }),
  time: zod.date().refine(value => !isNaN(value.getTime()), { message: 'Hora é obrigatória' }),
  representante: zod.string().optional()
});

type FormData = zod.infer<typeof schema>;


export function LeiturasAddForm({onClose, onAddLeitura, leitura}: LeiturasAddFormProps): React.JSX.Element {
  const {control, handleSubmit, formState: {errors}, reset} = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      idsympla: '',
      event: '',
      date: undefined,
      time: undefined,
      representante: '',
    },
    mode: 'onChange',
  });

  React.useEffect(() => {
    if (leitura) {
      reset({
        idsympla: leitura.idsympla|| '',
        event: leitura.event || '',
        date: dayjs(leitura.date, 'DD/MM/YYYY').toDate(),
        time: dayjs(leitura.time, 'HH:mm').toDate(),
        representante: leitura.representante || '',
      });
    } else {
      reset();
    }
  }, [leitura, reset]);


  const onSubmit = (data: FormData) => {
    const newLeitura: Leitura = {
      id: `REP-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      idsympla: data.idsympla,
      event: data.event,
      date: dayjs(data.date).format('DD/MM/YYYY'),
      time: dayjs(data.time).format('HH:mm'),
      representante: data.representante || '',
      createdAt: new Date(),

    };

    onAddLeitura(newLeitura);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader subheader="Preencha os campos abaixo" title="Adicionar programação"/>
        <Divider/>
        <CardContent>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid size={6}>
              <FormControl fullWidth error={Boolean(errors.idsympla)}>
                <InputLabel>ID Sympla</InputLabel>
                <Controller
                  name="idsympla"
                  control={control}
                  render={({field}) => (
                    <OutlinedInput
                      {...field}
                      label="ID Sympla"
                    />
                  )}
                />
                {errors.idsympla ? <FormHelperText>{errors.idsympla.message}</FormHelperText> : null}
              </FormControl>
            </Grid>
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
                          textField: CustomTextField,
                        }}
                        ampm={false}
                      />
                    </LocalizationProvider>
                  )}
                />
                {errors?.time && <FormHelperText>{errors?.time.message}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid size={6}>
              <FormControl fullWidth error={Boolean(errors.representante)}>
                <InputLabel>Representante</InputLabel>
                <Controller
                  name="representante"
                  control={control}
                  render={({field}) => (
                    <OutlinedInput
                      {...field}
                      label="Representante"
                    />
                  )}
                />
                {errors.representante ? <FormHelperText>{errors.representante.message}</FormHelperText> : null}
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
