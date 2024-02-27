import { useEffect } from "react";
import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { Card, Message, Button, Input, Label } from "../components/ui";
import { useForm } from "react-hook-form";
import { registerSchema } from "../schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";

function RegisterPage() {
  const { signup, errors: registerErrors, isAuthenticated } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });
  const navigate = useNavigate();

  const onSubmit = async (value) => {
    await signup(value);
  };


  {Array.isArray(registerErrors) ? (
    registerErrors.map((error, i) => (
      <Message message={error} key={i} />
    ))
  ) : (
    <Message message={registerErrors} /> // Renderiza el mensaje directamente si no es un array
  )}
  
  useEffect(() => {
    if (isAuthenticated) navigate("/tasks");
  }, [isAuthenticated]);

  return (
    <div className="h-[calc(100vh-100px)] flex items-center justify-center">
      <Card>
        {registerErrors.map((error, i) => (
          <Message message={error} key={i} />
        ))}
        <h1 className="text-3xl font-bold">Registrarse</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Label htmlFor="username">Nombre de usuario:</Label>
          <Input
            type="text"
            name="username"
            placeholder="Escribe tu nombre de usuario"
            {...register("username")}
            autoFocus
          />
          {errors.username?.message && (
            <p className="text-red-500">{errors.username?.message}</p>
          )}

          <Label htmlFor="email">Correo:</Label>
          <Input
            name="email"
            placeholder="Escribe tu correo"
            {...register("email")}
          />
          {errors.email?.message && (
            <p className="text-red-500">{errors.email?.message}</p>
          )}

          <Label htmlFor="password">Contraseña:</Label>
          <Input
            type="password"
            name="password"
            placeholder="Escribe tu contraseña"
            {...register("password")}
          />
          {errors.password?.message && (
            <p className="text-red-500">{errors.password?.message}</p>
          )}

          <Label htmlFor="confirmPassword">Confirma tu Contraseña:</Label>
          <Input
            type="password"
            name="confirmPassword"
            placeholder="Confirma tu contraseña"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword?.message && (
            <p className="text-red-500">{errors.confirmPassword?.message}</p>
          )}
          <Button>Registrarse</Button>
        </form>
        <p>
          ¿Ya tienes una cuenta?
          <Link className="text-sky-500" to="/login">
            Iniciar Sesión
          </Link>
        </p>
      </Card>
    </div>
  );
}

export default RegisterPage;