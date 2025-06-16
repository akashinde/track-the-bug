import { useState, useEffect } from "react";
import { fetchTickets, createTicket } from "../../service/tickets";
import Dialog from "../common/Dialog";
import CreateTicketForm from "./CreateTicketForm";

const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    const fetchedTickets = await fetchTickets();
    setTickets(fetchedTickets);
  };

  const handleCreateTicket = async (formData) => {
    try {
      await createTicket(formData);
      loadTickets();
      setShowModal(false);
    } catch (error) {
      console.error("Error creating ticket:", error);
    }
  };

  return (
    <>
      <div>
        <p className="navbar-title">Tickets</p>
      </div>
      <div className="home-tickets-container">
        <div className="tickets-header">
          <div className="tickets-header-title">
            <p>Tickets</p>
          </div>
          <div className="project-header-button">
            <Dialog
              header="Create new Ticket"
              buttonName="Create New"
              body={<CreateTicketForm onSubmit={handleCreateTicket} onClose={() => setShowModal(false)}/>}
              showModal={showModal}
              setShowModal={setShowModal}
            />
          </div>
        </div>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Type</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Assignees</th>
                <th>Project</th>
              </tr>
            </thead>
            <tbody>
              {
                tickets && tickets.map((el) => {
                  return (
                    <tr key={el.title}>
                      <td>{el.title}</td>
                      <td>{el.description}</td>
                      <td>{el.type}</td>
                      <td>{el.status}</td>
                      <td>{el.priority}</td>
                      <td>{el.assignedTo}</td>
                      <td>{el.projectId}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Tickets;
