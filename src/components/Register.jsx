import { Link, useNavigate } from "react-router-dom";
import { ButtonLogin, ContainerLogin, FormLogin, Input } from "../style";
import { colors } from "../utils";
import { useEffect, useState } from "react";
import axios from "axios";
import { FormControlLabel, FormGroup, Switch } from "@mui/material";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [invalidUser, setInvalidUser] = useState(false);
  const [business, setBusiness] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("authenticated") === "true") {
      navigate("/dashboard/feed");
    }
  }, []);

  function register() {
    const payload = {
      email,
      name,
      password,
      is_ong: business,
    };
    axios
      .post("http://localhost:8008/signup", payload)
      .then((res) => {
        localStorage.setItem("authenticated", "true");
        localStorage.setItem("name", res.data.name);
        localStorage.setItem("email", res.data.email);
        localStorage.setItem("user_id", res.data.user_id);
        localStorage.setItem("is_ong", res.data.is_ong);
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
          register();
        }}
      >
        <h1 style={{ color: colors.main }}>Cadastro</h1>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome"
          required
          type="text"
        />
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail"
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
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                value={business}
                onChange={() => setBusiness(!business)}
              />
            }
            label="Perfil empresarial"
          />
        </FormGroup>
        {invalidUser && <p style={{ color: "red" }}>Usuário já existe</p>}
        <ButtonLogin>Cadastrar</ButtonLogin>
        <Link style={{ color: colors.main }} to={"/login"}>
          Já tem uma conta? Faça login!
        </Link>
      </FormLogin>
    </ContainerLogin>
  );
}

export default Register;
