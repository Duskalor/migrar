import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { style } from '../style';
import { ButtonLayout } from '../../components/ButtonLayout';
import { Reportes } from './Reportes';
import { Typography } from '@mui/material';
import { useResponsive } from '../../utils/responsive';
export default function LayoutReports() {
  const maxwidth = useResponsive();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <ButtonLayout onClick={handleOpen}>
        <AssignmentIcon
          sx={{ fontSize: `min(10vw, ${maxwidth ? '60px' : '75px'})` }}
        />
        Reportes
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
            width: 380,
            borderRadius: 4,
          }}
        >
          <Box>
            <Typography variant='h3' textAlign='center' py={1}>
              Generar Reportes
            </Typography>
            <Reportes handleClose={handleClose} />
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
