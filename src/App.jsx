import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AdminProvider } from './context/AdminContext'
import React, { Suspense } from 'react'
import StickyLinksPanel from './components/StickyLinksPanel'
import BackgroundAnimation from './components/BackgroundAnimation'

const HomePage = React.lazy(() => import('./pages/HomePage'))
const AdminPage = React.lazy(() => import('./pages/AdminPage'))
const CotizadorPage = React.lazy(() => import('./pages/CotizadorPage'))


export default function App() {
    return (
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

                <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#05081a] text-accent font-bold">Cargando...</div>}>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/inicio" element={<HomePage />} />
                        <Route path="/servicios" element={<HomePage />} />
                        <Route path="/rutas" element={<HomePage />} />
                        <Route path="/promociones" element={<HomePage />} />
                        <Route path="/nosotros" element={<HomePage />} />
                        <Route path="/contacto" element={<HomePage />} />
                        <Route path="/cotizador" element={<CotizadorPage />} />
                        <Route path="/admin" element={<AdminPage />} />
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </AdminProvider>
    )
}
