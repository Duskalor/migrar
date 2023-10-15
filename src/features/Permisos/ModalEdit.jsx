import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import FormEditPermiso from './FormEditPermiso';
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
        <Box sx={{ ...style, width: 200 }}>
          <FormEditPermiso handleClose={handleClose} id={id} />
          <Box display='flex' justifyContent='flex-end' mt={1}>
            <Button onClick={handleClose}>Cerrar</Button>
          </Box>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
