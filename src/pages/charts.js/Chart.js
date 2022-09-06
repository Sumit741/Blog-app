import React, { useContext, useState } from "react";
import {
  Label,
  LabelList,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  Cell,
} from "recharts";
import { UserContext } from "../../context/Context";
import "../../styles/styles.scss";

function Chart() {
  const user = useContext(UserContext);

  const COLORS = [" #0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF3939"];
  const [blogData, setBlogData] = useState([]);
  const data = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
    { name: "Group E", value: 200 },
  ];

  const [newData, setNewData] = useState([]);

  const convert = (a) => {
    const res = {};
    a.forEach((obj) => {
      const key = `${obj.category}`;
      if (!res[key]) {
        res[key] = { ...obj, count: 0 };
      }
      res[key].count += 1;
    });
    return Object.values(res);
  };

  useState(() => {
    const totalBlogs = JSON.parse(localStorage.getItem("blogData"));
    const filteredBlogs = totalBlogs.filter(
      (blog) => blog.userId === user.userDet.userId
    );
    if (filteredBlogs.length > 0) {
      const categories = filteredBlogs.map((blog) => ({
        category: blog.category,
      }));
      setNewData(convert(categories));
    }
  }, []);

  return (
    <div className="pie-chart-container">
      <ResponsiveContainer height={"90%"} width={"90%"}>
        <PieChart height={"100%"} width={"100%"}>
          <Pie
            data={newData}
            dataKey="count"
            nameKey="category"
            cx="50%"
            cy="50%"
            fill="#8884d8"
            innerRadius={70}
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Chart;
