import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from './contexts/AuthContext';
import { Landing } from './pages/landing';

export function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
      <Routes>
        <Route path='/' caseSensitive element={<Landing/>}/>
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  )

}
