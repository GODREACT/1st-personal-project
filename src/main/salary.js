import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const data = [
  {
      name: "1년차",
      MinimumSalaryFrontendDeveloper: 3000,
      MinimumSalaryBackendDeveloper: 3200,
      amt: 2400,
  },
  {
      name: "2년차",
      MinimumSalaryFrontendDeveloper: 3500,
      MinimumSalaryBackendDeveloper: 3800,
      amt: 2210,
  },
  {
      name: "3년차",
      MinimumSalaryFrontendDeveloper: 4000,
      MinimumSalaryBackendDeveloper: 4500,
      amt: 2290,
  },
  {
      name: "4년차",
      MinimumSalaryFrontendDeveloper: 4500,
      MinimumSalaryBackendDeveloper: 5000,
      amt: 2000,
  },
  {
      name: "5년차",
      MinimumSalaryFrontendDeveloper: 5000,
      MinimumSalaryBackendDeveloper: 5800,
      amt: 2181,
  },
  {
      name: "6년차",
      MinimumSalaryFrontendDeveloper: 5500,
      MinimumSalaryBackendDeveloper: 6500,
      amt: 2500,
  },
  {
      name: "7년차",
      MinimumSalaryFrontendDeveloper: 6000,
      MinimumSalaryBackendDeveloper: 7500,
      amt: 2100,
  },
];


function Salary() {
  const [ref, inView] = useInView({
    triggerOnce: true, // 한 번만 트리거되도록 설정
    threshold: 0.2, // 뷰포트에 보이는 정도 조정 (원하는 비율로 변경 가능)
  });
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: { delay: 0.3 },
      }}
      id="salary_container"
    >
      <h3>Minimum salary for front-end and back-end developers(단위:만원)</h3>
      <ResponsiveContainer>
        <LineChart
          width={400}
          height={500}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="MinimumSalaryBackendDeveloper" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="MinimumSalaryFrontendDeveloper" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

export default Salary;