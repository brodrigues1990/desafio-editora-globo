import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#015d82',
            main: '#004561',
            dark: '#03374c',
            contrastText: '#fff',
          },
    },
  });

  export default theme;