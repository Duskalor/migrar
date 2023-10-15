import { Box, Button, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { style, titulos } from '../style';
import { login, setError } from './authSlice';
import { BoxError } from '../../components/BoxError';
import { BoxContainer } from '../../components/BoxContainer';

export default function Login() {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.Auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (dato) => {
    dispatch(login(dato));
  };
  const handleChange = () => {
    dispatch(setError());
  };

  return (
    <Box sx={{ ...style, width: 300, borderRadius: 4 }}>
      <div>
        <Typography sx={titulos} variant='h4' component='h2'>
          login
        </Typography>

        <BoxContainer>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <TextField
                type='text'
                {...register('Usuario', {
                  onChange: handleChange,
                  required: true,
                })}
                label='Usuario'
                variant='outlined'
              />

              {errors.Usuario?.type === 'required' && (
                <BoxError>El Campo es requirido </BoxError>
              )}
            </div>
            <Box>
              <TextField
                sx={{
                  margin: '20px 0 0 0',
                }}
                type='password'
                {...register('password', {
                  onChange: handleChange,
                  required: true,
                })}
                label='Password'
                variant='outlined'
              />
              {errors.password?.type === 'required' && (
                <BoxError>El Campo es requirido </BoxError>
              )}
            </Box>
            <BoxContainer sx={{ flexDirection: 'column' }}>
              {error && <BoxError>{error}</BoxError>}
              <Button
                sx={{
                  mt: '1rem',
                }}
                variant='contained'
                type='submit'
              >
                Ingresar
              </Button>
            </BoxContainer>
          </form>
        </BoxContainer>
      </div>
    </Box>
  );
}
