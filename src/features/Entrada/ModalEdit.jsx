import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { style } from '../style';
import FormEditEntrada from './FormEditEntrada';
import { useDispatch } from 'react-redux';
import { getDetalleEntradas } from '../ProductoEntrada/productoEntradaSlice';

export function ModalEdit({ id }) {
  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch();
  const handleOpen = () => {
    dispatch(getDetalleEntradas());
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button onClick={handleOpen}>Editar</Button>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby='child-modal-title'
        aria-describedby='child-modal-description'
      >
        <Box sx={{ ...style, width: 900 }}>
          <FormEditEntrada handleClose={handleClose} id={id} />
          {/* <FormEditCliente handleClose={handleClose} id={id} /> */}
          <Button onClick={handleClose}>Cerrar</Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
