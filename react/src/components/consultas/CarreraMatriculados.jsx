import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MatriculadosPorCarrera = () => {
  const [matriculados, setMatriculados] = useState([]);

  useEffect(() => {
    const fetchMatriculadosPorCarrera = async () => {
      try {
        const accessToken = localStorage.getItem("access_token");
        if (!accessToken) {
          // Manejar acceso no autorizado
          console.log("Acceso no autorizado");
          return;
        }

        const response = await axios.get('http://127.0.0.1:8000/matriculados-por-carrera/', {
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

    fetchMatriculadosPorCarrera();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row mt-3">
        <div className="col-12 col-lg-8 offset-0 offset-lg-2">
          <div className="table-responsive">
            <h2>Matriculados por Carrera</h2>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Carrera</th>
                  <th>Cantidad de Matriculados</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {matriculados.map((carrera) => (
                  <tr key={carrera.nombre}>
                    <td>{carrera.nombre}</td>
                    <td>{carrera.matriculados}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatriculadosPorCarrera;