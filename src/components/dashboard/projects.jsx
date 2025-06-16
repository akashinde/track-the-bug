import { useState, useEffect } from "react";
import { fetchProjects, createProject } from "../../service/projects";
import Dialog from "../common/Dialog";
import CreateProjectForm from "./CreateProjectForm";

const Projects = () => {
  const [projects, setProjects] = useState();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadProjects();
  }, [])
  
  async function loadProjects() {
    setProjects(await fetchProjects());
  }

  const handleCreateProject = async (formData) => {
    try {
      await createProject(formData);
      loadProjects();
      setShowModal(false);
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  return (
    <div className="home-projects-container">
      <div className="project-header">
        <div className="project-header-title">
          <h3>Projects</h3>
        </div>
        <div className="project-header-button">
          <Dialog
            header="Create new Project"
            body={<CreateProjectForm onSubmit={handleCreateProject} onClose={() => setShowModal(false)}/>}
            buttonName="Create New"
            showModal={showModal}
            setShowModal={setShowModal}
          />
        </div>
      </div>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Status</th>
              <th>Created By</th>
              <th>Assigned To</th>
            </tr>
          </thead>
          <tbody>
            {
              projects && projects.map((el) => {
                return (
                  <tr key={el.name}>
                    <td>{el.name}</td>
                    <td>{el.description}</td>
                    <td>{el.status}</td>
                    <td>{el.createdBy}</td>
                    <td>{el.assignedTo.join(', ')}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Projects;
