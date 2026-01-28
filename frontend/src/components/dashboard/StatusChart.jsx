import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#f87171", "#facc15", "#22c55e"];

const StatusChart = ({ data }) => {
  const chartData = [
    { name: "Todo", value: data.todo },
    { name: "In Progress", value: data.inProgress },
    { name: "Done", value: data.done },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <h3 className="text-sm font-medium text-gray-600 mb-4">
        Task Status Overview
      </h3>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={3}
              dataKey="value"
            >
              {chartData.map((_, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StatusChart;
