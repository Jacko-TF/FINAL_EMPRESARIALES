import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
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
    content: () => componentPDF.current,
    documentTitle: "Matriculados_por_Carrera",
  });

  const wrapTick = (text, width) => {
    const words = text.split(" ");
    const lineHeight = 16;
    const maxLines = Math.floor(width / lineHeight);
    let wrappedText = "";

    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      const nextText = `${wrappedText} ${word}`;
      const nextWidth = measureTextWidth(nextText);

      if (nextWidth > width && i > 0) {
        wrappedText += `\n${word}`;
      } else {
        wrappedText += ` ${word}`;
      }
    }

    return wrappedText.trim();
  };

  const measureTextWidth = (text) => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    context.font = "12px sans-serif";
    return context.measureText(text).width;
  };

  return (
    <div className="container">
      <div ref={componentPDF} style={{ width: "100%" }}>
      <div className="row mt-3">
        <div className="col-lg-12">
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
          <button className="btn btn-success" onClick={generatePDF}>
                PDF
            </button>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-lg-12">
          <div style={{ width: "100%", height: 400 }} className="mx-auto mt-4">
            <ResponsiveContainer>
            <BarChart
                data={matriculados}
                margin={{ top: 20, right: 30, left: 10, bottom: 2 }}
                fontSize={13}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="nombre"
                  interval={0}
                  angle={-45}
                  tick={{
                    width: 100,
                    wrapStyle: {
                    whiteSpace: "pre-wrap",
                    },
                  }}
                />
                <YAxis 
                  label={{
                    value: "Cantidad de Matriculados por carrera",
                    angle: -90,
                    position: "insideLeft",
                    dy: 90, }}/>
                <Tooltip formatter={(value) => [value, "Cantidad de Matriculados"]} />
                <Legend />
                <Bar dataKey="matriculados" fill="#3b83bd" barSize={40} />
              </BarChart>
              </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default MatriculadosPorCarrera;
