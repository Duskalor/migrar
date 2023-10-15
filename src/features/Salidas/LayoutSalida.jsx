import * as React from 'react';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { style } from '../style';
import Button from '@mui/material/Button';
import ListaSalidas from './ListaSalidas';
import FormNuevaSalida from './FormNuevaSalida';
import { borrarEstado } from '../ProductoSalidas/productosSalidaSlice';
import { useDispatch } from 'react-redux';
import { ButtonLayout } from '../../components/ButtonLayout';
import { useResponsive } from '../../utils/responsive';

export function ChildModal() {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const handleOpen = () => {
    setOpen(true);
    dispatch(borrarEstado());
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant='contained' onClick={handleOpen}>
        Nueva Salida
      </Button>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby='child-modal-title'
        aria-describedby='child-modal-description'
      >
        <Box sx={{ ...style, width: 600 }}>
          <FormNuevaSalida handleClose={handleClose} />
          <Button onClick={handleClose}>Cerrar</Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
export default function LayoutSalida() {
  const maxwidth = useResponsive();
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
    dispatch(borrarEstado());
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <ButtonLayout onClick={handleOpen}>
        <ArrowUpwardIcon
          sx={{ fontSize: `min(10vw, ${maxwidth ? '60px' : '75px'})` }}
        />{' '}
        Salidas
      </ButtonLayout>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='parent-modal-title'
        aria-describedby='parent-modal-description'
      >
        <Box sx={{ ...style, width: 850, borderRadius: 4 }}>
          <ListaSalidas />
        </Box>
      </Modal>
    </Box>
  );
}
