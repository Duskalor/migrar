import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';

const AutocompleteForm = ({ filterProducto, setfilterProducto, RamdomId }) => {
  const { productos } = useSelector((state) => state.Productos);

  // console.log({ value });
  const renderOption = (props, option, state) => {
    return (
      <div {...props} key={option.id} style={{ textAlign: 'center' }}>
        {state.index + 1} - {option.Codigo} - {option.Descripcion}
      </div>
    );
  };

  return (
    <Box>
      <Autocomplete
        value={filterProducto}
        isOptionEqualToValue={() => (option, value) => option.id === value.id}
        onChange={(event, newInputValue) => setfilterProducto(newInputValue)}
        id='autocomplete'
        options={[
          {
            Descripcion: 'Todos los productos',
            id: RamdomId.current,
            Codigo: 'All',
          },
          ...productos,
        ]}
        getOptionLabel={(productos) => productos.Descripcion}
        renderOption={renderOption}
        sx={{ width: 400 }}
        renderInput={(params) => (
          <TextField {...params} label='Productos' name='autocomplete' />
        )}
      />
    </Box>
  );
};

export default AutocompleteForm;
