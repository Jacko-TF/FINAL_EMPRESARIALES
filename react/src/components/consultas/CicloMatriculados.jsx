import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import { BarChart, Bar, XAxis,YAxis, CartesianGrid, Tooltip,Legend,ResponsiveContainer} from "recharts";

const MatriculadosPorCiclo = () => {
  const [matriculados, setMatriculados] = useState([]);
  const [error, setError] = useState("");
  const componentPDF = useRef();

  useEffect(() => {
    obtenerMatriculadosCiclo();
  }, []);

  const obtenerMatriculadosCiclo = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/matriculados-por-ciclo/",
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
      setError("Error al obtener los matriculados por ciclo");
    }
  };

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "Matriculador por Carrera",
  });

  function ordenarCiclo(a, b) {
    const semestreA = a.semestre__nombre;
    const semestreB = b.semestre__nombre;
    const cicloA = a.nombre;
    const cicloB = b.nombre;
    if (semestreA !== semestreB) {
      return semestreA.localeCompare(semestreB);
    }
    return cicloA.localeCompare(cicloB);
  }
  const listaOrdenada = [...matriculados].sort(ordenarCiclo);

  return (
    <div ref={componentPDF} style={{ width: "100%" }}>
      <div className="container" style={{ padding: "10px" }}>
        <div className="row mt-3">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="table-responsive">
              <h2 className="mt-4 mb-3">Matriculados por Ciclo</h2>
              {error && <p className="text-danger">{error}</p>}
              {matriculados.length > 0 ? (
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Semestre</th>
                      <th>Ciclo</th>
                      <th>Cantidad de Matriculados</th>
                    </tr>
                  </thead>
                  <tbody className="table-group-divider">
                    {matriculados.map((ciclo) => (
                      <tr key={ciclo.nombre}>
                        <td>{ciclo.semestre__nombre}</td>
                        <td>{ciclo.nombre}</td>
                        <td>{ciclo.matriculados}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No hay matriculados por ciclo disponibles.</p>
              )}
            </div>
            <div>
              <button className="btn btn-success" onClick={generatePDF}>
                PDF
              </button>
            </div>
          </div>
        </div>
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div style={{ width: "100%", height: 400 }} className="mx-auto mt-4">
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
                <Bar dataKey="matriculados" fill="#ec8497" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatriculadosPorCiclo;
