const Projects = () => {
  return (
    <div className="home-projects-container">
      <div className="project-header">
        <div className="project-header-title">
          <p>Projects</p>
        </div>
        <div className="project-header-button">
          <button className="button font-medium">Create New</button>
        </div>
      </div>
      <div>
        <table className="table">
          <tr>
            <th>
              <p>Name</p>
            </th>
            <th>
              <p>Description</p>
            </th>
            <th>
              <p>Contributors</p>
            </th>
          </tr>
          <tr>
            <td>
              <p>Health Integration</p>
            </td>
            <td>
              <p>It is a integration of health product</p>
            </td>
            <td>
              <p>Akash Shinde</p>
              <p>Ashraf Chaudhary</p>
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default Projects;
