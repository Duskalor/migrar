import { Box, Button, Input, InputLabel, NativeSelect } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { BoxError } from '../../components/BoxError';
import { updateUsuarios } from './userThunks';

export default function FormEditUsuario({ handleClose, id }) {
  const dispatch = useDispatch();

  const { usuarios } = useSelector((state) => state.Usuarios);
  const { permisos } = useSelector((state) => state.Permisos);
  const { almacenes } = useSelector((state) => state.Almacenes);

  const { FullName, Email, Usuario, IdPermisos, IdAlmacenes } = usuarios.find(
    (Usuario) => Usuario.id === id
  );
  const { Descripcion } = permisos.find((permiso) => permiso.id === IdPermisos);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      FullName: FullName,
      email: Email,
      Usuario: Usuario,
      IdPermisos: IdPermisos,
      IdAlmacenes: IdAlmacenes,
    },
  });

  const onSubmit = (dato) => {
    dispatch(updateUsuarios({ id, ...dato }));
    handleClose();
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box>
        <InputLabel variant='standard' htmlFor='uncontrolled-native'>
          Nombre
        </InputLabel>
        <Input
          type='text'
          name='FullName'
          {...register('FullName', {
            required: true,
          })}
        />
        {errors.FullName?.type === 'required' && (
          <BoxError>El Campo es requirido </BoxError>
        )}
      </Box>
      <Box>
        <InputLabel variant='standard' htmlFor='uncontrolled-native'>
          Email
        </InputLabel>
        <Input
          name='Email'
          type='email'
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
      </Box>
      <Box>
        <InputLabel variant='standard' htmlFor='uncontrolled-native'>
          Usuario
        </InputLabel>
        <Input
          name='Usuario'
          type='text'
          {...register('Usuario', { required: true })}
        />
        {errors.Usuario?.type === 'required' && (
          <BoxError>El Campo es requirido </BoxError>
        )}
      </Box>
      {/* Almacen */}
      <Box>
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
              <option key={almacen.id} value={almacen.id}>
                {almacen.ubicacion}
              </option>
            );
          })}
        </NativeSelect>
        {errors.IdAlmacenes?.type === 'required' && (
          <BoxError>El Campo es requirido </BoxError>
        )}
      </Box>
      <Box>
        <InputLabel variant='standard' htmlFor='uncontrolled-native'>
          Permiso
        </InputLabel>
        <NativeSelect
          {...register('IdPermisos', {
            required: true,
          })}
          defaultValue={Descripcion}
        >
          {permisos.map((permiso) => {
            return (
              <option key={permiso.id} value={permiso.id}>
                {permiso.Descripcion}
              </option>
            );
          })}
        </NativeSelect>
        {errors.IdPermisos?.type === 'required' && (
          <BoxError>El Campo es requirido </BoxError>
        )}
      </Box>

      <Button type='submit'>Guardar</Button>
    </form>
  );
}
