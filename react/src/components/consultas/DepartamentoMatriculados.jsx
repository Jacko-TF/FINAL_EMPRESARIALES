import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MatriculadosPorDepartamento = () => {
  const [matriculados, setMatriculados] = useState([]);

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

  return (
    <div className="container-fluid">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatriculadosPorDepartamento;