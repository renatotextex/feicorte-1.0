'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { authClient } from '@/lib/auth/client';
import IconButton from "@mui/material/IconButton";
import {paths} from "@/paths";
import {useRouter} from "next/navigation";

const schema = zod.object({ email: zod.string().min(1, { message: 'Email é obrigatório' }).email() });

type Values = zod.infer<typeof schema>;

const defaultValues = { email: '' } satisfies Values;

export function ResetPasswordForm(): React.JSX.Element {
  const [isPending, setIsPending] = React.useState<boolean>(false);

  const router = useRouter();

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

  const onSubmit = React.useCallback(
    async (values: Values): Promise<void> => {
      setIsPending(true);

      const { error } = await authClient.resetPassword(values);

      if (error) {
        setError('root', { type: 'server', message: error });
        setIsPending(false);
        return;
      }

      setIsPending(false);

      // Redirect to confirm password reset
    },
    [setError]
  );

  const handleBack = () => {
    router.replace(paths.auth.signIn);
  };

  return (
    <Stack spacing={4}>
      <Stack direction="row" alignItems="center">
        <IconButton onClick={handleBack} >
          <ArrowBackIcon />
        </IconButton>
      <Typography variant="h5">Informe seu e-mail cadastrado</Typography>
    </Stack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <FormControl error={Boolean(errors.email)}>
                <InputLabel>Digite seu e-mail</InputLabel>
                <OutlinedInput {...field} label="Digite seu e-mail" type="email" />
                {errors.email ? <FormHelperText>{errors.email.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
          {errors.root ? <Alert color="error">{errors.root.message}</Alert> : null}
          <Button disabled={isPending} type="submit" variant="contained">
            Recuperar senha
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}
