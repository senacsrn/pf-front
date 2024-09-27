import { Link, useNavigate } from "react-router-dom";
import { ContainerLogin, FormLogin, Input } from "../style";
import { colors } from "../utils";
import { useEffect, useState } from "react";
import axios from "axios";
import { LoadingButton } from "@mui/lab";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invalidUser, setInvalidUser] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("authenticated") === "true") {
      navigate("/dashboard/feed");
    }
  }, []);

  function auth() {
    setLoading(true);
    const payload = {
      email,
      password,
    };
    axios
      .post("http://localhost:8008/signin", payload)
      .then(() => {
        localStorage.setItem("authenticated", "true");
        navigate("/dashboard/feed");
      })
      .catch(() => {
        setInvalidUser(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <ContainerLogin
      style={{
        backgroundColor: "#121212",
        color: colors.main,
        fontWeight: "bold",
      }}
    >
      <FormLogin
        onSubmit={(e) => {
          e.preventDefault();
          auth();
        }}
      >
        <h1 style={{ color: colors.main }}>login</h1>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Usuário"
          required
          type="email"
        />
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
          required
          type="password"
        />
        {invalidUser && <p style={{ color: "red" }}>Usuário inválido</p>}
        <LoadingButton
          sx={{ backgroundColor: colors.main, width: "100%" }}
          variant="contained"
          size="small"
          loading={loading}
          type="submit"
        >
          Entrar
        </LoadingButton>
        <Link style={{ color: colors.main }} to={"/register"}>
          Não tem uma conta? Cadastre-se!
        </Link>
      </FormLogin>
    </ContainerLogin>
  );
}

export default Login;
