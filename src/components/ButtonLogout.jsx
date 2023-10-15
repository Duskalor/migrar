import React from 'react';
import { logout } from '../features/Auth/authSlice';
import { useDispatch } from 'react-redux';
import { BoxContainer } from './BoxContainer';
import { Button } from '@mui/material';

export const ButtonLogout = () => {
  const dispatch = useDispatch();
  const hanleLogout = () => {
    if (window.confirm('Esta Seguro de que quiere Cerrar Sesión??')) {
      dispatch(logout());
    }
  };

  return (
    <BoxContainer pt={'0.5rem'}>
      <Button variant='contained' onClick={hanleLogout}>
        Logout
      </Button>
    </BoxContainer>
  );
};
