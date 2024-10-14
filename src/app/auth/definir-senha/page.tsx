import * as React from 'react';
import type { Metadata } from 'next';

import { config } from '@/config';
import { GuestGuard } from '@/components/auth/guest-guard';
import { DefinePasswordForm } from "@/components/auth/define-password-form";
import Box from '@mui/material/Box';

export const metadata = { title: `Definir senha | Auth | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'url("/assets/fundo-senha.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.5,
          zIndex: -1,
        }}
      />
      <Box sx={{
        zIndex: 1,
        backgroundColor: '#fff',
        padding: '5rem 5rem  ',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
      }}>
        <Box
          component="img"
          alt="Widgets"
          src="/assets/logo_grande_euvou.png"
          sx={{
            height: '100%',
            width: '100%',
            maxWidth: '250px',
            display: 'flex',
            }}
        />
        <GuestGuard>
          <DefinePasswordForm />
        </GuestGuard>
      </Box>
    </Box>
  );
}
