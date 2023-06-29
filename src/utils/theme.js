import { createTheme } from '@mui/material/styles';
import colors from '../utils/colors.module.scss'

const theme = createTheme({
  palette: {
    primary: {
        main: colors.primary,
     },
  },
});

export default theme;