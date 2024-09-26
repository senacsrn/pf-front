import { Link, useNavigate } from "react-router-dom";
import { ButtonLogin, ContainerLogin, FormLogin, Input } from "../style";
import { colors } from "../utils";
import { useEffect, useState } from "react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invalidUser, setInvalidUser] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("authenticated") === "true") {
      navigate("/dashboard/feed");
    }
  }, []);

  function auth() {
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
      });
  }

  return (
    <ContainerLogin
      style={{
        backgroundColor: colors.main,
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
        <ButtonLogin>Entrar</ButtonLogin>
        <Link style={{ color: colors.main }} to={"/register"}>
          Não tem uma conta? Cadastre-se!
        </Link>
      </FormLogin>
    </ContainerLogin>
  );
}

export default Login;
