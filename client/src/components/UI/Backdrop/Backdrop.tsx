import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

type TProps = {
  open: boolean;
  setOpen: (b: boolean) => void;
};

export function SimpleBackdrop({ open, setOpen }: TProps) {
  return (
    <div>
      <Backdrop
        sx={{
          color: '#fff',
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={open}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
    </div>
  );
}
