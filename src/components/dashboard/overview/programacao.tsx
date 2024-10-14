import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import type { SxProps } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { ArrowDown as ArrowDownIcon } from '@phosphor-icons/react/dist/ssr/ArrowDown';
import { ArrowUp as ArrowUpIcon } from '@phosphor-icons/react/dist/ssr/ArrowUp';
import { Calendar as CalendarIcon } from '@phosphor-icons/react/dist/ssr/Calendar';

export interface ProgramacaoProps {
  diff?: number;
  trend: 'up' | 'down';
  sx?: SxProps;
  value: string;
}

export function Programacao({ diff, trend, sx, value }: ProgramacaoProps): React.JSX.Element {
  const TrendIcon = trend === 'up' ? ArrowUpIcon : ArrowDownIcon;
  const trendColor = trend === 'up' ? 'var(--mui-palette-success-main)' : 'var(--mui-palette-error-main)';

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" sx={{alignItems: 'flex-start', justifyContent: 'space-between'}} spacing={3}>
            <Stack spacing={1}>
              <Typography color="text.secondary" variant="overline">
                Programação
              </Typography>
              <Stack direction="row" spacing={1} sx={{ width: 'full', alignItems: 'center' }}>
                <Typography variant="h4">{value}</Typography>
                {/*<Typography>*/}
                {/*  CADASTRADOS*/}
                {/*</Typography>*/}
              </Stack>
            </Stack>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#630100',
              borderRadius: '32px',
              height: '56px',
              width: '56px'
            }}>
              <CalendarIcon style={{color: '#fff'}} fontSize="var(--icon-fontSize-lg)" weight="bold"/>
            </div>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
