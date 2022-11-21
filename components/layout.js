import React, { useEffect, useState, useRef } from 'react'
import AppBar from '@mui/material/AppBar'
import { createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Footer from '../components/footer'
import Grid from '@mui/material/Grid'
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
        <AppBar position="relative">
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
