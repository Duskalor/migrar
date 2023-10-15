import { Box, Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { titulos } from '../style';
import { updateDatos } from './datosSlice';
import { BoxError } from '../../components/BoxError';

export default function FormEditCliente({ handleClose }) {
  const dispatch = useDispatch();
  const Datos = useSelector((state) => state.Datos);
  const { RazonSocial, Direccion, Ruc, id } = Datos;
  const [error, setError] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: { RazonSocial, Direccion, Ruc },
  });

  //console.log(datosParaEditar);
  const onSubmit = (dato) => {
    const { RazonSocial, Direccion, Ruc } = dato;
    if (
      Datos.Direccion !== Direccion ||
      Datos.Ruc !== Ruc ||
      Datos.RazonSocial !== RazonSocial
    ) {
      dispatch(updateDatos({ id, RazonSocial, Direccion, Ruc }));
      handleClose();
      reset();
    } else {
      setError('datos iguales');
    }
  };
  return (
    <Box>
      <Typography sx={titulos} variant='h4' component='h2'>
        Datos de la empresa
      </Typography>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box>
            <TextField
              sx={{
                margin: '10px 0 0 0',
              }}
              type='text'
              {...register('RazonSocial', {
                required: true,
                onChange: () => error !== null && setError(null),
              })}
              label='Razón Social'
              variant='outlined'
            />

            {errors.RazonSocial?.type === 'required' && (
              <BoxError>El Campo es requirido </BoxError>
            )}
          </Box>
          <Box>
            <TextField
              sx={{
                margin: '20px 0 0 0',
              }}
              type='number'
              {...register('Ruc', {
                onChange: () => error !== null && setError(null),
                required: true,
                maxLength: 11,
                minLength: 11,
              })}
              label='Ruc'
              variant='outlined'
            />
            {errors.Ruc?.type === 'required' && <p>El Campo es requirido </p>}
            {errors.Ruc?.type === 'maxLength' && (
              <BoxError>El debe tener 11 digitos </BoxError>
            )}
            {errors.Ruc?.type === 'minLength' && (
              <BoxError>El debe tener 11 digitos </BoxError>
            )}
          </Box>

          <Box>
            <TextField
              sx={{
                margin: '20px 0 0 0',
              }}
              type='text'
              {...register('Direccion', {
                required: true,
                onChange: () => error !== null && setError(null),
              })}
              label='Dirección'
              variant='outlined'
            />
            {errors.Direccion?.type === 'required' && (
              <BoxError>El Campo es requirido </BoxError>
            )}
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Box>
              {error && <BoxError>{error}</BoxError>}
              <Button
                sx={{
                  margin: '10px 0 0 0',
                }}
                type='submit'
                variant='contained'
              >
                Guardar
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Box>
  );
}
