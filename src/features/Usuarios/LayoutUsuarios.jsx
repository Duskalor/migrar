import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import FormNuevoUsuario from './FormNuevoUsuario';
import ListaUsuarios from './ListaUsuarios';
import { style } from '../style';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
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
      <Button onClick={handleOpen} variant='contained'>
        Nuevo Usuario
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
            width: 230,
            borderRadius: 4,
            borderColor: 'rgba(255,255,255,0.2)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <FormNuevoUsuario handleClose={handleClose} />
          <Button sx={{ mt: '2rem' }} onClick={handleClose}>
            Cerrar
          </Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
export default function LayoutUsuarios() {
  const maxwidth = useResponsive();
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
        <SelfImprovementIcon
          sx={{ fontSize: `min(10vw, ${maxwidth ? '60px' : '75px'})` }}
        />
        Usuarios
      </ButtonLayout>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='parent-modal-title'
        aria-describedby='parent-modal-description'
      >
        <Box sx={{ ...style, width: 900, borderRadius: 4 }}>
          <ListaUsuarios />
        </Box>
      </Modal>
    </div>
  );
}
