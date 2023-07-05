import React, { useEffect, useState, useRef } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import { useReactToPrint } from "react-to-print"

function CuposCicloList() {
  const [cuposCiclo, setCuposCiclo] = useState([]);
  const componentPDF = useRef();

  useEffect(() => {
    getCuposCiclo();
  }, []);

  const getCuposCiclo = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/cupos-ciclo/');
      setCuposCiclo(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const generatePDF = useReactToPrint({
    content: () =>componentPDF.current,
    documentTitle:"Matriculador por Carrera",
    //onAfterPrint:()=>alert("Datos guardados en PDF")
  });

  return (
    <div className="container-fluid">
      <div ref={ componentPDF } style={{width:'100%'}}>
      <h1>Cupos por Ciclo</h1>
      <div className="row mt-3 col-12">
        <div className="col-12 col-lg-8 offset-0 offset-lg-2">
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Ciclo</th>
                  <th>Semestre</th>
                  <th>Cupos</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {cuposCiclo.map((cupo) => (
                  <tr key={cupo.id}>
                    <td>{cupo.id}</td>
                    <td>{cupo.ciclo}</td>
                    <td>{cupo.semestre}</td>
                    <td>{cupo.cupos}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div>
              <button className='btn btn-success' onClick={ generatePDF }>PDF</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-3 col-12">
        <div className="col-12">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart width={500} height={300} data={cuposCiclo}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="ciclo" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="cupos" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
    </div>
  );
}

export default CuposCicloList;