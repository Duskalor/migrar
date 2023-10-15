import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { style } from '../style';
import ListaAlmacenes from './ListaAlmacenes';
import FormNuevoAlmacen from './FormNuevoAlmacen';
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
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          width: '100%',
          '&>button': { m: '1rem' },
        }}
      >
        <Button onClick={handleOpen} variant='contained'>
          Nuevo Almacen
        </Button>
      </Box>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby='child-modal-title'
        aria-describedby='child-modal-description'
      >
        <Box sx={{ ...style, width: 250, borderRadius: 4 }}>
          <FormNuevoAlmacen handleClose={handleClose} />
          <Box display='flex' justifyContent='flex-end'>
            <Button onClick={handleClose}>Cerrar</Button>
          </Box>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
export default function LayoutAlmacenes() {
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
        <AssignmentIcon
          sx={{ fontSize: `min(10vw, ${maxwidth ? '60px' : '75px'})` }}
        />
        Almacenes
      </ButtonLayout>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='parent-modal-title'
        aria-describedby='parent-modal-description'
      >
        <Box sx={{ ...style, width: 850, borderRadius: 4 }}>
          <ListaAlmacenes />
        </Box>
      </Modal>
    </div>
  );
}
