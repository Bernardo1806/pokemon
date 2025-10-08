import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'
import { lazy, Suspense, useState, useEffect } from 'react'
import Loading from './pages/Loading';


const Menu = lazy(() => import('./pages/Menu'))
const Home = lazy(() => import('./pages/Home'))
const NotFound = lazy(() => import('./pages/NotFound'))

const metaMap = {
  '/': {
    title: 'Home',
    description: 'Bem-Vindo à página inicial'
  },
  '*': {
    title: 'Erro 404',
    description: 'Página não encontrada'
  },
}

function TitleAndMetaUpdater() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.toLowerCase()
    const base = path.split('/').slice(0, 2).join('/') || '/'
    const meta = metaMap[base] || metaMap['*']

    document.title = meta.title
    let desc = document.querySelector("meta[name='description']")
    if (!desc) {
      desc = document.createElement('meta')
      desc.setAttribute('name', 'description')
      document.head.appendChild(desc)
    }
    desc.setAttribute('content', meta.description)
  }, [location])
  return null
}

function App() {
  const [showLoader, setShowLoader] = useState(true)

  const handleFinishLoading = () => {
    setShowLoader(false)
  }

  useEffect(() => {
    const failSafe = setTimeout(() => setShowLoader(false), 5000)
    return () => clearTimeout(failSafe)
  }, [])

  if (showLoader) {
    return <Loading onFinish={handleFinishLoading} />
  }

  return (
    <HashRouter>
      <Suspense fallback={<div style={{ backgroundColor: '#181b1d', width: '100vw', height: '100vh' }} />} >
        <TitleAndMetaUpdater />
        <Routes>
          <Route path='/' element={<Menu><Home /></Menu>} />

          <Route path='*' element={<Menu><NotFound>Página não encontrada</NotFound></Menu>} />
        </Routes>
      </Suspense>
    </HashRouter>
  );
}

export default App;
