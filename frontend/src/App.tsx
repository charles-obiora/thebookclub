import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthhPage from "./pages/AuthhPage.tsx";
import Dashboard from "./pages/DashBoardd";

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
