import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import ListaProveedores from './ListaProveedores';
import FormNuevoProveedor from './FormNuevoProveedor';
import { style } from '../style';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import { ButtonLayout } from '../../components/ButtonLayout';

export function ChildModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button onClick={handleOpen}>Nuevo Proveedor</Button>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby='child-modal-title'
        aria-describedby='child-modal-description'
      >
        <Box sx={{ ...style, width: 270, borderRadius: 4 }}>
          <FormNuevoProveedor handleClose={handleClose} />
          <Button onClick={handleClose}>Cerrar</Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
export default function LayoutProveedores() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <ButtonLayout onClick={handleOpen}>
        <TransferWithinAStationIcon sx={{ fontSize: 70 }} />
        Proveedores
      </ButtonLayout>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='parent-modal-title'
        aria-describedby='parent-modal-description'
      >
        <Box sx={{ ...style, width: 400, borderRadius: 4 }}>
          <ListaProveedores />
          <ChildModal />
        </Box>
      </Modal>
    </div>
  );
}
