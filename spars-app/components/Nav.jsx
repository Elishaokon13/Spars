import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { styled, alpha } from '@mui/material/styles';
import { AppBar, Toolbar, IconButton, Typography, InputBase, Button, Slide, CssBaseline, Drawer, List, ListItem, ListItemButton, ListItemText, Box, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Link from 'next/link';
import Image from 'next/image';
import { ConnectWallet } from "@thirdweb-dev/react";

import logo from '../assets/logo.png';

const drawerWidth = 240;

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.05),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.08),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  border: '1px solid ',
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  color: '#14c2a3',
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

function HideOnScroll({ children, window }) {
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

function Nav({ totalItems, window }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }} className="navBox">
      <Link href="/">
        <Box variant="h6" sx={{ my: 2 }}>
          <Image alt="logo" src={logo} />
        </Box>
      </Link>
      <Divider />
      <List className="navBox">
        <Link href="/">
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: 'start' }}>
              <ListItemText>Dashboard</ListItemText>
            </ListItemButton>
          </ListItem>
        </Link>
        <Link href="/">
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: 'start' }}>
              <ListItemText>Trade</ListItemText>
            </ListItemButton>
          </ListItem>
        </Link>
        <Link href="/">
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: 'start' }}>
              <ListItemText>Staking</ListItemText>
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll window={window}>
        <Box sx={{ display: 'flex' }}>
          <AppBar component="nav" className="navBox bg-[#0c1226]">
            <Toolbar className="flex items-center justify-center">
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
              <div className="flex justify-between w-full">
                <Typography variant="h5" component="div" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
                  <Link href="/">
                    <Image alt="logo" height={150} width={150} src={logo} />
                  </Link>
                </Typography>
                <div className="w-full lg:w-[40%] flex items-center justify-end mt-2">
                  <ConnectWallet/>
                </div>
              </div>
            </Toolbar>
          </AppBar>
          <Box component="nav" className="navBox">
            <Drawer
              container={container}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true,
              }}
              sx={{
                height: '100%',
                display: { xs: 'block', sm: 'none' },
                '& .MuiDrawer-paper': {
                  boxSizing: 'border-box',
                  width: drawerWidth,
                  backgroundColor: mobileOpen ? '#0c1226' : '#0c1226',
                },
              }}
            >
              {drawer}
            </Drawer>
          </Box>
        </Box>
      </HideOnScroll>
    </React.Fragment>
  );
}

export default Nav;
