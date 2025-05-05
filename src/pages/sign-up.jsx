import { useState } from "react";
import {
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import Lottie from "lottie-react";
import signupAnimation from "@/assets/animations/signup.json"; 



export function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !name) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: '⚠️ Todos los campos son obligatorios',
      });
      return;
    }
  
    if (!termsAccepted) {
      Swal.fire({
        icon: 'warning',
        title: 'Términos y condiciones',
        text: '⚠️ Debes aceptar los términos y condiciones',
      });
      return;
    }

    try { //modificado solo res
      const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      

      const data = await res.json();
    if (data.success) {
      await Swal.fire({
        icon: 'success',
        title: 'Registro exitoso',
        text: '✅ Ya puedes iniciar sesión.',
        confirmButtonText: 'Iniciar sesión'
      });
      navigate("/sign-in");
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error al registrar',
        text: `❌ ${data.message}`,
      });
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Error de red',
      text: `❌ ${error.message}`,
    });
  }
  };

  return (
    <section className="m-8 flex">
      <div className="w-2/5 h-full hidden lg:block">
        <img
          src="/img/pattern.png"
          className="h-full w-full object-cover rounded-3xl"
          alt="Imagen decorativa de fondo"
        />
      </div>

      <div className="w-full lg:w-3/5 flex flex-col items-center justify-center">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">
            Regístrate
          </Typography>
          <Typography
            variant="paragraph"
            color="blue-gray"
            className="text-lg font-normal"
          >
            Ingresa tus datos para crear tu cuenta en AquaSmart.
          </Typography>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2"
        >
          <div className="mb-1 flex flex-col gap-6">
            <Input
              label="Nombre completo"
              size="lg"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            />

            <Input
              label="Correo electrónico"
              type="email"
              size="lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            />

            <Input
              label="Contraseña"
              type="password"
              size="lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            />
          </div>

          <Checkbox
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center font-medium"
              >
                Acepto los&nbsp;
                <a
                  href="#"
                  className="font-normal text-black hover:underline"
                >
                  Términos y condiciones
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5 mt-4" }}
          />

          <Button type="submit" className="mt-6" fullWidth>
            Registrarse ahora
          </Button>

          <Typography
            variant="paragraph"
            className="text-center text-blue-gray-500 font-medium mt-4"
          >
            ¿Ya tienes una cuenta?
            <Link to="/sign-in" className="text-gray-900 font-semibold ml-1">
              Inicia sesión
            </Link>
          </Typography>
        </form>

        {/* 🎬 Animación debajo del formulario de registro */}
        <div className="mt-8 flex justify-center">
          <Lottie
            animationData={signupAnimation}
            loop
            autoplay
            style={{ width: "280px", height: "280px" }}
          />
        </div>

      </div>
    </section>
  );
}

export default SignUp;
