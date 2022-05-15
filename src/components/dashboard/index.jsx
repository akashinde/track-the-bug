import Navbar from "../navbar";

import Projects from "./projects";
import TicketsBy from "./ticketsBy";

const Dashboard = () => {
  const color1 = "#003f5c";
  const color2 = "#bc5090";
  const color3 = "#ffa600";
  const color4 = "#58508d";

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
            chartLabels={["Issues", "Bugs", "Features"]}
            chartData={[15, 2, 6]}
            colors={[color1, color3, color2]}
          />
          <TicketsBy
            name={"Priority"}
            chartLabels={["Immediate", "High", "Low", "Medium"]}
            chartData={[15, 2, 6, 10]}
            colors={[color3, color1, color4, color2]}
          />
          <TicketsBy
            name={"Status"}
            chartLabels={["Resolved", "New", "In-Progress"]}
            chartData={[15, 6, 10]}
            colors={[color1, color4, color3]}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
