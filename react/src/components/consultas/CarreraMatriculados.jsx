import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useReactToPrint } from "react-to-print";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const MatriculadosPorCarrera = () => {
  const [matriculados, setMatriculados] = useState([]);
  const [error, setError] = useState("");
  const componentPDF = useRef();

  useEffect(() => {
    obtenerMatriculadosPorCarrera();
  }, []);

  const obtenerMatriculadosPorCarrera = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/matriculados-por-carrera/",
        {
          headers: {
            Authorization: "",
          },
        }
      );
      if (response && response.status === 200) {
        setMatriculados(response.data);
      }
    } catch (error) {
      console.error(error);
      setError("Error al obtener los matriculados por carrera");
    }
  };

  const generatePDF = useReactToPrint({
    content: () =>componentPDF.current,
    documentTitle:"Matriculador por Carrera",
    //onAfterPrint:()=>alert("Datos guardados en PDF")
  });

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff6e63", "#a2a2a2"];

  return (
    <div className="container">
      <div ref={ componentPDF } style={{width:'100%'}}>
      <div className="row mt-3">
        <div className="col-lg-6">
          <div className="table-responsive">
            <h2 className="mt-4 mb-3">Matriculados por Carrera</h2>
            {error && <p className="text-danger">{error}</p>}
            {matriculados.length > 0 ? (
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Carrera</th>
                    <th>Cantidad de Matriculados</th>
                  </tr>
                </thead>
                <tbody>
                  {matriculados.map((carrera, index) => (
                    <tr key={index}>
                      <td>{carrera.nombre}</td>
                      <td>{carrera.matriculados}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No hay matriculados por carrera disponibles.</p>
            )}
          </div>
          <div>
            <button className='btn btn-success' onClick={ generatePDF }>PDF</button>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-lg-6">
          <div style={{ width: '100%', height: 400 }} className="mx-auto mt-4">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={matriculados}
                  dataKey="matriculados"
                  nameKey="nombre"
                  cx="50%"
                  cy="50%"
                  outerRadius={150}
                  fill="#8884d8"
                  label
                >
                  {matriculados.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default MatriculadosPorCarrera;