import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import CardHeader from '@mui/material/CardHeader';
import Card, { CardProps } from '@mui/material/Card';
import { Checkbox, Typography, useTheme } from '@mui/material';
import TableContainer from '@mui/material/TableContainer';


import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { IOffer } from 'src/types/offer';


// ----------------------------------------------------------------------



interface Props extends CardProps {
  title?: string;
  subheader?: string;
  tableData: IOffer[];
  selected: IOffer[];
  handleNext: () => void;
  handleSelect: (row: IOffer, selected: boolean) => void;
}

export default function BookingDetails({
  title,
  subheader,
  tableData,
  selected,
  handleSelect,
  handleNext,
  ...other
}: Props) {


  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} sx={{ mb: 3 }} titleTypographyProps={{ align: 'center' }} />

      <TableContainer sx={{ overflow: 'unset' }}>
        <Scrollbar>
          <Table>
            <TableBody>
              {tableData.map((row) => (
                <BookingDetailsRow key={row.id} row={row} handleSelect={handleSelect} selected={selected} />
              ))}
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>

      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button
          size="large"
          color="inherit"
          endIcon={<Iconify icon="eva:arrow-ios-forward-fill" width={18} sx={{ ml: -0.5 }} />}
          fullWidth
          variant='contained'
          onClick={handleNext}
        >
          Продовжити
        </Button>
      </Box>
    </Card>
  );
}

// ----------------------------------------------------------------------

type BookingDetailsRowProps = {
  row: IOffer;
  selected: IOffer[];
  handleSelect: (row: IOffer, selected: boolean) => void;
};

function BookingDetailsRow({ row, handleSelect, selected }: BookingDetailsRowProps) {
  const theme = useTheme();

  return (
    <TableRow onClick={() => {
      handleSelect(row, !selected.includes(row))
    }}>

      <TableCell sx={{ borderBottom: 'none', pr: 0, pb: 2, pt: 0 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            minHeight: 60,
            pl: 2,
            borderRadius: '10px 0 0 10px',
            backgroundColor: theme.palette.grey[200],
          }}>
          <Typography variant='subtitle1' noWrap fontWeight={'bold'}>
            {row.name}
          </Typography>
          <Typography variant='caption' noWrap sx={{ ml: 3 }}>
            {row.price} ₴
          </Typography>
          <Typography variant='caption' noWrap sx={{ ml: 3 }} color={'text.secondary'}>
            {`${Math.round(row.duration / 60)} хв`}
          </Typography>
        </Box>
      </TableCell>

      <TableCell align='center' sx={{ borderBottom: 'none', pl: 0, pb: 2, pt: 0 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 60,
            borderRadius: '0 10px 10px 0',
            backgroundColor: theme.palette.grey[200],
          }}
        >
          <Checkbox
            size='medium'
            onChange={(event, checked) => handleSelect(row, checked)}
            checked={selected.includes(row)}
          />
        </Box>
      </TableCell>

    </TableRow>
  );
}
