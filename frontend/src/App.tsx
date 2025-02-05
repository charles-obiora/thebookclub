import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthhPage from "./pages/AuthhPage";

function App() {
  const routes = createBrowserRouter([
    { path: "/auth/login", element: <AuthhPage /> },
    { path: "/auth/signUp", element: <AuthhPage /> },
  ]);

  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
