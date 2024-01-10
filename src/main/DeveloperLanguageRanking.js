import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import './main.css';
import { motion } from "framer-motion";

const data = [
  { name: '기타', value: 235 }, 
  { name: 'JavaScript', value: 181 },
  { name: 'Ruby', value: 140 },
  { name: 'C', value: 74 },
  { name: 'Java', value: 140 },
  { name: 'PHP', value: 94 },
  { name: 'Python', value: 86 },
  { name: 'C++', value: 50 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF8A19', '#19FFAF', '#FF195E'];

// 주석으로 설명을 작성합니다.
const explanation = `Usage of Programming Languages`;

const RADIAN = Math.PI / 180;

function DeveloperLanguageRanking() {
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${data[index].name} ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
   // data 배열에서 특정 항목들의 index를 찾습니다.
   const cPlusPlusIndex = data.findIndex((item) => item.name === 'C++');
   const rubyIndex = data.findIndex((item) => item.name === 'Ruby');
   const cIndex = data.findIndex((item) => item.name === 'C');
   const pythonIndex = data.findIndex((item) => item.name === 'Python');

  return (
    <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{
      opacity: 1,
      y: 0,
      transition: { delay: 1 },
    }}
    >
      <div id="DeveloperLanguageRanking_container">
        <p>{explanation}</p>
        <ResponsiveContainer width="100%" height={450}>
          {/* Pie Chart */}
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={210}
              fill="#8884d8"
              dataKey="value"
            >
              {/* Cells의 순서를 조정하여 원하는 위치로 이동시킵니다. */}
              <Cell key={`cell-${cPlusPlusIndex}`} fill={COLORS[cPlusPlusIndex % COLORS.length]} />
              <Cell key={`cell-${rubyIndex}`} fill={COLORS[rubyIndex % COLORS.length]} />
              <Cell key={`cell-${cIndex}`} fill={COLORS[cIndex % COLORS.length]} />
              <Cell key={`cell-${pythonIndex}`} fill={COLORS[pythonIndex % COLORS.length]} />

              {data.map((entry, index) => {
                // 특정 항목에 해당하는 Cell은 이미 추가되었으므로 건너뜁니다.
                if (index === cPlusPlusIndex || index === rubyIndex || index === cIndex || index === pythonIndex) {
                  return null;
                }
                return <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />;
              })}
            </Pie> 
          </PieChart>  
          <p>JavaScript:18.1% Ruby:14% Java:14% PHP:9.4% Python:8.6% C:7.4% C++:5% 기타:23.5%</p>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

export default DeveloperLanguageRanking;