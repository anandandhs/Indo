import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Home } from './pages/Home';
import { Industries } from './pages/Industries';
import { IndustryDetail } from './pages/IndustryDetail';
import { Legal } from './pages/Legal';
import { NotFound } from './pages/NotFound';
import { WhatWeDo } from './pages/WhatWeDo';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/about', element: <About /> },
      { path: '/what-we-do', element: <WhatWeDo /> },
      { path: '/industries', element: <Industries /> },
      { path: '/industries/:slug', element: <IndustryDetail /> },
      { path: '/contact', element: <Contact /> },
      { path: '/privacy-policy', element: <Legal kind="privacy" /> },
      { path: '/cookie-policy', element: <Legal kind="cookies" /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}
