import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import FormEditUsuario from './FormEditUsuario';
import { style } from '../style';

export function ModalEdit({ id }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
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
        <Box
          borderRadius={4}
          sx={{
            ...style,
            width: 200,
            borderColor: 'rgba(255,255,255,0.2)',
          }}
        >
          <FormEditUsuario handleClose={handleClose} id={id} />
          <Button onClick={handleClose}>Cerrar</Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
