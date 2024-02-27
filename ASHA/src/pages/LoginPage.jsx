import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useContext, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, Message, Button, Input, Label } from "../components/ui";
import { loginSchema } from "../schemas/auth";
import { LoginContext } from "../context/LoginContext/LoginContext";

export function LoginPage() {
  const {
    register,
    handleSubmit,
    
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const { signin, errors: loginErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const {singIn}=useContext(LoginContext);
   const onSubmit = (data,) => {
    signin(data);
  // singIn(data)
  console.log({data}, register)
  }
  
   
  //  console.log('Fncion',Signin)
  // const onLogin=(data)=>{
  //   singIn(data)
  // }
     


  //NOTIFICAIONES
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/tasks");
    }
  }, [isAuthenticated]);
  // const onLogin=(data)=>{
  //   Signin(data)
  // }

  return (
    <div className="h-[calc(100vh-100px)] flex items-center justify-center">
      <Card>
        {loginErrors.map((error, i) => (
          <Message message={error} key={i} />
        ))}
        <h1 className="text-2xl font-bold">Iniciar Sesión</h1>

        <form onSubmit={handleSubmit(onSubmit)
        
      
        
        }>
          <Label htmlFor="email">Correo:</Label>
          <Input
            label="Write your email"
            type="email"
            name="email"
            placeholder="Escribe tu correo"
            {...register("email", { required: true })}
          />
          <p>{errors.email?.message}</p>

          <Label htmlFor="password">Contraseña:</Label>
          <Input
            type="password"
            name="password"
            placeholder="Escribe tu contraseña"
            {...register("password", { required: true, minLength: 6 })}
          />
          <p>{errors.password?.message}</p>

          <Button>Iniciar Sesión</Button>
        </form>

        <p className="flex gap-x-2 justify-between">
          ¿No tienes cuenta? <Link to="/register" className="text-sky-500">Registrarse</Link>
        </p>
      </Card>
    </div>
  );
}
