import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// layouts and pages
import RootLayout from './layouts/RootLayout';
import Home from './pages/Home';
import CreateRestuarant from './pages/CreateRestuarant';
import UpdateRestaurant from './pages/UpdateRestaurant';

// router and routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="create" element={<CreateRestuarant />} />
      <Route path="update/:id" element={<UpdateRestaurant />} />
    </Route>
  )
);

function App() {
  return (
    <div>
      <RouterProvider router={router} />;
      <ToastContainer />
    </div>
  );
}

export default App;
