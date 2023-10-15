import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiSistema } from '../../Api/ApiSistema';

export const getDatos = createAsyncThunk('get/getDatos', async () => {
  const { data } = await apiSistema.get('datos');
  return data;
});

export const updateDatos = createAsyncThunk(
  'update/updateDatos',
  async ({ id, RazonSocial, Direccion, Ruc }) => {
    const { data } = await apiSistema.put(`datos/update/${id}`, {
      RazonSocial,
      Ruc,
      Direccion,
    });
    return data;
  }
);
export const datosSlice = createSlice({
  name: 'Datos',
  initialState: {
    Direccion: '',
    RazonSocial: '',
    Ruc: null,
    id: null,
    pending: false,
    success: false,
  },

  extraReducers: (build) => {
    build
      // Get
      .addCase(getDatos.pending, (state) => {
        state.pending = true;
        state.success = false;
      })
      .addCase(getDatos.fulfilled, (state, action) => {
        state.pending = false;
        state.id = action.payload.Datos[0].id;
        state.RazonSocial = action.payload.Datos[0].RazonSocial;
        state.Direccion = action.payload.Datos[0].Direccion;
        state.Ruc = action.payload.Datos[0].Ruc;
        state.success = true;
      })
      .addCase(getDatos.rejected, (state) => {
        state.pending = false;
        state.success = false;
      })

      // UPDATE
      .addCase(updateDatos.pending, (state) => {
        state.pending = true;
      })
      .addCase(updateDatos.fulfilled, (state, action) => {
        state.pending = false;
        state.id = action.payload.Datos[0].id;
        state.RazonSocial = action.payload.Datos[0].RazonSocial;
        state.Direccion = action.payload.Datos[0].Direccion;
        state.Ruc = action.payload.Datos[0].Ruc;
      })
      .addCase(updateDatos.rejected, (state) => {
        state.pending = false;
      });
  },
});
