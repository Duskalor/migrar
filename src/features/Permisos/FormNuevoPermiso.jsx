import { Box, Button, Checkbox, TextField, Typography } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { createpermisos } from './permisosSlice';
import { BoxPermiso } from '../../components/BoxPermiso';

export default function FormNuevoPermiso({ handleClose }) {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (dato) => {
    reset();
    dato.Empleados = dato.Empleados
      ? (dato.Empleados = 1)
      : (dato.Empleados = 0);
    dato.Configuracion = dato.Configuracion
      ? (dato.Configuracion = 1)
      : (dato.Configuracion = 0);
    dato.Entradas = dato.Entradas ? (dato.Entradas = 1) : (dato.Entradas = 0);
    dato.Permisos = dato.Permisos ? (dato.Permisos = 1) : (dato.Permisos = 0);
    dato.Productos = dato.Productos
      ? (dato.Productos = 1)
      : (dato.Productos = 0);
    dato.Proveedores = dato.Proveedores
      ? (dato.Proveedores = 1)
      : (dato.Proveedores = 0);
    dato.Salidas = dato.Salidas ? (dato.Salidas = 1) : (dato.Salidas = 0);
    dato.Usuarios = dato.Usuarios ? (dato.Usuarios = 1) : (dato.Usuarios = 0);
    //console.log(dato);
    dispatch(createpermisos(dato));
    handleClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ color: 'white' }}>
      <Typography variant='h2' textAlign='center' mb={1.5}>
        Nuevo Rol
      </Typography>
      <BoxPermiso>
        <TextField
          sx={{
            margin: '10px 0 0 0',
          }}
          type='text'
          {...register('Descripcion', {
            required: true,
          })}
          label='Descripción'
          variant='outlined'
        />
        {errors.Descripcion?.type === 'required' && (
          <p>El Campo es requirido </p>
        )}
      </BoxPermiso>
      <BoxPermiso>
        <label>Salidas</label>
        <Checkbox defaultChecked {...register('Salidas')} />
      </BoxPermiso>
      <BoxPermiso>
        <label>Usuarios</label>
        <Checkbox defaultChecked {...register('Usuarios')} />
      </BoxPermiso>
      <BoxPermiso>
        <label>Entradas</label>
        <Checkbox defaultChecked {...register('Entradas')} />
      </BoxPermiso>
      <BoxPermiso>
        <label>Productos</label>
        <Checkbox defaultChecked {...register('Productos')} />
      </BoxPermiso>
      <BoxPermiso>
        <label>Empleados</label>
        <Checkbox {...register('Empleados')} />
      </BoxPermiso>
      <BoxPermiso>
        <label>Proveedores</label>
        <Checkbox {...register('Proveedores')} />
      </BoxPermiso>
      <BoxPermiso>
        <label>Permisos</label>
        <Checkbox {...register('Permisos')} />
      </BoxPermiso>
      <BoxPermiso>
        <label>Configuración</label>
        <Checkbox {...register('Configuracion')} />
      </BoxPermiso>
      <Box display='flex' justifyContent='center' pt={1}>
        <Button variant='contained' type='submit'>
          Crear
        </Button>
      </Box>
    </form>
  );
}
