import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthPage from "./pages/AuthPage";

function App() {
  const router = createBrowserRouter([
    { path: "/auth/login", element: <AuthPage /> },
    { path: "/auth/signUp", element: <AuthPage /> },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
