import { Box, Button, Checkbox, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { updatepermisos } from './permisosSlice';
import { BoxError } from '../../components/BoxError';
import { BoxPermiso } from '../../components/BoxPermiso';

export default function FormEditPermiso({ handleClose, id }) {
  const dispatch = useDispatch();
  //console.log(id);
  const { permisos } = useSelector((state) => state.Permisos);

  //console.log(permisos);
  const {
    Empleados,
    Configuracion,
    Descripcion,
    Entradas,
    Permisos,
    Productos,
    Proveedores,
    Salidas,
    Usuarios,
  } = permisos.find((permiso) => permiso.id === id);

  const Empleados1 = Empleados === 1 ? true : false;
  const Configuracion1 = Configuracion === 1 ? true : false;
  const Entradas1 = Entradas === 1 ? true : false;
  const Permisos1 = Permisos === 1 ? true : false;
  const Productos1 = Productos === 1 ? true : false;
  const Proveedores1 = Proveedores === 1 ? true : false;
  const Usuarios1 = Usuarios === 1 ? true : false;
  const Salidas1 = Salidas === 1 ? true : false;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    defaultValues: {
      Descripcion: Descripcion,
      Salidas: Salidas1,
      Usuarios: Usuarios1,
      Entradas: Entradas1,
      Productos: Productos1,
      Empleados: Empleados1,
      Proveedores: Proveedores1,
      Permisos: Permisos1,
      Configuracion: Configuracion1,
    },
  });

  //console.log(datosParaEditar);
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
    // console.log(id);
    dispatch(
      updatepermisos({
        id,
        dato,
      })
    );
    handleClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ color: 'white' }}>
      <Typography variant='h2' textAlign='center' mb={1.5}>
        Editar Permiso
      </Typography>
      <BoxPermiso sx={{ textAlign: 'center' }}>
        <TextField
          label='Descripción'
          type='text'
          {...register('Descripcion', {
            required: true,
          })}
        />
        {errors.Descripcion?.type === 'required' && (
          <BoxError>El Campo es requirido </BoxError>
        )}
      </BoxPermiso>

      <BoxPermiso px={1}>
        <label>Salidas</label>
        <Controller
          control={control}
          name='Salidas'
          render={({ field: { value, onChange } }) => (
            <Checkbox
              checked={value}
              onChange={(e) => {
                onChange(e.target.checked);
              }}
            />
          )}
        />
      </BoxPermiso>
      <BoxPermiso px={1}>
        <label>Usuarios</label>
        <Controller
          control={control}
          name='Usuarios'
          render={({ field: { value, onChange } }) => (
            <Checkbox
              checked={value}
              onChange={(e) => {
                onChange(e.target.checked);
              }}
            />
          )}
        />
      </BoxPermiso>
      <BoxPermiso px={1}>
        <label>Entradas</label>
        <Controller
          control={control}
          name='Entradas'
          render={({ field: { value, onChange } }) => (
            <Checkbox
              checked={value}
              onChange={(e) => {
                onChange(e.target.checked);
              }}
            />
          )}
        />
      </BoxPermiso>
      <BoxPermiso px={1}>
        <label>Productos</label>
        <Controller
          control={control}
          name='Productos'
          render={({ field: { value, onChange } }) => (
            <Checkbox
              checked={value}
              onChange={(e) => {
                onChange(e.target.checked);
              }}
            />
          )}
        />
      </BoxPermiso>
      <BoxPermiso px={1}>
        <label>Empleados</label>
        <Controller
          control={control}
          name='Empleados'
          render={({ field: { value, onChange } }) => (
            <Checkbox
              checked={value}
              onChange={(e) => {
                onChange(e.target.checked);
              }}
            />
          )}
        />
      </BoxPermiso>
      <BoxPermiso px={1}>
        <label>Proveedores</label>
        <Controller
          control={control}
          name='Proveedores'
          render={({ field: { value, onChange } }) => (
            <Checkbox
              checked={value}
              onChange={(e) => {
                onChange(e.target.checked);
              }}
            />
          )}
        />
      </BoxPermiso>
      <BoxPermiso px={1}>
        <label>Permisos</label>
        <Controller
          control={control}
          name='Permisos'
          render={({ field: { value, onChange } }) => (
            <Checkbox
              checked={value}
              onChange={(e) => {
                onChange(e.target.checked);
              }}
            />
          )}
        />
      </BoxPermiso>
      <BoxPermiso px={1}>
        <label>Configuracion</label>
        <Controller
          control={control}
          name='Configuracion'
          render={({ field: { value, onChange } }) => (
            <Checkbox
              checked={value}
              onChange={(e) => {
                onChange(e.target.checked);
              }}
            />
          )}
        />
      </BoxPermiso>

      <Box display='flex' justifyContent='center' py={1}>
        <Button variant='contained' type='submit'>
          Guardar
        </Button>
      </Box>
    </form>
  );
}
