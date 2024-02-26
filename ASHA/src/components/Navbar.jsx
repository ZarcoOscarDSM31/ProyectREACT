import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { ButtonLink } from "./ui/ButtonLink";

export function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg">
      <h1 className="text-2xl font-bold">
        <Link to={isAuthenticated ? "/tasks" : "/"}>ASHA</Link>
      </h1>
      <ul className="flex gap-x-2">
        {isAuthenticated ? (
          <>
            <li>
              Welcome {user.username}
            </li>
            <li>
              <ButtonLink to="/add-task">Agregar tarea</ButtonLink>
            </li>
            <li>
              <Link to="/" onClick={() => logout()}>
                Cerrar sesión
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <ButtonLink to="/login">Iniciar Sesión</ButtonLink>
            </li>
            <li>
              <ButtonLink to="/register">Registrase</ButtonLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
