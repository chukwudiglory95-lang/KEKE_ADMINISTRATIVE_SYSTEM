import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { SiteSettingsProvider } from "./context/SiteSettingsContext";
import router from "./routes";

function App() {
  return (
    <AuthProvider>
      <SiteSettingsProvider>
        <RouterProvider router={router} />
      </SiteSettingsProvider>
    </AuthProvider>
  );
}

export default App;