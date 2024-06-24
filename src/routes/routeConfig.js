import Chat from "../components/chat";
import Login from "../components/login";
import Register from "../components/register";

export const routerConfig = [
    // here you can configure the routes as you like

//   {
//     element:<NotFound />,
//     path: '*',
//   },
  {
    element:<Login />,
    path: '/login',
  },
  {
    element:<Register />,
    path: '/register',
  },
  {
    element:<Chat />,
    path: '/chat',
  },
  
];