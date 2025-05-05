import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Button,
  Input,
  Textarea,
  Checkbox,
} from "@material-tailwind/react";
import { FingerPrintIcon } from "@heroicons/react/24/solid";
import { PageTitle } from "@/widgets/layout";
import SimpleFooter from "@/widgets/layout/simple-footer";
import FeatureCard from "@/widgets/cards/feature-card";
import { featuresData, contactData } from "@/data";
import TeamMemberCard from "../widgets/cards/TeamMemberCard";
import { teamMembers } from "../widgets/cards/teamMembers";

export function Home() {
  return (
    <>
      <div className="relative flex min-h-[80vh] md:h-screen content-center items-center justify-center pt-16 pb-32 text-center px-4">
        <div className="absolute top-0 h-full w-full bg-[url('/img/background-3.png')] bg-cover bg-center" />
        <div className="absolute top-0 h-full w-full bg-black/60 bg-cover bg-center" />
        <div className="max-w-8xl container relative mx-auto">
          <div className="flex flex-wrap items-center">
            <div className="ml-auto mr-auto w-full px-4 text-center lg:w-8/12">
              <Typography variant="h1" color="white" className="mb-6 font-black">
                Revoluciona el riego con tecnología.
              </Typography>
              <Typography variant="lead" color="white" className="opacity-80">
                Haz crecer tus cultivos con inteligencia, precisión y sostenibilidad. Con AquaSmart, el control y la eficiencia están al alcance de tu mano. Da el paso hacia una nueva era de agricultura inteligente.
              </Typography>
            </div>
          </div>
        </div>
      </div>

      <section className="-mt-32 bg-white px-4 pb-20 pt-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuresData.map(({ color, title, icon, description }) => (
              <FeatureCard
                key={title}
                color={color}
                title={title}
                icon={React.createElement(icon, {
                  className: "w-5 h-5 text-white",
                })}
                description={description}
              />
            ))}
          </div>

          <div className="mt-32 flex flex-col-reverse lg:flex-row items-center gap-12">
            <div className="w-full px-4 lg:w-6/12">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-gray-900 p-2 text-center shadow-lg">
                <FingerPrintIcon className="h-8 w-8 text-white " />
              </div>
              <Typography variant="h3" className="mb-3 font-bold" color="blue-gray">
                Trabajar con AquaSmart es avanzar hacia el futuro
              </Typography>
              <Typography className="mb-8 font-normal text-blue-gray-500">
                Nuestro sistema está diseñado para adaptarse a los retos del campo actual. Conectividad local, eficiencia operativa y monitoreo inteligente se unen para ofrecerte una solución confiable y moderna.
                <br />
                <br />
                Simplifica tus procesos, mejora tus cosechas y transforma tu forma de cultivar. El futuro de la agricultura empieza contigo.
              </Typography>
              <Button variant="filled">Descubre como funciona</Button>
            </div>

            <div className="w-full px-4 lg:w-5/12">
              <Card className="shadow-lg border shadow-gray-500/10 rounded-lg">
                <CardHeader floated={false} className="relative h-56">
                  <img alt="Card Image" src="/img/teamwork.png" className="h-full w-full object-cover" />
                </CardHeader>
                <CardBody>
                  <Typography variant="small" color="blue-gray" className="font-normal">Tecnología agrícola</Typography>
                  <Typography variant="h5" color="blue-gray" className="mb-3 mt-2 font-bold">
                    Cultiva con inteligencia
                  </Typography>
                  <Typography className="font-normal text-blue-gray-500">
                    Supervisa y optimiza el riego de tus cultivos sin complicaciones. AquaSmart te da control total incluso en zonas sin acceso a internet.
                  </Typography>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pt-20 pb-48">
        <div className="container mx-auto">
          <PageTitle section="Nuestro equipo" heading="Personas con visión para transformar el campo">
            Detrás de AquaSmart hay un equipo apasionado por la tecnología y el desarrollo sostenible. Creamos soluciones que hacen más fácil, inteligente y eficiente el trabajo agrícola, incluso en entornos rurales sin conexión a internet.
          </PageTitle>

          <section className="mt-24 text-center">
            <div className="flex flex-wrap justify-center">
              {teamMembers.map((member, index) => (
                <TeamMemberCard
                  key={index}
                  name={member.name}
                  position={member.position}
                  image={member.image}
                  twitter={member.twitter}
                  linkedin={member.linkedin}
                  github={member.github}
                  email={member.email}
                />
              ))}
            </div>
          </section>
        </div>
      </section>

      <section className="relative bg-white py-24 px-4">
        <div className="container mx-auto">
          <PageTitle section="Tecnología que conecta" heading="Construyamos el futuro del campo">
            En AquaSmart, creemos que la innovación no debe depender de la conectividad global. Por eso diseñamos soluciones que funcionan incluso en entornos sin internet. Conecta, automatiza y mejora tus cultivos con herramientas pensadas para ti.
          </PageTitle>

          <div className="mx-auto mt-20 mb-48 grid max-w-5xl grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3">
            {contactData.map(({ title, icon, description }) => (
              <Card key={title} color="transparent" shadow={false} className="text-center text-blue-gray-900">
                <div className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-full bg-blue-gray-900 shadow-lg shadow-gray-500/20">
                  {React.createElement(icon, { className: "w-5 h-5 text-white" })}
                </div>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                  {title}
                </Typography>
                <Typography className="font-normal text-blue-gray-500">
                  {description}
                </Typography>
              </Card>
            ))}
          </div>

          <PageTitle section="Contáctanos" heading="¿Listo para transformar tu cultivo?">
            Completa el formulario y nuestro equipo se pondrá en contacto contigo lo antes posible.
          </PageTitle>

          <form className="mx-auto w-full mt-12 lg:w-5/12">
            <div className="mb-8 flex flex-col gap-6 md:flex-row">
              <Input variant="outlined" size="lg" label="Nombre completo" />
              <Input variant="outlined" size="lg" label="Correo electrónico" />
            </div>
            <Textarea variant="outlined" size="lg" label="Escribe tu mensaje" rows={8} />
            <Checkbox
              label={
                <Typography variant="small" color="gray" className="flex items-center font-normal">
                  Acepto los
                  <a href="#" className="font-medium transition-colors hover:text-gray-900">&nbsp;Términos y condiciones</a>
                </Typography>
              }
              containerProps={{ className: "-ml-2.5" }}
            />
            <Button variant="gradient" size="lg" className="mt-8" fullWidth>
              Enviar mensaje
            </Button>
          </form>
        </div>
      </section>

      <div className="bg-white">
        <SimpleFooter />
      </div>
    </>
  );
}

export default Home;
