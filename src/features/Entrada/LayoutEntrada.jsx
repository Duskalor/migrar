import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import ListaEntradas from './ListaEntradas';
import { style } from '../style';
import FormNuevaEntrada from './FormNuevaEntrada';
import { borrarEstado } from '../ProductoEntrada/productoEntradaSlice';
import { useDispatch } from 'react-redux';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { ButtonLayout } from '../../components/ButtonLayout';
import { useResponsive } from '../../utils/responsive';
export function ChildModal() {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
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
        Nuevo Entrada
      </Button>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby='child-modal-title'
        aria-describedby='child-modal-description'
        sx={{ border: 'solid 1px black' }}
      >
        <Box sx={{ ...style, width: 600 }}>
          <FormNuevaEntrada handleClose={handleClose} />
          <Button onClick={handleClose}>Cerrar</Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
export default function LayoutEntrada() {
  const maxwidth = useResponsive();
  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch();

  const handleOpen = () => {
    dispatch(borrarEstado());
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <ButtonLayout onClick={handleOpen}>
        <ArrowDownwardIcon
          sx={{ fontSize: `min(10vw, ${maxwidth ? '60px' : '75px'})` }}
        />
        Entradas
      </ButtonLayout>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='parent-modal-title'
        aria-describedby='parent-modal-description'
      >
        <Box sx={{ ...style, width: 1000, maxWidth: 1200, borderRadius: 4 }}>
          <ListaEntradas />
        </Box>
      </Modal>
    </div>
  );
}
