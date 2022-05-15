const Tickets = () => {
  return (
    <div className="main">
      <div>
        <p className="navbar-title">Tickets</p>
      </div>
      <div className="home-tickets-container">
        <div className="tickets-header">
          <div className="tickets-header-title">
            <p>Tickets</p>
          </div>
        </div>
        <table className="table">
          <tr>
            <th>
              <p>Project Name</p>
            </th>
            <th>
              <p>Ticket</p>
            </th>
            <th>
              <p>Status</p>
            </th>
            <th>
              <p>Create At</p>
            </th>
            <th>
              <p>Priority</p>
            </th>
          </tr>
          <tr>
            <td>
              <p>Health Integration</p>
            </td>
            <td>
              <p>Onboard should not be working</p>
            </td>
            <td>
              <p>Open</p>
            </td>
            <td>
              <p>A month ago</p>
            </td>
            <td>
              <p>High</p>
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default Tickets;
