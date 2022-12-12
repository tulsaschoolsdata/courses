import React from 'react'
import AppBar from '@mui/material/AppBar'
import { createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Footer from '../components/footer'
import PageContainer from './page-container'
import SchoolIcon from '@mui/icons-material/School'
import ThemeProvider from '@mui/material/styles/ThemeProvider'
import Typography from '@mui/material/Typography'
import Toolbar from '@mui/material/Toolbar'

const theme = createTheme()

export default function Layout({ children }) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <SchoolIcon sx={{ mr: 2 }} />
            <Typography variant="h6" color="inherit" noWrap>
              Course Catalog - Tulsa Public Schools
            </Typography>
          </Toolbar>
        </AppBar>
        <PageContainer>{children}</PageContainer>
        <Footer />
      </ThemeProvider>
    </>
  )
}
