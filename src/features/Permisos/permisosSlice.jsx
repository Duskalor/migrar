import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiSistema } from '../../Api/ApiSistema';

export const getpermisos = createAsyncThunk('get/getpermisos', async (_) => {
  const { data } = await apiSistema.get('permisos');

  return data;
});
export const createpermisos = createAsyncThunk(
  'create/postpermisos',
  async (nuevo) => {
    const { data } = await apiSistema.post('permisos/create', nuevo);
    return data;
  }
);
export const deletepermisos = createAsyncThunk(
  'delete/postpermisos',
  async (id) => {
    const { data } = await apiSistema.delete(`permisos/delete/${id}`);
    return data;
  }
);
export const updatepermisos = createAsyncThunk(
  'update/postpermisos',
  async ({ id, dato }) => {
    const { data } = await apiSistema.put(`permisos/update/${id}`, dato);
    return data;
  }
);

export const permisosSlice = createSlice({
  name: 'Permisos',
  initialState: {
    permisos: [],
    error: null,
    loading: false,
  },
  reducers: {
    LogoutPermisos: (state) => {
      state.permisos = [];
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (build) => {
    // getpermisos
    build
      .addCase(getpermisos.pending, (state) => {
        state.loading = true;
      })
      .addCase(getpermisos.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.permisos = payload.Listapermisos;
      })
      .addCase(getpermisos.rejected, (state, { error }) => {
        state.loading = true;
      })
      // createpermisos
      .addCase(createpermisos.pending, (state) => {
        state.loading = true;
      })
      .addCase(createpermisos.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.permisos = payload.Listapermisos;
      })
      .addCase(createpermisos.rejected, (state) => {
        state.loading = true;
      })
      // deletepermisos
      .addCase(deletepermisos.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletepermisos.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.permisos = payload.Listapermisos;
      })
      .addCase(deletepermisos.rejected, (state) => {
        state.loading = true;
      })

      // UpdatePermisos
      .addCase(updatepermisos.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatepermisos.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.permisos = payload.Listapermisos;
      })
      .addCase(updatepermisos.rejected, (state) => {
        state.loading = true;
      });
  },
});

export const { LogoutPermisos } = permisosSlice.actions;
