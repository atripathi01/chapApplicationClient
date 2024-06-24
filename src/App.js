import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { routerConfig } from './routes/routeConfig';


function App() {

    const router = createBrowserRouter(routerConfig);
    return <RouterProvider router={router} />;
}

export default App;
