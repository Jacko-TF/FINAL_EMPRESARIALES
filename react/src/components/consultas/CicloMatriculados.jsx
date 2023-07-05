import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { useReactToPrint } from "react-to-print"

const MatriculadosPorCiclo = () => {
  const [matriculados, setMatriculados] = useState([]);
  const componentPDF = useRef();

  useEffect(() => {
    const fetchMatriculadosPorCiclo = async () => {
      try {
        const accessToken = localStorage.getItem("access_token");
        if (!accessToken) {
          // Manejar acceso no autorizado
          console.log("Acceso no autorizado");
          return;
        }

        const response = await axios.get('http://127.0.0.1:8000/matriculados-por-ciclo/', {
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

    fetchMatriculadosPorCiclo();
  }, []);

  const generatePDF = useReactToPrint({
    content: () =>componentPDF.current,
    documentTitle:"Matriculador por Carrera",
    //onAfterPrint:()=>alert("Datos guardados en PDF")
  });

  return (
    <div className="container-fluid">
      <div ref={ componentPDF } style={{width:'100%'}}>
      <div className="row mt-3">
        <div className="col-12 col-lg-12">
          <div className="table-responsive">
            <h2>Matriculados por Ciclos</h2>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Semestre</th>
                  <th>Ciclo</th>
                  <th>Cantidad de Matriculados</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {matriculados.map((ciclo, index) => (
                  <tr key={index}>
                    <td>{ciclo.semestre__nombre}</td>
                    <td>{ciclo.nombre}</td>
                    <td>{ciclo.matriculados}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div>
              <button className='btn btn-success' onClick={ generatePDF }>PDF</button>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-12">
          <div className="chart-container">
            <BarChart
              width={500}
              height={300}
              data={matriculados}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="nombre" />
              <YAxis />
              <Bar
                dataKey="matriculados"
                fill="#d88884"
                label={{ position: "top" }}
              />
            </BarChart>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default MatriculadosPorCiclo;