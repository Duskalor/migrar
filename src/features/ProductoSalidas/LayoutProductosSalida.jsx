import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { style } from '../style';
import ListaProductosSalida from './ListaProductosSalida';
import { Typography } from '@mui/material';
import { BoxContainer } from '../../components/BoxContainer';
export function LayoutProductosSalida({ NumeroDocumento }) {
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
        // hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby='child-modal-title'
        aria-describedby='child-modal-description'
      >
        <Box sx={{ ...style, width: 600 }}>
          <Typography py={1} sx={{ textAlign: 'center' }} variant='h1'>
            {NumeroDocumento}
          </Typography>
          <ListaProductosSalida
            handleClose={handleClose}
            codigo={NumeroDocumento}
          />
          <BoxContainer py={1}>
            <Button variant='contained' onClick={handleClose}>
              Cerrar
            </Button>
          </BoxContainer>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
