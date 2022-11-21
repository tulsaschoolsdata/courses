import React from 'react'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

export default function Footer() {
  function LearnMore() {
    return (
      <Typography variant="body2" color="text.secondary" align="center">
        <Link
          color="inherit"
          href="https://www.tulsaschools.org/about"
          target="_blank"
        >Click here</Link> to learn more about TPS.
      </Typography>
    )
  }
  
  function Copyright() {
    return (
      <Typography variant="body2" color="text.secondary" align="center">
        {'Copyright © '}
        <Link
          color="inherit"
          href="https://courses.tulsaschools.org/"
          target="_blank"
        >
          Tulsa Public Schools
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    )
  }
  
  return (
    <Box sx={{ bgcolor: 'background.paper', pt: 16, pb: 1 }} component="footer">
      <Divider />
      <Typography
        variant="subtitle1"
        align="center"
        color="text.secondary"
      >
        <LearnMore />
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color="text.secondary"
      >
        <Copyright />
      </Typography>
    </Box>
  )
}
