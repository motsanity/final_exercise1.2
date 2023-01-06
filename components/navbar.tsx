import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link'
import { useRouter } from "next/router"
import { getCookie, hasCookie } from "cookies-next"
import cookie from 'js-cookie'

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const drawerWidth: number = 240;


export default function DrawerAppBar(props: Props) {
  const router = useRouter()
  const token = getCookie("token")
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  if (hasCookie("token")) {
    const drawer = (
      <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
        <Typography variant="h6" sx={{ my: 2 }}>
          Exercise 1.2
        </Typography>
        <Divider />
        <List>

          <ListItem key="Home" disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>

        </List>
        <List>

          <ListItem key="Profile" disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary="Profile" />
            </ListItemButton>
          </ListItem>

        </List>
        <List>

          <ListItem key="Contact" disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary="Contact" />
            </ListItemButton>
          </ListItem>

        </List>
        <List>

          <ListItem key="Logout" disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>

        </List>
      </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
      <Box sx={{ display: 'flex' }}>
        <AppBar component="nav">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              Exercise 1.2
            </Typography>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>

              <Link>
                <Button key="Home" sx={{ color: '#fff' }} onClick={() => {

                  router.replace(`../`)

                }}>
                  Home
                </Button>
              </Link>
              <Link>
                <Button key="Contact" sx={{ color: '#fff' }} onClick={() => {

                  router.replace(`../contact`)

                }}>
                  Contact
                </Button>
              </Link>
              <Link>
                <Button key="Profile" sx={{ color: '#fff' }} onClick={() => {

                  router.replace(`../profile/${token}`)

                }}>
                  Profile
                </Button>
              </Link>
              <Link href=''>
                <Button key="Logout" sx={{ color: '#fff' }} onClick={() => {
                  cookie.remove("token")
                }}>
                  Logout
                </Button>
              </Link>


            </Box>
          </Toolbar>
        </AppBar>
        <Box component="nav">
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
        <Box component="main" sx={{ p: 3 }}>
          <Toolbar />
        </Box>
      </Box>
    );

  }

  // no token session

  else {
    const drawer = (
      <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
        <Typography variant="h6" sx={{ my: 2 }}>
          Exercise 1.2
        </Typography>
        <Divider />
        <List>

          <ListItem key="Home" disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>

        </List>
        <List>

          <ListItem key="Contact" disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary="Contact" />
            </ListItemButton>
          </ListItem>

        </List>
        <List>

          <ListItem key="Login" disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary="Login" />
            </ListItemButton>
          </ListItem>

        </List>
        <List>

          <ListItem key="Profile" disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary="Profile" />
            </ListItemButton>
          </ListItem>

        </List>
        <List>

          <ListItem key="Register" disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary="Register" />
            </ListItemButton>
          </ListItem>

        </List>
      </Box>
    );
    const container = window !== undefined ? () => window().document.body : undefined;

    return (
      <Box sx={{ display: 'flex' }}>
        <AppBar component="nav">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              Exercise 1.2
            </Typography>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>

              <Link>
                <Button key="Home" sx={{ color: '#fff' }} onClick={() => {

                  router.replace(`./`)

                }} >
                  Home
                </Button>
              </Link>
              <Link>
                <Button key="Login" sx={{ color: '#fff' }} onClick={() => {

                  router.replace(`./login`)

                }}>
                  Login
                </Button>
              </Link>
              <Link>
                <Button key="Profile" sx={{ color: '#fff' }} onClick={() => {

                  router.replace(`profile/${token}`)

                }}>
                  Profile
                </Button>
              </Link>
              <Link>
                <Button key="Contact" sx={{ color: '#fff' }} onClick={() => {

                  router.replace(`./contact`)

                }}>
                  Contact
                </Button>
              </Link>
              <Link>
                <Button key="Register" sx={{ color: '#fff' }} onClick={() => {

                  router.replace(`./register`)

                }}>
                  Register
                </Button>
              </Link>


            </Box>
          </Toolbar>
        </AppBar>
        <Box component="nav">
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
        <Box component="main" sx={{ p: 3 }}>
          <Toolbar />
        </Box>
      </Box>
    );

  }



}