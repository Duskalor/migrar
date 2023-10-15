import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiSistema } from '../../Api/ApiSistema';

export const getProductos = createAsyncThunk('get/getProductos', async () => {
  const { data } = await apiSistema.get('producto');
  return data;
});

export const createProducto = createAsyncThunk(
  'create/PostProducto',
  async (nuevo) => {
    const { data } = await apiSistema.post('producto/create', nuevo);
    return data;
  }
);

export const deleteProductos = createAsyncThunk(
  'delete/postProductos',
  async (id) => {
    const { data } = await apiSistema.delete(`producto/delete/${id}`);
    return data;
  }
);

export const updateProductos = createAsyncThunk(
  'update/postProductos',
  async ({ id, ...Rest }) => {
    const { data } = await apiSistema.put(`producto/update/${id}`, Rest);
    return data;
  }
);

export const productosSlice = createSlice({
  name: 'Productos',
  initialState: {
    productos: [],
    error: null,
    loading: false,
  },
  reducers: {
    borrarProductos: (state) => {
      state.productos = [];
    },
    logoutProductos: (state) => {
      state.productos = [];
      state.error = null;
      state.loading = false;
    },
  },

  extraReducers: (build) => {
    // get
    build
      .addCase(getProductos.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductos.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.productos = payload.ListaProductos;
      })
      .addCase(getProductos.rejected, (state) => {
        state.loading = false;
      })

      // create

      .addCase(createProducto.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProducto.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.productos = payload.ListaProductos;
      })
      .addCase(createProducto.rejected, (state) => {
        state.loading = false;
      })

      //delete

      .addCase(deleteProductos.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProductos.fulfilled, (state, { payload }) => {
        state.loading = false;
        // console.log({ payload });
        state.productos = payload.ListaProductos;
      })
      .addCase(deleteProductos.rejected, (state) => {
        state.loading = false;
      })

      // update

      .addCase(updateProductos.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProductos.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.productos = payload.ListaProductos;
      })
      .addCase(updateProductos.rejected, (state) => {
        state.loading = false;
      });
  },
});
export const { borrarProductos, logoutProductos } = productosSlice.actions;
