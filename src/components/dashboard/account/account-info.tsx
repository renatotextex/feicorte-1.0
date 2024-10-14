'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useContext } from 'react';
import { UserContext } from '@/contexts/user-context';


const user = {
  name: 'Sofia Rivers',
  avatar: '/assets/avatar.png',
  jobTitle: 'Senior Developer',
  country: 'USA',
  city: 'Los Angeles',
  timezone: 'GTM-7',
} as const;

export function AccountInfo(): React.JSX.Element {

  const userContext = useContext(UserContext);

  return (
    <Card>
      <CardContent>
        <Stack spacing={2} sx={{ alignItems: 'center' }}>
          <div>
            <Avatar src="" sx={{ height: '80px', width: '80px' }} />
          </div>
          <Stack spacing={1} sx={{ textAlign: 'center' }}>
            <Typography variant="h5">{userContext?.user?.name}</Typography>
            <Typography color="text.secondary" variant="body2">
              {userContext?.user?.email}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              ( {userContext?.user?.type} )
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
      <Divider />
      {/*<CardActions>*/}
      {/*  <Button fullWidth variant="text">*/}
      {/*    Upload picture*/}
      {/*  </Button>*/}
      {/*</CardActions>*/}
    </Card>
  );
}
