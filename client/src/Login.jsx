import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Login.css'

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [incorrectPasswordError, setIncorrectPasswordError] = useState(false); // Estado para el mensaje de contraseña incorrecta
  const [noRecordError, setNoRecordError] = useState(false); // Estado para el mensaje de registro no encontrado
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/login", { email, password })
      .then((result) => {
        console.log(result);
        if (result.data === "Exitoso") {
          navigate("/home");
        } else if (result.data === "La contraseña es incorrecta") {
          setIncorrectPasswordError(true); // Mostrar mensaje de contraseña incorrecta
          setNoRecordError(false); // Ocultar mensaje de registro no encontrado
        } else if (result.data === "No existe ningún registro") {
          setNoRecordError(true); // Mostrar mensaje de registro no encontrado
          setIncorrectPasswordError(false); // Ocultar mensaje de contraseña incorrecta
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="login-form login-background d-flex justify-content-center align-items-center  vh-100">
      <div className="caja p-3 rounded w-25">
        <h2 className="text-center">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              className="form-control rounded"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Contraseña</strong>
            </label>
            <input
              type="password"
              placeholder="Enter password"
              name="password"
              className="form-control rounded"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success w-100 rounded">
            {" "}
            Iniciar Sesión
          </button>
          <p className=" parra text-center">Aún no tienes una cuenta?</p>
          <Link
            to="/registro"
            className="btn btn-default border w-100 bg-light rounded text-decoration-none"
          >
            Crear una cuenta
          </Link>
        </form>
      </div>

      {/* Mensaje de contraseña incorrecta */}
      {incorrectPasswordError && (
        <div className="error-modal">
          <div className="error-content">
            <p>La contraseña es incorrecta.</p>
            <button onClick={() => setIncorrectPasswordError(false)}>Cerrar</button>
          </div>
        </div>
      )}

      {/* Mensaje de registro no encontrado */}
      {noRecordError && (
        <div className="error-modal">
          <div className="error-content">
            <p>No existe ningún registro.</p>
            <button onClick={() => setNoRecordError(false)}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
