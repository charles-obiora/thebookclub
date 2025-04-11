import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthhPage from "./pages/AuthhPage";
import Dashboard from "./pages/DashBoard";

function App() {
  const routes = createBrowserRouter([
    { path: "/auth/login", element: <AuthhPage /> },
    { path: "/auth/signUp", element: <AuthhPage /> },
    { path: "/dashboard", element: <Dashboard /> },
  ]);

  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
