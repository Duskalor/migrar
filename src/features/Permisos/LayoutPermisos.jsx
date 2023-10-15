import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import ListaPermisos from './ListaPermisos';
import FormNuevoPermiso from './FormNuevoPermiso';
import { style } from '../style';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
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
      <Box display='flex' justifyContent='flex-end' py={1}>
        <Button variant='contained' onClick={handleOpen}>
          Nuevo Permiso
        </Button>
      </Box>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby='child-modal-title'
        aria-describedby='child-modal-description'
      >
        <Box sx={{ ...style, width: 200, borderRadius: 4 }}>
          <FormNuevoPermiso handleClose={handleClose} />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', pt: 2 }}>
            <Button onClick={handleClose}>Cerrar</Button>
          </Box>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
export default function LayoutPermisos() {
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
        <ManageAccountsIcon
          sx={{ fontSize: `min(10vw, ${maxwidth ? '60px' : '75px'})` }}
        />
        Permisos
      </ButtonLayout>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='parent-modal-title'
        aria-describedby='parent-modal-description'
      >
        <Box sx={{ ...style, width: 1050, borderRadius: 4 }}>
          <ListaPermisos />
        </Box>
      </Modal>
    </div>
  );
}
