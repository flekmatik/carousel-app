import { createTheme } from '@material-ui/core';

export const theme = createTheme({
    palette: {
        primary: {
            main: '#da251d'
        },
        secondary: {
            main: '#815542'
        },
        background: {
            default: '#E28F00',
            paper: '#F6E6C9'
        }
    },
    typography: {
        h2: {
            color: '#815542',
            fontWeight: 400
        }
    }
});
