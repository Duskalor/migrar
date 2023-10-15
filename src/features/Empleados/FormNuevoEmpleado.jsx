import { Button, TextField, Typography } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { createEmpleados } from './empleadosSlice';
import { BoxError } from '../../components/BoxError';
import { BoxContainer } from '../../components/BoxContainer';

export default function FormNuevoEmpleado({ handleClose }) {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (dato) => {
    dispatch(createEmpleados(dato));
    handleClose();
    reset();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ color: 'white' }}>
      <Typography
        variant='h1'
        component='h3'
        sx={{ textAlign: 'center', py: 2 }}
      >
        Nuevo Empleado
      </Typography>
      <BoxContainer>
        <TextField
          sx={{
            margin: '10px 0 0 0',
          }}
          type='text'
          {...register('FullName', {
            required: true,
          })}
          label='Nombre'
          variant='outlined'
        />

        {errors.FullName?.type === 'required' && (
          <BoxError>El Campo es requirido </BoxError>
        )}
      </BoxContainer>
      <BoxContainer>
        <TextField
          sx={{
            margin: '10px 0 0 0',
          }}
          type='text'
          {...register('Cargo', { required: true })}
          label='Cargo'
          variant='outlined'
        />
        {errors.Cargo?.type === 'required' && (
          <BoxError>El Campo es requirido </BoxError>
        )}
      </BoxContainer>

      <BoxContainer mt={2}>
        <Button variant='contained' type='submit'>
          Crear
        </Button>
      </BoxContainer>
    </form>
  );
}
