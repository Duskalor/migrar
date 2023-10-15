import { Box, styled } from '@mui/system';

export const BoxStatus = ({ active, children }) => {
  const Status = styled(Box)({
    '& div': {
      color: 'white',
      backgroundColor: active ? 'green' : 'red',
      padding: '3px 5px',
      borderRadius: '5px',
    },
  });
  return <Status>{children}</Status>;
};
