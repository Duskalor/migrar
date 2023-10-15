import { Button, TextField } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { createProveedor } from './ProveedorSlice';

export default function FormNuevoProveedor({ handleClose }) {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (dato) => {
    dispatch(createProveedor(dato));
    handleClose();
    reset();
    //console.log(d);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Nuevo Proveedor</h1>
      <div>
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
        {errors.FullName?.type === 'required' && <p>El Campo es requirido </p>}
      </div>
      <div>
        <TextField
          sx={{
            margin: '10px 0 0 0',
          }}
          type='text'
          {...register('Ruc', { required: true, maxLength: 11, minLength: 11 })}
          label='Ruc'
          variant='outlined'
        />
        {errors.Ruc?.type === 'required' && <p>El Campo es requirido </p>}
        {errors.Ruc?.type === 'maxLength' && <p>El debe tener 11 digitos </p>}
        {errors.Ruc?.type === 'minLength' && <p>El debe tener 11 digitos </p>}
      </div>

      <Button type='submit'>Crear</Button>
    </form>
  );
}
