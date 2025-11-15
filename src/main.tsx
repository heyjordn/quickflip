import { StrictMode } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import { createRoot } from 'react-dom/client';
import App from './pages/App.tsx';
import './index.css';
import { DefaultLayout } from './layouts/DefaultLayout.tsx';
import StateContext from './context/index.ts';
import { initialState } from './context/initialState.ts';
import Study from './pages/Study.tsx';
import About from './pages/About.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StateContext.Provider value={initialState}>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}></Route>
          <Route path='/' element={<App/>}></Route>
          <Route path="/study" element={<Study/>}></Route>
          <Route path="/about" element={<About/>}></Route>
        </Routes>
      </BrowserRouter>
    </StateContext.Provider>
  </StrictMode>
);
