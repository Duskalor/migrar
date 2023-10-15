import { Button } from '@mui/material';
import { styled } from '@mui/system';

export const ButtonLayout = styled(Button)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  // color: theme.palette.primary.main,
}));
