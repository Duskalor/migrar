import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiSistema } from '../../Api/ApiSistema';

export const getCategorias = createAsyncThunk(
  'get/Categorias',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await apiSistema.get('categoria');
      return data.Categoria;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
export const createCategorias = createAsyncThunk(
  ' create/Categorias',
  async (newdata, { rejectWithValue }) => {
    try {
      const { data } = await apiSistema.post('categoria/create', newdata);
      return data.Categoria;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const categoriaSlice = createSlice({
  name: 'categoria',
  initialState: {
    categorias: [],
    pending: false,
    success: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategorias.pending, (state) => {
        state.pending = true;
      })
      .addCase(getCategorias.fulfilled, (state, actions) => {
        state.pending = false;
        state.success = true;
        state.categorias = actions.payload;
      })
      .addCase(getCategorias.rejected, (state, actions) => {
        state.pending = false;
        console.log('error --->', actions.payload);
      })
      // new
      .addCase(createCategorias.pending, (state) => {
        state.pending = true;
      })
      .addCase(createCategorias.fulfilled, (state, actions) => {
        state.pending = false;
        state.success = true;
        state.categorias = actions.payload;
      })
      .addCase(createCategorias.rejected, (state, actions) => {
        state.pending = false;
        console.log('error --->', actions.payload);
      });
  },
});
