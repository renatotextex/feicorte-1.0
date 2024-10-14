'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';

import { authClient } from '@/lib/auth/client';
import {paths} from "@/paths";
import {useRouter} from "next/navigation";

const schema = zod.object({
  password: zod.string().min(6, { message: 'Senha é obrigatório' }),
  repeatpassword: zod.string().min(6, { message: 'Confirmar a senha é obrigatório' })
});

type Values = zod.infer<typeof schema>;

const defaultValues = { password: '', repeatpassword: '' } satisfies Values;

export function DefinePasswordForm(): React.JSX.Element {
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
    <Stack spacing={1}>
      <Stack direction="row" alignItems="center" justifyContent="center">
        {/*<IconButton onClick={handleBack} >*/}
        {/*  <ArrowBackIcon />*/}
        {/*</IconButton>*/}
      <Typography variant="h5">Defina sua nova senha</Typography>
    </Stack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <FormControl error={Boolean(errors.password)}>
                <InputLabel>Nova senha</InputLabel>
                <OutlinedInput {...field} label="Nova senha" type="password" />
                {errors.password ? <FormHelperText>{errors.password.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
          <Stack alignItems="center" width="100%">
            <Typography align="left" variant="body2" style={{ maxWidth: '200px' }}>
            A sua senha deve conter pelo menos 6 caracteres,
            1 letra maiúscula e 1 letra minúscula.</Typography>
          </Stack>
          <Controller
            control={control}
            name="repeatpassword"
            render={({ field }) => (
              <FormControl error={Boolean(errors.repeatpassword)}>
                <InputLabel>Confirmar nova senha</InputLabel>
                <OutlinedInput {...field} label="Confirmar nova senha" type="password" />
                {errors.repeatpassword ? <FormHelperText>{errors.repeatpassword.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
          {/*{errors.root ? <Alert color="error">{errors.root.message}</Alert> : null}*/}
          <Button disabled={isPending} type="submit" variant="contained">
            Salvar
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}
