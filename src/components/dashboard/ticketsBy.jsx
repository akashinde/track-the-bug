import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

const TicketsBy = ({ name, chartLabels, chartData, colors }) => {
  ChartJS.register(ArcElement, Tooltip, Legend);

  const data = {
    labels: chartLabels,
    datasets: [
      {
        data: chartData,
        backgroundColor: colors,
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="tickets-card-container">
      <p className="tickets-by-title">Tickets by {name}</p>
      <div>
        <Pie
          data={data}
          options={{
            maintainAspectRatio: false,
            layout: {
              padding: {
                right: 20,
              },
            },
            plugins: {
              legend: {
                display: true,
                position: "right",
                labels: {
                  color: "#000",
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default TicketsBy;
