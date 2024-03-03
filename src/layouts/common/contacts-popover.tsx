import { m } from 'framer-motion';

import IconButton from '@mui/material/IconButton';

import Iconify from 'src/components/iconify';
import { varHover } from 'src/components/animate';
import { usePopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

export default function ContactsPopover() {
  const popover = usePopover();

  return (
    <>
      <IconButton
        component={m.button}
        whileTap="tap"
        whileHover="hover"
        variants={varHover(1.05)}
        color={popover.open ? 'inherit' : 'default'}
        onClick={popover.onOpen}
        sx={{
          ...(popover.open && {
            bgcolor: (theme) => theme.palette.action.selected,
          }),
        }}
      >
        <Iconify icon="solar:users-group-rounded-bold-duotone" width={24} />
      </IconButton>
    </>
  );
}
