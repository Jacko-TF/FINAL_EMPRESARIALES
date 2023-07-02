import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CursosList() {
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    getCursos();
  }, []);

  const getCursos = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/cursos/', {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setCursos(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row mt-3">
        <div className="col-12 col-lg-8 offset-0 offset-lg-2">
          <div className="table-responsive">
          <h2>Lista de Cursos</h2>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>ID</th>
                  <th>Descripción</th>
                  <th>Créditos</th>
                  <th>Cupos</th>
                  <th>Horas</th>
                  <th>Sección</th>
                  <th>Ciclo</th>
                </tr>
              </thead>
              <tbody>
                {cursos.map((curso) => (
                  <tr key={curso.id}>
                    <td>{curso.nombre}</td>
                    <td>{curso.id}</td>
                    <td>{curso.descripcion}</td>
                    <td>{curso.credito}</td>
                    <td>{curso.seccion.cupos}</td>
                    <td>{curso.horas}</td>
                    <td>{curso.seccion.nombre}</td>
                    <td>{curso.seccion.ciclo.nombre}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CursosList;