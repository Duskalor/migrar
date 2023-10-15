import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { style } from '../style';
import ListaProductosEntrada from './ListaProductosEntrada';
import { Typography } from '@mui/material';
export function LayoutProductosEntrada({ NumeroDocumento }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button onClick={handleOpen}>{NumeroDocumento}</Button>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby='child-modal-title'
        aria-describedby='child-modal-description'
      >
        <Box sx={{ ...style, width: 500 }}>
          <Typography variant='h1' textAlign='center' py={1}>
            {NumeroDocumento}
          </Typography>
          <ListaProductosEntrada
            handleClose={handleClose}
            codigo={NumeroDocumento}
          />
          <Box display='flex' justifyContent='center' pt={1}>
            <Button variant='contained' onClick={handleClose}>
              Cerrar
            </Button>
          </Box>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
