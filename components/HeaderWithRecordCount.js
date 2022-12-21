import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

export default function HeaderWithRecordCount({title, records}) {
  return (
    <Grid
      container
      sx={{ mb: 2 }}
      justifyContent="space-between"
      alignItems="flex-end"
    >
      <Typography variant="h4" color="inherit">
        {title}
      </Typography>
      <Typography variant="h6" component="span">
        {`${records.length} records`}
      </Typography>
    </Grid>
  )
}
