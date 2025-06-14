import { useState, useEffect } from "react";
import Navbar from "../navbar";
import Projects from "./projects";
import TicketsBy from "./ticketsBy";
import { fetchTicketsByType, fetchTicketsByPriority, fetchTicketsByStatus } from "../../service/tickets";

const TYPE_COLORS = [
  '#FF6B6B', // (A strong, somewhat urgent red)
  '#6FCF97', // (A fresh, positive green)
  '#56CCF2', // (A warm, neutral yellow/orange)
]
const PRIORITY_COLORS = [
  '#EB5757',  // (Vivid red - immediate attention)
  '#F2994A',  // (Orange - high importance, but not critical)
  '#F2C94C',  // (Yellow/Amber - moderate importance)
  '#6FCF97', // (Green - less urgent, can wait)
  '#BDBDBD',  // (Neutral gray - very low or no urgency)
]
const STATUS_COLORS = [
  '#2F80ED', // (Standard blue - indicates a new item, awaiting action)
  '#F2C94C', // (Yellow/Amber - actively being worked on)
  '#BB6BD9', // (Purple - distinct state, often a hand-off)
  '#27AE60', // (Green - positive outcome, problem addressed)
  '#4F4F4F', // (Dark gray - final state, no further action needed)
]

const Dashboard = () => {
  const [typeData, setTypeData] = useState({ labels: [], data: [] });
  const [priorityData, setPriorityData] = useState({ labels: [], data: [] });
  const [statusData, setStatusData] = useState({ labels: [], data: [] });

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
    <>
      <div>
        <p className="navbar-title">Dashboard</p>
      </div>
      <div>
        <div className="tickets-container">
          <TicketsBy
            name={"Type"}
            chartLabels={typeData.labels}
            chartData={typeData.data}
            colors={TYPE_COLORS}
          />
          <TicketsBy
            name={"Priority"}
            chartLabels={priorityData.labels}
            chartData={priorityData.data}
            colors={PRIORITY_COLORS}
          />
          <TicketsBy
            name={"Status"}
            chartLabels={statusData.labels}
            chartData={statusData.data}
            colors={STATUS_COLORS}
          />
        </div>
      </div>
      <Projects />
    </>
  );
};

export default Dashboard;
