import Header from './components/Header';
import Main from './components/Main';
import Container from '@material-ui/core/Container';

import { MuiPickersUtilsProvider } from '@material-ui/pickers';

// pick a date util library
import DateFnsUtils from '@date-io/date-fns';

function App() {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <header>
        <Header/>
      </header>
      <main>
        <Container fixed>
          <Main/>
        </Container>
      </main>
    </MuiPickersUtilsProvider>
  );
}

export default App;
