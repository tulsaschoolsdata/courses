import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import Footer from '/components/footer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import MenuIcon from '@mui/icons-material/Menu'
import PageContainer from '/components/page-container'
import PropTypes from 'prop-types'
import { React, useState } from 'react'
import SchoolIcon from '@mui/icons-material/School'
import ThemeProvider from '@mui/material/styles/ThemeProvider'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { createTheme } from '@mui/material/styles'
import Link from 'next/link'
import Head from 'next/head'

export default function Layout({ children, window }) {
  const theme = createTheme()
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  const drawerWidth = 240
  const navItems = [
    ['Home', '/'],
    ['Courses', '/courses'],
    ['Schools', '/schools'],
    ['Map', 'https://findaschool.tulsaschools.org'],
  ]
  const container =
    window !== undefined ? () => window().document.body : undefined

  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Course Catalog
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item[0]} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }} component={Link} href={item[1]}>
              <ListItemText>
                {item[0]}
              </ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Head>
        <link rel="icon" href="/images/tps-logo-color.svg" />
      </Head>
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

            <SchoolIcon sx={{ mr: 2, display: { xs: 'none', sm: 'block' } }} />
            <Typography
              variant="h6"
              component="span"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              Course Catalog - Tulsa Public Schools
            </Typography>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              {navItems.map((item) => (
                <Button key={item} component={Link} href={item[1]}>
                  {item[0]}
                </Button>
              ))}
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
              keepMounted: true,
            }}
            sx={{
              'display': { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
        <Box component="main" sx={{ width: '100%' }}>
          <PageContainer>{children}</PageContainer>
        </Box>
      </Box>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  window: PropTypes.func,
}
