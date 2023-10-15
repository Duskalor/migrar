import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiSistema } from '../../Api/ApiSistema';
import { logoutProductos } from '../Productos/productosSlice';
import { LogoutPermisos } from '../Permisos/permisosSlice';
import { LogoutUsuario } from '../Usuarios/userThunks';
const success = localStorage.getItem('success')
  ? localStorage.getItem('success')
  : false;
const userToken = localStorage.getItem('userToken')
  ? localStorage.getItem('userToken')
  : null;
const userId = localStorage.getItem('userId')
  ? localStorage.getItem('userId')
  : null;

export const login = createAsyncThunk('login/LoginUser', async (userAuth) => {
  try {
    const { data } = await apiSistema.post('login', userAuth);
    return data;
  } catch (err) {
    console.error(err);
  }
});
export const logout = createAsyncThunk(
  'Logout/LogoutUser',
  async (_, { dispatch }) => {
    try {
      const { data } = await apiSistema.get('logout');
      localStorage.clear();
      dispatch(logoutProductos());
      dispatch(LogoutUsuario());
      dispatch(LogoutPermisos());
      return data;
    } catch (error) {
      dispatch(logoutProductos());
      dispatch(LogoutUsuario());
      dispatch(LogoutPermisos());
      localStorage.clear();
      console.log(error);
      return { success: false, mensaje: 'Se cerro correctamente' };
    }
  }
);
export const getUserDetails = createAsyncThunk(
  'get/getUserDetails',
  async (_, { getState }) => {
    const { Auth } = getState();
    try {
      const { data } = await apiSistema.get(`user/details/${Auth.userId}`);
      return data;
    } catch (error) {
      console.log(error.response.status);
    }
  }
);

export const authSlice = createSlice({
  name: 'Auth',
  initialState: {
    user: {},
    userId,
    success,
    userToken,
    error: null,
    loading: false,
  },
  reducers: {
    setError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (build) => {
    // login cases
    build
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        if (!payload?.success) {
          state.error = payload?.mensaje;
        } else {
          localStorage.setItem('userToken', payload.userToken);
          localStorage.setItem('userId', payload.User.id);
          localStorage.setItem('success', payload.success);

          state.loading = false;
          state.userToken = payload.userToken;
          state.success = payload.success;
          state.user = payload.User;
        }
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.loading = true;
        console.log(payload);
      })
      // logout cases
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = payload.success;
        state.userId = null;
        state.userToken = null;
        state.user = [];
      })
      .addCase(logout.rejected, (state) => {
        state.loading = true;
        localStorage.clear();
      })
      // getUserDetails cases
      .addCase(getUserDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserDetails.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = payload.success;
        state.user = payload.User;
      })
      .addCase(getUserDetails.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setError } = authSlice.actions;
