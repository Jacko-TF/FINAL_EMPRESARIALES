import React, { useState, useEffect } from "react";
import axios from "axios";

const MatriculadosPorSemestre = () => {
  const [matriculados, setMatriculados] = useState([]);
  const [error, setError] = useState("");

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

  return (
    <div className="container-fluid">
      <div className="row mt-3">
        <div className="col-12 col-lg-8 offset-0 offset-lg-2">
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
        </div>
      </div>
    </div>
  );
};

export default MatriculadosPorSemestre;
