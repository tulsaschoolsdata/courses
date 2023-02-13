import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

export default function HeaderWithRecordCount({ title, records }) {
  return (
    <Grid
      container
      sx={{ mb: 2 }}
      justifyContent="space-between"
      alignItems="flex-end"
      data-test="recordCount"
    >
      <Typography variant="h4" color="inherit">
        {title}
      </Typography>

      {records > 0 ? (
        <Typography variant="h6" component="span">
          {`${records} records`}
        </Typography>
      ) : (
        <></>
      )}
    </Grid>
  )
}
