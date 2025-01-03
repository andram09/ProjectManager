import { useState } from "react";

import NewProject from "./components/NewProject.jsx";
import NoProjectSelected from "./components/NoProjectSelected.jsx";
import Sidebar from "./components/SideBar.jsx";
import SelectedProject from "./components/SelectedProject.jsx";

function App() {

  const [projectState, setProjectState]=useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: []
  });

  function handleAddTask(text){
    setProjectState((prevState) => {
      const taskId=Math.random();
      const newTask={
        text: text,
        projectId: prevState.selectedProjectId,
        id: taskId,
      };

      return {
        ...prevState,
        tasks: [newTask, ...prevState.tasks]
      };
    });
  }

  function handleDeleteTask(id){
    setProjectState(prevState => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((task) => task.id!==id),
      };
    });
  }

  function handleAddBtn(){
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: null,
      };
    });
  }

  function handleCancelBtn(){
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      };
    });
  }

  function handleAddProject(projectData){
    setProjectState((prevState) => {
      const projectId=Math.random();
      const newProject={
        ...projectData,
        id: projectId
      };

      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject]
      };
    });
  }

  function handleSelectProject(id){
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: id,
      };
    });
  }

  function handleDeleteProject(){
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter((project) => project.id!==prevState.selectedProjectId),
      };
    });
  }

  const selectedProject=projectState.projects.find(project => project.id===projectState.selectedProjectId);

  let content=(
  <SelectedProject 
    project={selectedProject} 
    onDelete={handleDeleteProject}
    onAddTask={handleAddTask}
    onDeleteTask={handleDeleteTask}
    tasks={projectState.tasks}
  />
  );
  if(projectState.selectedProjectId === null){
    content=<NewProject onAdd={handleAddProject} onCancel={handleCancelBtn}/>
  } else if (projectState.selectedProjectId === undefined){
    content=<NoProjectSelected onStartAddProject={handleAddBtn}/>
  }


  return (
    <main className="h-screen my-8 flex gap-8">
      <Sidebar 
        onStartAddProject={handleAddBtn}
        projects={projectState.projects}
        onSelectProject={handleSelectProject}
        selectedProjectId={projectState.selectedProjectId}
      />
      {content}
      
    </main>
  );
}

export default App;
