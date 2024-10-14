'use client'

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import type { SxProps } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import {Presentation as PresentationIcon} from "@phosphor-icons/react/dist/ssr/Presentation";


export interface EstandesProps {
  diff?: number;
  trend: 'up' | 'down';
  sx?: SxProps;
  value: string;
}

export function Estandes({ sx, value }: EstandesProps): React.JSX.Element {

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack spacing={3}>
          <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }} spacing={3}>
            <Stack spacing={1}>
              <Typography color="text.secondary" variant="overline">
                Estandes
              </Typography>
              <Typography variant="h4">{value}</Typography>
            </Stack>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#630100', borderRadius: '32px', height: '56px', width: '56px' }}>
              <PresentationIcon style={{color: '#fff'}} fontSize="var(--icon-fontSize-lg)" weight="bold"/>
            </div>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
