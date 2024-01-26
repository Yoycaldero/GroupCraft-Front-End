import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import axios from "axios";

export function CardWithForm() {
  const [projectData, setProjectData] = useState({
    owner: "",
    name: "",
    description: "",
    members: [""],
  });

  const { owner, name, description, members } = projectData;

  //Name
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProjectData((prevData) => ({
      ...prevData,
      name: event.target.value,
    }));
  };

  //Descripcion
  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setProjectData((prevData) => ({
      ...prevData,
      description: event.target.value,
    }));
  };

  //Miembros
  const handleMembersChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProjectData((prevData) => ({
      ...prevData,
      members: event.target.value.split(",").map((member) => member.trim()),
    }));
  };

  //DUEÑO
  const handleOwnerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProjectData((prevData) => ({
      ...prevData,
      owner: event.target.value,
    }));
  };

  //metodo para cerrar y restablecer el formulario
  const handleCancel = () => {
    setProjectData({
      owner: "Nuevo Propietario",
      name: "Nuevo Proyecto",
      description: "Nueva Descripción",
      members: ["Nuevo Miembro1", "Nuevo Miembro2"],
    });

    // Cerrar el formulario

  };

  //METODO POST
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      const response = await axios.post(
        "http://localhost:2004/api/projects",
        projectData
      );

      console.log("Proyecto creado con éxito:", response.data);
        return response.data
    } catch (error) {
      console.error("Error al crear el proyecto:", error);
    }
  };

  return (
    <Card className="w-[350px] ml-10 border-black mt-10">
      <CardHeader>
        <CardTitle>Crea tu Proyecto</CardTitle>
        <CardDescription>Agrega tu nuevo proyecto</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5 ">
              <Label  htmlFor="name">Nombre</Label>
              <Input
              className="border-gray-900"
                id="name"
                placeholder="Nombre del proyecto"
                value={name}
                onChange={handleNameChange}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="members">Miembros</Label>
              <Input
              className="border-gray-900"
                id="members"
                placeholder="Miembros (Separados por coma)"
                value={members.join(", ")}
                onChange={handleMembersChange}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="description">Descripción</Label>
              <Input
              className="border-gray-900"
                id="description"
                placeholder="Descripcion del proyecto"
                value={description}
                onChange={handleDescriptionChange}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="owner">Dueño</Label>
              <Input
              className="border-gray-900"
                id="owner"
                placeholder="Dueño del proyecto"
                value={owner}
                onChange={handleOwnerChange}
              />
            </div>
          </div>
          <div className="mt-4">
            <Button variant="outline" onClick={handleCancel}>
              Cancelar
            </Button>
            
            <Button type="submit">Guardar</Button>
            
          </div>
        </form>
      </CardContent>
      {/* ... (resto del código) */}
    </Card>
  );
}
