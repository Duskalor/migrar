import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { style } from '../style';
import { ButtonLayout } from '../../components/ButtonLayout';
import ListaEmpleados from './ListaEmpleados';
import FormNuevoEmpleado from './FormNuevoEmpleado';
import { useResponsive } from '../../utils/responsive';

export function ChildModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <React.Fragment>
      <Button variant='contained' onClick={handleOpen}>
        Nuevo Empleado
      </Button>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby='child-modal-title'
        aria-describedby='child-modal-description'
      >
        <Box sx={{ ...style, width: 250, borderRadius: 4 }}>
          <FormNuevoEmpleado handleClose={handleClose} />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', pt: 2 }}>
            <Button onClick={handleClose}>Cerrar</Button>
          </Box>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
export default function LayoutEmpleados() {
  const maxwidth = useResponsive();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <ButtonLayout onClick={handleOpen}>
        <AccountCircleIcon
          sx={{ fontSize: `min(10vw, ${maxwidth ? '60px' : '75px'})` }}
        />
        Empleados
      </ButtonLayout>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='parent-modal-title'
        aria-describedby='parent-modal-description'
      >
        <Box sx={{ ...style, width: 600, borderRadius: 4 }}>
          <ListaEmpleados />
        </Box>
      </Modal>
    </div>
  );
}
