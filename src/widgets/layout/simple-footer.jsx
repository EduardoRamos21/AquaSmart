import PropTypes from "prop-types";
import { Typography } from "@material-tailwind/react";

export function SimpleFooter({ brandName, brandLink }) {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 py-10 bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364]">
      <div className="container mx-auto flex flex-col items-center justify-center gap-4 text-center px-4">
        <Typography variant="small" className="text-white text-lg font-semibold tracking-wide uppercase">
          {brandName}
        </Typography>

        <Typography variant="small" className="text-gray-300 max-w-2xl leading-relaxed">
          Conectamos innovación y sostenibilidad para transformar la agricultura. <br />
          AquaSmart automatiza, supervisa y optimiza sistemas de riego con tecnología de vanguardia, 
          incluso en zonas sin conectividad.
        </Typography>

        <Typography variant="small" className="text-gray-400 font-light mt-2">
          &copy; {year} {brandName}. Todos los derechos reservados.
        </Typography>
      </div>
    </footer>
  );
}

SimpleFooter.defaultProps = {
  brandName: "AquaSmart",
  brandLink: "#",
};

SimpleFooter.propTypes = {
  brandName: PropTypes.string,
  brandLink: PropTypes.string,
};

SimpleFooter.displayName = "/src/widgets/layout/simple-footer.jsx";

export default SimpleFooter;
