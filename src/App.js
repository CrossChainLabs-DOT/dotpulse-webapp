import { BrowserRouter } from 'react-router-dom';
import Router from './routes';
import ThemeProvider from './theme';

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </BrowserRouter>
  );
}

