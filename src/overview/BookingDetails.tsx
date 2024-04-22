import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CardHeader from '@mui/material/CardHeader';
import Card from '@mui/material/Card';
import { Checkbox, Typography } from '@mui/material';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { Props } from './booking-details';


export default function BookingDetails({
  title, subheader, tableData, selected, handleSelect, handleNext, ...other
}: Props) {
  const userAgent = typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent;
  const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);


  return (
    <Card {...other}>
      <CardHeader title={title} sx={{ mb: 3 }} titleTypographyProps={{ variant: 'h2' }} />

      <Scrollbar>
        {tableData.map((row) => (
          <Card
            onClick={() => handleSelect(row, !selected.includes(row))}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              ml: 3,
              mr: 3,
              mb: 2,
              p: 2,
              borderWidth: selected.includes(row) ? 1 : 0,
              borderColor: 'primary.main',
              borderStyle: 'solid',
              cursor: 'pointer',
              '&:hover': { backgroundColor: 'primary.lighter' },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: 30,
                mr: 2,
              }}
            >
              <Checkbox
                size='medium'
                checked={selected.includes(row)} />
            </Box>
            <Box
              pt={mobile ? 1 : 0}
              sx={{
                display: 'flex',
                flexDirection: mobile ? 'column' : 'row',
                alignItems: mobile ? 'flex-start' : 'center',
                justifyContent: 'space-between',
                minHeight: 30,
                pr: 2,
                flex: 1,
              }}>
              <Typography variant='body1'>
                {row.name}
              </Typography>
              <Box display={'flex'}>
                <Typography variant='body2' noWrap sx={{ ml: mobile ? 0 : 3 }}>
                  {row.price} ₴
                </Typography>
                <Typography variant='body2' noWrap sx={{ ml: 3 }} color={'text.secondary'}>
                  {`${Math.round(row.duration / 60)} хв`}
                </Typography>
              </Box>
            </Box>
          </Card>
        ))}
      </Scrollbar>

      <Box sx={{ p: 2, textAlign: 'right', m: 1 }}>
        <Button
          size="large"
          color="primary"
          endIcon={<Iconify icon="eva:arrow-ios-forward-fill" width={18} sx={{ ml: -0.5 }} />}
          fullWidth
          variant='contained'
          onClick={handleNext}
          disabled={selected.length === 0}
        >
          Продовжити
        </Button>
      </Box>
    </Card>
  );
}
