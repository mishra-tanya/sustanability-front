import { Stack } from '@mui/material'
import { Gauge } from '@mui/x-charts/Gauge';

function Dash() {
  return (
    <div>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 1, md: 3 }}>
      <Gauge width={100} height={100} value={60} />
      <Gauge width={100} height={100} value={60} />
      <Gauge width={100} height={100} value={60} startAngle={-90} endAngle={90} />
    </Stack>
    </div>
  )
}

export default Dash