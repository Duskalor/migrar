import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import FormEditDatos from './FormEditDatos';
import BusinessIcon from '@mui/icons-material/Business';
import { style } from '../style';
import { ButtonLayout } from '../../components/ButtonLayout';
import { useResponsive } from '../../utils/responsive';
export default function LayoutDatos() {
  const [open, setOpen] = React.useState(false);
  const maxwidth = useResponsive();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box>
      <ButtonLayout onClick={handleOpen}>
        <BusinessIcon
          sx={{ fontSize: `min(10vw, ${maxwidth ? '60px' : '75px'})` }}
        />
        Datos
      </ButtonLayout>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='parent-modal-title'
        aria-describedby='parent-modal-description'
      >
        <Box sx={{ ...style, width: 400, borderRadius: 4 }}>
          <FormEditDatos handleClose={handleClose} />
        </Box>
      </Modal>
    </Box>
  );
}
