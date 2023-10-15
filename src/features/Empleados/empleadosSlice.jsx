import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiSistema } from '../../Api/ApiSistema';

export const getEmpleados = createAsyncThunk('get/getEmpleados', async () => {
  const { data } = await apiSistema.get('empleado');
  return data;
});
export const createEmpleados = createAsyncThunk(
  'create/postEmpleados',
  async (nuevo) => {
    const { data } = await apiSistema.post('empleado/create', nuevo);
    return data;
  }
);
export const deleteEmpleados = createAsyncThunk(
  'delete/postEmpleados',
  async (id) => {
    const { data } = await apiSistema.delete(`empleado/delete/${id}`);
    return data;
  }
);
export const updateEmpleados = createAsyncThunk(
  'update/postEmpleados',
  async ({ id, ...rest }) => {
    const { data } = await apiSistema.put(`empleado/update/${id}`, rest);
    return data;
  }
);

export const empleadosSlice = createSlice({
  name: 'Empleados',
  initialState: {
    empleados: [],
    error: null,
    loading: false,
  },

  extraReducers: (build) => {
    build
      ///GET
      .addCase(getEmpleados.pending, (state) => {
        state.loading = true;
      })
      .addCase(getEmpleados.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.empleados = payload.ListaDeEmpleados;
      })
      .addCase(getEmpleados.rejected, (state) => {
        state.loading = false;
      })
      ///CREATE
      .addCase(createEmpleados.pending, (state) => {
        state.loading = true;
      })
      .addCase(createEmpleados.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.empleados = payload.ListaDeEmpleados;
      })
      .addCase(createEmpleados.rejected, (state) => {
        state.loading = false;
      })
      ///DELETE
      .addCase(deleteEmpleados.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteEmpleados.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.empleados = payload.ListaDeEmpleados;
      })
      .addCase(deleteEmpleados.rejected, (state) => {
        state.loading = false;
      })
      ///UPDATE
      .addCase(updateEmpleados.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateEmpleados.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.empleados = payload.ListaDeEmpleados;
      })
      .addCase(updateEmpleados.rejected, (state) => {
        state.loading = false;
      });
  },
});
