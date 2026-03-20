import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoadingScreen from './components/LoadingScreen'
import { Toaster } from 'react-hot-toast'
import { AdminProvider } from './context/AdminContext'
import HomePage from './pages/HomePage'
import AdminPage from './pages/AdminPage'
import WhatsAppFab from './components/WhatsAppFab'
import StickyLinksPanel from './components/StickyLinksPanel'
import BackgroundAnimation from './components/BackgroundAnimation'


export default function App() {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <>
            {isLoading && <LoadingScreen onFinish={() => setIsLoading(false)} />}

            <AdminProvider>
            <BrowserRouter>
                <Toaster
                    position="top-right"
                    toastOptions={{
                        style: {
                            background: '#1B3FA0',
                            color: '#fff',
                            border: '1px solid rgba(62,198,224,0.4)',
                            fontFamily: 'Outfit, sans-serif',
                            fontWeight: 600,
                            borderRadius: '16px',
                            padding: '14px 20px',
                        },
                        success: { iconTheme: { primary: '#3EC6E0', secondary: '#0F1C4D' } },
                        error: { iconTheme: { primary: '#ff6b6b', secondary: '#fff' } },
                    }}
                />

                <BackgroundAnimation />
                <StickyLinksPanel />
                <WhatsAppFab />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/inicio" element={<HomePage />} />
                    <Route path="/servicios" element={<HomePage />} />
                    <Route path="/rutas" element={<HomePage />} />
                    <Route path="/promociones" element={<HomePage />} />
                    <Route path="/nosotros" element={<HomePage />} />
                    <Route path="/contacto" element={<HomePage />} />
                    <Route path="/admin" element={<AdminPage />} />
                </Routes>
            </BrowserRouter>
        </AdminProvider>
        </>
    )
}
