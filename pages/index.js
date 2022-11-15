import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SchoolIcon from '@mui/icons-material/School';

function LearnMore() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      <Link
        color="inherit"
        href="https://www.tulsaschools.org/about"
        target="_blank"
      >Click here</Link> to learn more about TPS.
    </Typography>
  );
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
  );
}

const theme = createTheme();

export default function Courses({ courses }) {
  return (
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
      <main>
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 2,
            pb: 2
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h4"
              variant="h4"
              align="center"
              color="text.primary"
            >
              Courses
            </Typography>
          </Container>
        </Box>
        <Container maxWidth="md">
          <Grid container spacing={4}>
            {courses.map((course) => (
              <Grid item key={course.number} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="img"
                    image={course.url}
                    alt="random"
                    height={50}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {course.name}
                    </Typography>
                    <Typography>
                      {course.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>

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
    </ThemeProvider>
  );
}

Courses.propTypes = {
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      number: PropTypes.number.isRequired,
      url: PropTypes.string.isRequired
    })
  )
}

export async function getStaticProps() {
  const courses = [...Array(10).keys()].map(n => (
    {
      name: `Course ${n}`,
      description: `Course ${n} description goes here.`,
      number: n,
      url: 'https://source.unsplash.com/random'
    }
  ))

  return {
    props: {
      courses
    }
  }
}
