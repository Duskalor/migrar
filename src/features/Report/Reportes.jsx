import { Box, Button } from '@mui/material';
import React, { useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { utils, writeFile } from 'xlsx';
import AutocompleteForm from '../../components/AutoCompleteForm';
import { useReporte } from '../../utils/useReporte';
import { formatDate } from '../../utils/formatDate';
import { BoxError } from '../../components/BoxError';
import { v4 } from 'uuid';
export const Reportes = ({ handleClose }) => {
  const RamdomId = useRef(v4());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [error, setError] = useState(null);
  const [all, setAll] = useState('todos');

  const [filterProducto, setfilterProducto] = useState({
    Descripcion: 'Todos los productos',
    id: RamdomId.current,
    Codigo: 'All',
  });
  // console.log(filterProducto);
  const { Reporte } = useReporte();

  const FilterReport =
    filterProducto !== null && filterProducto.id !== RamdomId.current
      ? Reporte.filter((pro) => pro.IdProducto === filterProducto.id)
      : Reporte;

  const AllOptions =
    all !== 'todos'
      ? FilterReport.filter((pro) => pro.action === all)
      : FilterReport;

  const handleSearch = () => {
    error !== null && setError(null);
    // Convertir las fechas de cadena a objetos de fecha
    const start = new Date(startDate);
    const end = new Date(endDate);
    // Filtrar la lista por el rango de fechas
    const filteredData =
      startDate && endDate
        ? AllOptions.filter(
            (item) =>
              item.created_at >= start.getTime() &&
              item.created_at <= end.getTime()
          )
        : AllOptions;

    if (filteredData.length > 0) {
      var wb = utils.book_new(),
        ws = utils.json_to_sheet(
          filteredData.map((item) => ({
            ...item,
            created_at: new Date(item.created_at),
          }))
        );
      utils.book_append_sheet(wb, ws, `Reports`);
      writeFile(
        wb,
        `Report-desde : ${formatDate(start)
          .split(',')
          .shift()} - al - ${formatDate(end).split(',').shift()}---${all}.xlsx`
      );
    } else {
      setError('No Hay resultados');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '1rem',
        py: '1rem',
      }}
    >
      <AutocompleteForm
        filterProducto={filterProducto}
        setfilterProducto={setfilterProducto}
        RamdomId={RamdomId}
      />

      <Box>
        <select
          value={all}
          onChange={(e) => {
            error !== null && setError(null);
            setAll(e.target.value);
          }}
        >
          <option value='todos'>todos</option>
          <option value='Entrada'>Entrada</option>
          <option value='Salida'>Salida</option>
        </select>
      </Box>

      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <DatePicker
          selected={startDate}
          onChange={(date) => {
            error !== null && setError(null);
            setStartDate(date);
          }}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          placeholderText='Fecha de inicio'
        />
        <DatePicker
          selected={endDate}
          onChange={(date) => {
            error !== null && setError(null);
            setEndDate(date);
          }}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          placeholderText='Fecha de fin'
        />
      </Box>
      <Box
        sx={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}
      >
        <Button onClick={handleSearch} variant='contained'>
          Buscar
        </Button>
        <Button onClick={handleClose}>Cerrar</Button>
      </Box>
      {error && <BoxError>{error}</BoxError>}
    </Box>
  );
};
