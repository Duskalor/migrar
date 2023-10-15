import { Box, Button, TextField, Typography } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { createAlmacenes } from './almacenesSlice';
import { BoxContainer } from '../../components/BoxContainer';

export default function FormNuevoAlmacen({ handleClose }) {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (dato) => {
    dispatch(createAlmacenes(dato));
    handleClose();
    reset();
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ display: 'flex', flexDirection: 'column', gap: 5 }}
    >
      <Typography variant='h2' color='white' textAlign='center'>
        Nuevo Almacen
      </Typography>
      <BoxContainer>
        <TextField
          sx={{
            margin: '10px 0 0 0',
          }}
          type='text'
          {...register('name', {
            required: true,
          })}
          label='Nombre'
          variant='outlined'
        />

        {errors.name?.type === 'required' && <p>El Campo es requirido </p>}
      </BoxContainer>
      <BoxContainer>
        <TextField
          sx={{
            margin: '10px 0 0 0',
          }}
          type='text'
          {...register('Direccion', {
            required: true,
          })}
          label='Direccion'
          variant='outlined'
        />

        {errors.Direccion?.type === 'required' && <p>El Campo es requirido </p>}
      </BoxContainer>
      <BoxContainer>
        <TextField
          sx={{
            margin: '10px 0 0 0',
          }}
          type='text'
          {...register('ubicacion', {
            required: true,
          })}
          label='ubicacion'
          variant='outlined'
        />
        {errors.ubicacion?.type === 'required' && <p>El Campo es requirido </p>}
      </BoxContainer>

      <Box display='flex' justifyContent='center' py={1}>
        <Button variant='contained' type='submit'>
          Crear
        </Button>
      </Box>
    </form>
  );
}
