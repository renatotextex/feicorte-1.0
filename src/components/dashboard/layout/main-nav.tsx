'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import PersonIcon from '@mui/icons-material/Person'

import { List as ListIcon } from '@phosphor-icons/react/dist/ssr/List';

import { usePopover } from '@/hooks/use-popover';

import { MobileNav } from './mobile-nav';
import { UserPopover } from './user-popover';

export function MainNav(): React.JSX.Element {
  const [openNav, setOpenNav] = React.useState<boolean>(false);

  const userPopover = usePopover<HTMLDivElement>();

  return (
    <React.Fragment>
      <Box
        component="header"
        sx={{
          borderBottom: '1px solid var(--mui-palette-divider)',
          backgroundColor: 'var(--mui-palette-background-paper)',
          position: 'sticky',
          top: 0,
          zIndex: 'var(--mui-zIndex-appBar)',
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          sx={{ alignItems: 'center', justifyContent: 'space-between', minHeight: '64px', px: 2 }}
        >
          <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
            <IconButton
              onClick={(): void => {
                setOpenNav(true);
              }}
              sx={{ display: { lg: 'none' } }}
            >
              <ListIcon />
            </IconButton>
            {/*<Tooltip title="Search">*/}
            {/*  <IconButton>*/}
            {/*    <MagnifyingGlassIcon />*/}
            {/*  </IconButton>*/}
            {/*</Tooltip>*/}
          </Stack>
          <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
            {/*<Tooltip title="Contacts">*/}
            {/*  <IconButton>*/}
            {/*    <UsersIcon />*/}
            {/*  </IconButton>*/}
            {/*</Tooltip>*/}
            {/*<Tooltip title="Notifications">*/}
            {/*  <Badge badgeContent={1} color="success" variant="dot">*/}
            {/*    <IconButton>*/}
            {/*      <BellIcon />*/}
            {/*    </IconButton>*/}
            {/*  </Badge>*/}
            {/*</Tooltip>*/}
            <Avatar
              onClick={userPopover.handleOpen}
              ref={userPopover.anchorRef}
              sx={{ cursor: 'pointer', bgcolor: 'primary.main' }} // Ajuste a cor de fundo conforme necessário
            >
              <PersonIcon sx={{ color: 'white' }} /> {/* Ícone de perfil */}
            </Avatar>
          </Stack>
        </Stack>
      </Box>
      <UserPopover anchorEl={userPopover.anchorRef.current} onClose={userPopover.handleClose} open={userPopover.open} />
      <MobileNav
        onClose={() => {
          setOpenNav(false);
        }}
        open={openNav}
      />
    </React.Fragment>
  );
}
