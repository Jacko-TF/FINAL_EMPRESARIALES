import React, { useEffect, useState, useRef } from 'react';
import { LineChart, Line, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import { useReactToPrint } from "react-to-print";

const MatriculadosPorDepartamento = () => {
  const [matriculados, setMatriculados] = useState([]);
  const componentPDF = useRef();

  useEffect(() => {
    const fetchMatriculadosPorDepartamento = async () => {
      try {
        const accessToken = localStorage.getItem("access_token");
        if (!accessToken) {
          // Manejar acceso no autorizado
          console.log("Acceso no autorizado");
          return;
        }

        const response = await axios.get('http://127.0.0.1:8000/matriculados-por-departamento/', {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setMatriculados(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMatriculadosPorDepartamento();
  }, []);

  const generatePDF = useReactToPrint({
    content: () =>componentPDF.current,
    documentTitle:"Matriculados_por_Departamento",
    //onAfterPrint:()=>alert("Datos guardados en PDF")
  });

  return (
    <div className="container-fluid">
      <div ref={ componentPDF } style={{width:'100%'}}>
      <div className="row mt-3">
        <div className="col-12 col-lg-8 offset-0 offset-lg-2">
          <div className="table-responsive">
            <h2>Matriculados por Departamento</h2>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Departamento</th>
                  <th>Cantidad de Matriculados</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {matriculados.map((departamento) => (
                  <tr key={departamento.nombre}>
                    <td>{departamento.nombre}</td>
                    <td>{departamento.matriculados}</td>
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
            <LineChart width={500} height={300} data={matriculados}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="nombre" padding={{ left: 30, right: 30 }}/>
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" stroke="#8884d8" dataKey="matriculados" fill="black" strokeDasharray="5 5"/>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
    </div>
  );
};

export default MatriculadosPorDepartamento;