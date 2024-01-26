import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import axios from 'axios';

export function CardMembers({ onClose, onAddProject }: { onClose: () => void, onAddProject: () => void }) {
  const [projectData, setProjectData] = useState({
    owner: 'Nuevo Propietario', // Valor inicial o valor por defecto
    name: 'Nuevo Proyecto', // Valor inicial o valor por defecto
    description: 'Nueva Descripción', // Valor inicial o valor por defecto
    members: ['Nuevo Miembro1', 'Nuevo Miembro2'], // Valor inicial o valor por defecto
  });

  const { owner, name, description, members } = projectData;

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProjectData((prevData) => ({
      ...prevData,
      name: event.target.value,
    }));
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProjectData((prevData) => ({
      ...prevData,
      description: event.target.value,
    }));
  };
  const handleMembersChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProjectData((prevData) => ({
      ...prevData,
      Members: event.target.value,
    }));
  };
  const handleOwnerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProjectData((prevData) => ({
      ...prevData,
      owner: event.target.value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      // Aquí puedes realizar cualquier validación adicional antes de enviar los datos

      // Envía los datos del nuevo proyecto
      const response = await axios.post('http://localhost:2004/api/projects', projectData);

      // Maneja la respuesta como desees
      console.log('Proyecto creado con éxito:', response.data);

      // Actualiza el estado o realiza otras acciones necesarias
      onAddProject();

      // Cierra el modal después del envío exitoso
      onClose();
    } catch (error) {
      console.error('Error al crear el proyecto:', error);
      // Maneja errores, muestra mensajes al usuario, etc.
    }
  };
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Agrega tu nuevo proyecto</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
        <div className="grid w-full items-center gap-4">
           
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="description">Miembros</Label>
              <Input
                id="description"
                placeholder="Description of your project"
                value={members}
                onChange={handleMembersChange}
              />
            </div>
            
            {/* Agrega lógica similar para mostrar y prellenar los otros campos */}
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  );
}
