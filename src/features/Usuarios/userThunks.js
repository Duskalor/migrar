import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiSistema } from '../../Api/ApiSistema';
import { UsuariosSlice } from './UsuariosSlice';

export const getUsuarios = createAsyncThunk('get/getUsuarios', async () => {
  const { data } = await apiSistema.get('user');
  return data;
});
export const createUsuarios = createAsyncThunk(
  'create/postUsuarios',
  async (nuevo) => {
    // console.log({ nuevo });
    const { data } = await apiSistema.post('user/create', nuevo);
    return data;
  }
);
export const deleteUsuarios = createAsyncThunk(
  'delete/postUsuarios',
  async (id) => {
    const { data } = await apiSistema.delete(`user/delete/${id}`);
    return data;
  }
);
export const updateUsuarios = createAsyncThunk(
  'update/postUsuarios',
  async ({ id, ...Rest }) => {
    const { data } = await apiSistema.put(`user/update/${id}`, Rest);
    return data;
  }
);

export const { increment, LogoutUsuario } = UsuariosSlice.actions;
