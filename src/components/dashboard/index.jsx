import { useState, useEffect } from "react";
import Navbar from "../navbar";
import Projects from "./projects";
import TicketsBy from "./ticketsBy";
import { fetchTicketsByType, fetchTicketsByPriority, fetchTicketsByStatus } from "../../service/tickets";

const Dashboard = () => {
  const [typeData, setTypeData] = useState({ labels: [], data: [] });
  const [priorityData, setPriorityData] = useState({ labels: [], data: [] });
  const [statusData, setStatusData] = useState({ labels: [], data: [] });

  const color1 = "#003f5c";
  const color2 = "#bc5090";
  const color3 = "#ffa600";
  const color4 = "#58508d";

  useEffect(() => {
    const fetchData = async () => {
      const typeCount = await fetchTicketsByType();
      const priorityCount = await fetchTicketsByPriority();
      const statusCount = await fetchTicketsByStatus();

      setTypeData({
        labels: Object.keys(typeCount),
        data: Object.values(typeCount)
      });

      setPriorityData({
        labels: Object.keys(priorityCount),
        data: Object.values(priorityCount)
      });

      setStatusData({
        labels: Object.keys(statusCount),
        data: Object.values(statusCount)
      });
    };

    fetchData();
  }, []);

  return (
    <div className="main">
      <div>
        <p className="navbar-title">Dashboard</p>
      </div>
      <Projects />
      <div>
        <div className="tickets-container">
          <TicketsBy
            name={"Type"}
            chartLabels={typeData.labels}
            chartData={typeData.data}
            colors={[color1, color3, color2]}
          />
          <TicketsBy
            name={"Priority"}
            chartLabels={priorityData.labels}
            chartData={priorityData.data}
            colors={[color3, color1, color4, color2]}
          />
          <TicketsBy
            name={"Status"}
            chartLabels={statusData.labels}
            chartData={statusData.data}
            colors={[color1, color4, color3]}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
