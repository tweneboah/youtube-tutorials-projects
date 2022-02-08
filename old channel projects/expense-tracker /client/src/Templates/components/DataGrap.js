import { Doughnut, Pie } from "react-chartjs-2";

import React from "react";

const DataGrap = ({ income, expenses }) => {
  const data = {
    labels: ["Expenses", "Income"],
    datasets: [
      {
        label: "# expenses",
        data: [expenses, income],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div
      style={{
        display: "flex",
        height: "60px%",
        width: "20%",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        marginTop: "40px",
      }}
    >
      <div>
        <h3> Transactions</h3>
      </div>
      {/* <Pie data={data} /> */}
    </div>
  );
};

export default DataGrap;
