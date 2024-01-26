import { useRouter } from "next/navigation";
import { Button } from "./button";

const MiComponenteConBoton = () => {
  const router = useRouter();

  const handleRedireccion = () => {
    // Redirigir a la página '/otra-pagina'
    router.push("/main");
  };

  return (
    <div>
      <Button className="bg-emerald-600 p-6 text-xl" onClick={handleRedireccion}>
        Administrar Proyectos{" "}
      </Button>
    </div>
  );
};

export default MiComponenteConBoton;
