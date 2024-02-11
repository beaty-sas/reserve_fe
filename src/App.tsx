import { ThemeProvider } from '@mui/system'
import theme from './assets/theme'
import { CssBaseline } from '@mui/material'
import { Routes, Route } from "react-router-dom";
import Booking from './pages/Booking';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import BookingConfirm from './pages/BookingConfirm';
import BookingSuccess from './pages/BookingSuccess';


function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path='/booking/:id' element={<Booking />} />
          <Route path='/booking/:id/confirm' element={<BookingConfirm />} />
          <Route path='/booking/:id/success' element={<BookingSuccess />} />
        </Routes>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
