import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useReactToPrint } from "react-to-print"

import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const MatriculadosPorSemestre = () => {
  const [matriculados, setMatriculados] = useState([]);
  const [error, setError] = useState("");
  const componentPDF = useRef();


  useEffect(() => {
    obtenerMatriculadosSemestre();
  }, []);

  const obtenerMatriculadosSemestre = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/matriculados-por-semestre/",
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
      setError("Error al obtener los matriculados por semestre");
    }
  };

  const generatePDF = useReactToPrint({
    content: () =>componentPDF.current,
    documentTitle:"Matriculador_por_Semestre",
    //onAfterPrint:()=>alert("Datos guardados en PDF")
  });

  function ordenarSemestre(a, b) {
    const nombreA = a.nombre;
    const nombreB = b.nombre;
    const añoA = parseInt(nombreA.split('-')[0]);
    const añoB = parseInt(nombreB.split('-')[0]);
    if (añoA !== añoB) {
      return añoA - añoB;
    }
    const numeroA = parseInt(nombreA.split('-')[1]);
    const numeroB = parseInt(nombreB.split('-')[1]);
    return numeroA - numeroB;
  }
  const listaOrdenada = matriculados.sort(ordenarSemestre);

  return (
    <div ref={ componentPDF } style={{width:'100%'}}>
    <div className="container" style={{padding:"10px"}}>
      <div className="row mt-3">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="table-responsive">
            <h2 className="mt-4 mb-3">Matriculados por Semestre</h2>
            {error && <p className="text-danger">{error}</p>}
            {matriculados.length > 0 ? (
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Semestre</th>
                    <th>Cantidad de Matriculados</th>
                  </tr>
                </thead>
                <tbody>
                  {matriculados.map((matriculado, index) => (
                    <tr key={index}>
                      <td>{matriculado.nombre}</td>
                      <td>{matriculado.matriculados}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No hay matriculados por semestre disponibles.</p>
            )}
          </div>
          <div>
            <button className='btn btn-success' onClick={ generatePDF }>PDF</button>
          </div>
        </div>
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div style={{ width: '100%', height: 400 }} className="mx-auto mt-4">
          <ResponsiveContainer>
              <BarChart
                width={500}
                height={300}
                data={listaOrdenada}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="nombre" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="matriculados" fill="#81A5EF" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default MatriculadosPorSemestre;