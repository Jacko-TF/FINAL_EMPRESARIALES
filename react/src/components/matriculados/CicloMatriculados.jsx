import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MatriculadosPorCiclo = () => {
  const [matriculados, setMatriculados] = useState([]);

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

  return (
    <div className="container-fluid">
      <div className="row mt-3">
        <div className="col-12 col-lg-8 offset-0 offset-lg-2">
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
                {matriculados.map((ciclo) => (
                  <tr key={ciclo.nombre}>
                    <td>{ciclo.semestre__nombre}</td>
                    <td>{ciclo.nombre}</td>
                    <td>{ciclo.matriculados}</td>
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

export default MatriculadosPorCiclo;
