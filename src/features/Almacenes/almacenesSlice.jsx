import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiSistema } from '../../Api/ApiSistema';

export const getAlmacenes = createAsyncThunk('get/getAlmacenes', async () => {
  const { data } = await apiSistema.get('almacenes');

  return data;
});
export const createAlmacenes = createAsyncThunk(
  'create/postAlmacenes',
  async (nuevo) => {
    const { data } = await apiSistema.post('almacenes/create', nuevo);
    return data;
  }
);
export const deleteAlmacenes = createAsyncThunk(
  'delete/postAlmacenes',
  async (id) => {
    const { data } = await apiSistema.delete(`/almacenes/delete/${id}`);
    return data;
  }
);
export const updateAlmacenes = createAsyncThunk(
  'update/postAlmacenes',
  async ({ id, ...Rest }) => {
    const { data } = await apiSistema.put(`almacenes/update/${id}`, Rest);
    return data;
  }
);

export const almacenesSlice = createSlice({
  name: 'Almacenes',
  initialState: {
    almacenes: [],
    error: null,
    loading: false,
  },

  extraReducers: (build) => {
    build
      ///GET
      .addCase(getAlmacenes.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAlmacenes.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.almacenes = payload.ListaAlmacenes;
      })
      .addCase(getAlmacenes.rejected, (state) => {
        state.loading = false;
      })
      // CREATE
      .addCase(createAlmacenes.pending, (state) => {
        state.loading = true;
      })
      .addCase(createAlmacenes.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.almacenes = payload.ListaAlmacenes;
      })
      .addCase(createAlmacenes.rejected, (state) => {
        state.loading = false;
      })
      ///DELETE
      .addCase(deleteAlmacenes.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteAlmacenes.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.almacenes = payload.ListaAlmacenes;
      })
      .addCase(deleteAlmacenes.rejected, (state) => {
        state.loading = false;
      })
      ///UPDATE
      .addCase(updateAlmacenes.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateAlmacenes.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.almacenes = payload.ListaAlmacenes;
      })
      .addCase(updateAlmacenes.rejected, (state) => {
        state.loading = false;
      });
  },
});
