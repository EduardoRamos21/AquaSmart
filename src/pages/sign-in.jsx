import {
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import Lottie from "lottie-react";
import signinAnimation from "@/assets/animations/signin.json";



export function SignIn() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE}/api/auth/login`, form);

      if (res.data.success) {
        localStorage.setItem("user", JSON.stringify(res.data));
    
        await Swal.fire({
          icon: 'success',
          title: '¡Bienvenido!',
          text: `Hola,has iniciado sesión correctamente.`,
          confirmButtonText: 'Continuar',
          timer: 2000,
          showConfirmButton: false,
        });
    
        navigate("/dashboard");
      } else {
        setError(res.data.message || "Error desconocido.");
      }
    } catch (err) {
      setError("❌ Correo o contraseña incorrectos.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="m-8 flex gap-4">
      <div className="w-full lg:w-3/5 mt-24">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">
            Inicia sesión
          </Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">
            Ingresa tu correo y contraseña para acceder al sistema.
          </Typography>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
          <div className="mb-1 flex flex-col gap-6">
            <Input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              size="lg"
              placeholder="name@mail.com"
              required
            />
            <Input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              size="lg"
              placeholder="********"
              required
            />
          </div>

          <Checkbox
            label={
              <Typography variant="small" color="gray" className="flex items-center font-medium">
                Acepto los&nbsp;
                <a href="#" className="text-black underline">Términos y condiciones</a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5 mt-2" }}
          />

          <Button type="submit" className="mt-6" fullWidth disabled={loading}>
            {loading ? "Iniciando..." : "Iniciar Sesión"}
          </Button>

          {error && (
            <Typography color="red" className="mt-4 text-center font-medium">
              {error}
            </Typography>
          )}

          <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
            ¿No tienes cuenta?
            <Link to="/sign-up" className="text-gray-900 ml-1 font-semibold">
              Crea una cuenta
            </Link>
          </Typography>
        </form>

        {/* 🎬 Animación debajo del formulario */}
        <div className="mt-8 flex justify-center">
          <Lottie
            animationData={signinAnimation}
            loop
            autoplay
            style={{ width: "280px", height: "280px" }}
          />
        </div>
      </div>

      <div className="w-2/5 h-full hidden lg:block">
        <img
          src="/img/pattern.png"
          className="h-full w-full object-cover rounded-3xl"
          alt="Ilustración de inicio de sesión"
        />
      </div>
    </section>
  );
}

export default SignIn;
