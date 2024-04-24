import { CardProps } from '@mui/material/Card';


import { IOffer } from 'src/types/offer';


// ----------------------------------------------------------------------



export interface Props extends CardProps {
  title?: string;
  subheader?: string;
  tableData: IOffer[];
  selected: IOffer[];
  handleSelect: (row: IOffer, selected: boolean) => void;
}


