"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { CardWithForm } from "@/components/component/CardInformation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { Menu, PencilIcon, PlusSquare, TrashIcon } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import Modal from "react-modal";
import ProjectEdit from "@/app/main/components/ProjectEdit";
import { useCreate } from "@/actions/use-create";
import { Project, useEdit } from "@/actions/use-edit";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/path/to/pagination";

const MainPage = () => {
  const [projects, setProjects] = useState([]);
  const [newProjectData, setNewProjectData] = useState({
    owner: "Nuevo Propietario",
    name: "Nuevo Proyecto",
    description: "Nueva Descripción",
    members: ["Nuevo Miembro1", "Nuevo Miembro2"],
  });
  const create = useCreate()
  const edit = useEdit()

  const getTableData = async () => {
    try {
      const response = await axios.get("http://localhost:2004/api/projects");
      setProjects(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTableData();
  }, []);

  const openEditModal = (project: Project) => {
    edit.onOpen(project)
  }

  const deleteProject = async (id) => {
    try {
      // Realiza la llamada a la API para eliminar el proyecto por ID
      await axios.delete(`http://localhost:2004/api/projects/${id}`);

      // Actualiza el estado para reflejar la eliminación
      setProjects((prevProjects) =>
        prevProjects.filter((project) => project.id !== id)
      );
    } catch (error) {
      console.error("Error al eliminar el proyecto:", error);
    }
  };

  const onAddProject = async () => {
    // Actualiza los proyectos después de agregar uno nuevo
    await getTableData();
  };

  return (
    <>
      <div className="flex flex-col h-full">
        <header className="flex items-center justify-between px-4 py-7 border-b dark:border-gray-800 w-full bg-emerald-600 text-white">
          <h1 className="font-sans text-2xl font-semibold tracking-wide">GroupCraft</h1>
          <div>
            <UserButton afterSignOutUrl="/" />
          </div>
        </header>

        {/* Nombre de los Proyectos */}
        <Tabs className="flex flex-col flex-1" defaultValue="project1">
          <TabsList className="flex px-4 py-2 border-b dark:border-gray-800 justify-center">
            {projects.map((project, index) => (
              <TabsTrigger
                key={index}
                className="px-4 border-2 rounded-sm"
                value={`project${index + 1}`}
              >
                {project.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {projects.map((project, index) => (
            <TabsContent
            
              key={index}
              className="flex-1 overflow-y-auto"
              value={`project${index + 1}`}
            >
              <div className="p-4 space-y-4 ml-10">
                {/* nombre del proyecto */}
                <div>
                  <div className="flex items-center ">
                    <div className="flex flex-col items-start">
                      <h2 className="text-xl font-bold px-10 pb-5">
                        {project.name}
                      </h2>
                      <div className="text-lg flex justify-between items-center gap-x-6">
                        <span className="text-gray-500">
                          Propietario: 
                        </span>
                          {project.owner}
                        <span className="text-gray-500">
                          Descripción del proyecto:
                        </span>
                          {project.description}

                      </div>
                    </div>
                    {/* boton de añadir */}
                    <div className="items-center ml-auto justify-end flex">
                      <Button size="icon" variant="ghost" onClick={create.onOpen}>
                        <PlusSquare className="w-5 h-5  " />
                        <div className="sr-only">Add project</div>
                      </Button>

                      
                   
                      {/* Botón de editar */}
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => openEditModal(project)}
                      >
                        <PencilIcon className="w-4 h-4 " />
                        <span className="sr-only">Edit</span>
                      </Button>

                      {/* boton de eliminar */}
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => deleteProject(project.id)}
                      >
                        <TrashIcon className="w-4 h-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </div>
                </div>

                

                <div className="grid gap-2">
                  <h2 className=" font-bold text-lg ">Miembros</h2>
                  {project.members.map((member, memberIndex) => (
                    <div
                      key={memberIndex}
                      className="flex items-center justify-between p-2 rounded-md bg-gray-100 dark:bg-gray-800"
                    >
                      <span className="font-medium">{member}</span>
                     
                  
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
      {create.isOpen && ( <CardWithForm /> )}
      {edit.isOpen && ( <ProjectEdit /> )}

    </>
  );
};

export default MainPage;
