import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Login from './features/Auth/Login';
import { getUserDetails } from './features/Auth/authSlice';
import Peticiones from './Peticiones';
import { ThemeProvider, createTheme } from '@mui/material';
import { themeSettings } from './mui/themes';

function App() {
  const Dispatch = useDispatch();
  const theme = useMemo(() => createTheme(themeSettings), []);
  const { success } = useSelector((state) => state.Auth);

  useEffect(() => {
    if (success) {
      Dispatch(getUserDetails());
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      {success ? <Peticiones /> : <Login />}
    </ThemeProvider>
  );
}

export default App;
