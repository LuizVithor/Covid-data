import App from './App.tsx'
import store from 'store/index.ts'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client'
import { GlobalStyle } from 'styles/global.tsx'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <App />
        <GlobalStyle />
      </LocalizationProvider>
    </Provider>,
)
