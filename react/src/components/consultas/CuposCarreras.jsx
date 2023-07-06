import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useReactToPrint } from "react-to-print"

const CuposCarreraList = () => {
  const [cupos, setCupos] = useState([]);
  const componentPDF = useRef();

  useEffect(() => {
    getCupos();
  }, []);

  const getCupos = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/cupos-carrera');
      setCupos(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "Matriculador por Carrera",
  });

  return (
    <div className="container-fluid">
      <div ref={componentPDF} style={{ width: '100%' }}>
        <h1>Cupos por Carrera</h1>
        <div className="row mt-3 col-12">
          <div className="col-12 col-lg-8 offset-0 offset-lg-2">
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Carrera</th>
                    <th>Semestre</th>
                    <th>Cupos</th>
                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  {cupos.map((cupo) => (
                    <tr key={cupo.id}>
                      <td>{cupo.id}</td>
                      <td>{cupo.carrera}</td>
                      <td>{cupo.semestre}</td>
                      <td>{cupo.cupos}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div>
                <button className='btn btn-success' onClick={generatePDF}>PDF</button>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-3 col-12">
          <div className="col-12 col-lg-8 offset-0 offset-lg-2">
            <ResponsiveContainer width="100%" height={600}>
              <PieChart>
              <Tooltip formatter={(value, name, entry) => [value,`${entry.payload.carrera}`]} />

                <Pie
                  data={cupos}
                  dataKey="cupos"
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ cx, cy, midAngle, innerRadius, outerRadius, value, index }) => {
                    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
                    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);
                    return (
                      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                        {`${value}`}
                      </text>
                    );
                  }}
                  outerRadius={200}
                  fill="#8884d8"
                >
                  {cupos.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      </div>
    </div>
  );
};

export default CuposCarreraList;



