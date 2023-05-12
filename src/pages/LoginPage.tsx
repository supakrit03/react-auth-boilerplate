import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Login, { FormValues } from "../components/Login";
import { AuthContext } from "../providers/AuthProvider";

import axios from "../lib/axios";

function LoginPage() {
  const { storeAccessToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const login = async (values: FormValues) => {
    try {
      const res = await axios.post("/login", values);

      storeAccessToken(res.data.accessToken);
      navigate("/profile", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Login onSubmit={login} />
    </Container>
  );
}

export default LoginPage;
