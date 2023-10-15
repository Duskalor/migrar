import PrintIcon from '@mui/icons-material/Print';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { style } from '../style';
import ForPrint from './ForPrint';
import React from 'react';
import { Button } from '@mui/material';
export default function ModalPrint({ ToPrint }) {
  const [open, setOpen] = React.useState(false);
  //console.log(ToPrint);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleOpen}>
        <PrintIcon sx={{ fontSize: 30 }} />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='parent-modal-title'
        aria-describedby='parent-modal-description'
      >
        <Box sx={{ ...style, width: 800, background: 'white' }}>
          <ForPrint ToPrint={ToPrint} />
        </Box>
      </Modal>
    </div>
  );
}
