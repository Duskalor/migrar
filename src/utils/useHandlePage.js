export const useHandlePAge = (
  setPage,
  setRowsPerPage,
  setFilterAlmacen,
  setBusquedaDescription
) => {
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOnchangeUbicacion = (e) => {
    setPage(0);
    setFilterAlmacen(e.target.value);
  };

  const handleOnchangeFilterName = (e) => {
    setBusquedaDescription(e.target.value);
  };

  return {
    handleChangePage,
    handleChangeRowsPerPage,
    handleOnchangeUbicacion,
    handleOnchangeFilterName,
  };
};
