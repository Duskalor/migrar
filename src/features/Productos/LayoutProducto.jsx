import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import ListaProductos from './ListaProductos';
import FormNuevoProducto from './FormNuevoProducto';
import InventoryIcon from '@mui/icons-material/Inventory';
import { style } from '../style';
import { ButtonLayout } from '../../components/ButtonLayout';
import { useResponsive } from '../../utils/responsive';

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
      <Button variant='contained' onClick={handleOpen}>
        Nuevo Producto
      </Button>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby='child-modal-title'
        aria-describedby='child-modal-description'
      >
        <Box
          sx={{
            ...style,
            width: 250,
            borderRadius: 4,
            borderColor: 'rgba(255,255,255,0.2)',
          }}
        >
          <FormNuevoProducto handleClose={handleClose} />
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <Button onClick={handleClose}>Cerrar</Button>
          </Box>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default function LayoutProducto() {
  const maxwidth = useResponsive();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <ButtonLayout onClick={handleOpen}>
        <InventoryIcon
          sx={{ fontSize: `min(10vw, ${maxwidth ? '60px' : '75px'})` }}
        />
        Productos
      </ButtonLayout>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='parent-modal-title'
        aria-describedby='parent-modal-description'
      >
        <Box
          sx={{
            ...style,
            width: 'min(1200px,80%)',
            // height: '200px',
            borderRadius: 4,
          }}
        >
          <ListaProductos />
        </Box>
      </Modal>
    </Box>
  );
}
