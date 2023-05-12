import "bootstrap/dist/css/bootstrap.min.css";
import "prismjs/themes/prism-tomorrow.css";

import Router from "./Router";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./providers/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
