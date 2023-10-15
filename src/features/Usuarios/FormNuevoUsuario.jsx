import {
  Box,
  Button,
  InputLabel,
  NativeSelect,
  TextField,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { BoxError } from '../../components/BoxError';
import { BoxContainer } from '../../components/BoxContainer';
import { createUsuarios } from './userThunks';
export default function FormNuevoUsuario({ handleClose }) {
  const { permisos } = useSelector((state) => state.Permisos);
  const { almacenes } = useSelector((state) => state.Almacenes);
  const dispatch = useDispatch();
  //console.log(permisos);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (dato) => {
    dispatch(createUsuarios(dato));
    handleClose();
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant='h1' py={2}>
        Nuevo Usuario
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '.9rem',
        }}
      >
        <BoxContainer>
          {/* <InputLabel variant='standard' htmlFor='uncontrolled-native'>
          Nombre
        </InputLabel> */}
          <TextField
            label='Nombre'
            type='text'
            {...register('FullName', {
              required: true,
            })}
          />
          {errors.FullName?.type === 'required' && (
            <BoxError>El Campo es requirido </BoxError>
          )}
        </BoxContainer>
        <BoxContainer>
          {/* <InputLabel variant='standard' htmlFor='uncontrolled-native'>
          Usuario
        </InputLabel> */}
          <TextField
            label='Usuario'
            type='text'
            {...register('Usuario', {
              required: true,
            })}
          />
          {errors.Usuario?.type === 'required' && <p>El Campo es requirido </p>}
        </BoxContainer>
        <BoxContainer>
          {/* <InputLabel variant='standard' htmlFor='uncontrolled-native'>
          Email
        </InputLabel> */}
          <TextField
            label='Email'
            type='text'
            {...register('email', {
              required: true,
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Formato Incorrecto',
              },
            })}
          />
          {errors.email?.type === 'required' && (
            <BoxError>El Campo es requirido </BoxError>
          )}
          {errors.email?.type === 'pattern' && (
            <BoxError>{errors.email.message}</BoxError>
          )}
        </BoxContainer>

        <BoxContainer sx={{ flexDirection: 'column', textAlign: 'center' }}>
          <InputLabel variant='standard' htmlFor='uncontrolled-native'>
            Permisos
          </InputLabel>
          <NativeSelect
            {...register('IdPermisos', {
              required: true,
            })}
          >
            {permisos.map((permiso) => {
              return (
                <option
                  key={permiso.id}
                  value={permiso.id}
                  style={{ textAlign: 'center' }}
                >
                  {permiso.Descripcion}
                </option>
              );
            })}
          </NativeSelect>
          {errors.IdPermisos?.type === 'required' && (
            <BoxError>El Campo es requirido </BoxError>
          )}
        </BoxContainer>

        {/* Almacen */}
        <BoxContainer sx={{ flexDirection: 'column', textAlign: 'center' }}>
          <InputLabel variant='standard' htmlFor='uncontrolled-native'>
            Almacenes
          </InputLabel>
          <NativeSelect
            {...register('IdAlmacenes', {
              required: true,
            })}
          >
            {almacenes.map((almacen) => {
              return (
                <option
                  key={almacen.id}
                  value={almacen.id}
                  style={{ textAlign: 'center' }}
                >
                  {almacen.ubicacion}
                </option>
              );
            })}
          </NativeSelect>
          {errors.IdAlmacenes?.type === 'required' && (
            <BoxError>El Campo es requirido </BoxError>
          )}
        </BoxContainer>

        <BoxContainer>
          {/* <InputLabel variant='standard' htmlFor='uncontrolled-native'>
          Password
        </InputLabel> */}
          <TextField
            label='Password'
            type='password'
            {...register('password', {
              required: true,
              minLength: 6,
            })}
          />
          {errors.Password?.type === 'required' && (
            <BoxError>El Campo es requirido </BoxError>
          )}
          {errors.Password?.type === 'minLength' && (
            <BoxError>El debe tener 6 digitos </BoxError>
          )}
        </BoxContainer>
        {/* CONFIRMACION PASSWORD */}
        <BoxContainer>
          {/* <InputLabel variant='standard' htmlFor='uncontrolled-native'>
          Confirmar Password
        </InputLabel> */}
          <TextField
            label='Confirmar Password'
            type='password'
            {...register('password_confirmation', {
              required: true,
              minLength: 6,
            })}
          />
          {errors.password_confirmation?.type === 'required' && (
            <BoxError>El Campo es requirido </BoxError>
          )}
          {errors.password_confirmation?.type === 'minLength' && (
            <BoxError>El debe tener 6 digitos </BoxError>
          )}
        </BoxContainer>
        <Button variant='contained' type='submit'>
          Crear
        </Button>
      </Box>
    </form>
  );
}
