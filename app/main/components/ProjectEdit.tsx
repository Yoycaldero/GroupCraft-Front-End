// ProjectEdit.tsx
"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Project, useEdit } from "@/actions/use-edit";

const ProjectEdit = () => {
  const edit = useEdit();

  const [editProjectData, setEditProjectData] = useState({
    owner: edit.project?.owner || '',
    name: edit.project?.name || '',
    description: edit.project?.description || '',
    members: edit.project?.members || [],
  });

  const { owner, name, description, members } = editProjectData;

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditProjectData((prevData) => ({
      ...prevData,
      name: event.target.value,
    }));
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEditProjectData((prevData) => ({
      ...prevData,
      description: event.target.value,
    }));
  };

  const handleMembersChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const membersArray = event.target.value.split(',').map(member => member.trim());
    setEditProjectData((prevData) => ({
      ...prevData,
      members: membersArray,
    }));
  };
  

  const handleOwnerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditProjectData((prevData) => ({
      ...prevData,
      owner: event.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    // e.preventDefault()
    console.log(editProjectData)
    try {
      const response = await axios.put(
        `http://localhost:2004/api/projects/${edit.project?.id}`,
        editProjectData
      );
      console.log("Proyecto actualizado con éxito:", response.data);
    } catch (error) {
      console.error("Error al actualizar el proyecto:", error);
    }
  };

  return (
    <form className="ml-10 my-[50px]  w-[950px] h-[500px]" onSubmit={handleSubmit}>
      <div className="  grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <Label className="text-lg font-bold" htmlFor="name">Nombre</Label>
          <Input
          className="w-[300px] border-gray-900"
            id="name"
            placeholder="Name of your project"
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label className="text-lg font-bold" htmlFor="members">Miembros</Label>
          <Input
          className="w-[900px] border-gray-900"
            id="members"
            placeholder="Members of your project (comma-separated)"
            value={members}
            onChange={handleMembersChange}
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label className="text-lg font-bold" htmlFor="description">Descripción</Label>
          <Input
          className="w-[900px] border-gray-900"
            id="description"
            placeholder="Description of your project"
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label className="text-lg font-bold" htmlFor="owner">Dueño</Label>
          <Input
          className="w-[300px] border-gray-900"
            id="owner"
            placeholder="Owner of your project"
            value={owner}
            onChange={handleOwnerChange}
          />
        </div>
      </div>
      <div className="mt-4 ml-[100px]">
        <Button variant="outline" onClick={edit.onClose}>
          Cancelar
        </Button>
        <Button type="submit">Actualizar Proyecto</Button>
      </div>
    </form>
  );
};

export default ProjectEdit;
