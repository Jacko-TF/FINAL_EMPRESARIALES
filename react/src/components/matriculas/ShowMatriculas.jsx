import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const baseUrl = "http://127.0.0.1:8000/matriculas/";

const ShowMatriculas = () => {
  const [matriculas, setMatriculas] = useState([]);

  useEffect(() => {
    getMatriculas();
  }, []);

  const getMatriculas = async () => {
    try {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        console.log("Unauthorized access");
        return;
      }

      const response = await axios.get(baseUrl, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setMatriculas(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteMatricula = async (id) => {
    try {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        console.log("Unauthorized access");
        return;
      }

      await axios.delete(`${baseUrl}${id}/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      getMatriculas();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row mt-3">
        <div className="col-md-4 offset-md-4">
          <div className="d-grid mx-auto">
            <Link to="/matricula/create" className="btn btn-dark">Añadir</Link>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-12 col-lg-8 offset-0 offset-lg-2">
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Fecha Matricula</th>
                  <th>Apellido</th>
                  <th>Nombre</th>
                  <th>Carrera</th>
                  <th>Semestre</th>
                  <th>Ciclo</th>
                  <th>Sección</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {matriculas.map((matricula, index) => (
                  <tr key={matricula.id}>
                    <td>{index + 1}</td>
                    <td>{matricula.fecha}</td>
                    <td>{matricula.estudiante.apellido}</td>
                    <td>{matricula.estudiante.nombre}</td>
                    <td>{matricula.seccion.carrera.nombre}</td>
                    <td>{matricula.seccion.ciclo.semestre.nombre}</td>
                    <td>{matricula.seccion.ciclo.nombre}</td>
                    <td>{matricula.seccion.nombre}</td>
                    <td>
                      {/* <Link to={`/matricula/edit/${matricula.id}`} className="btn btn-warning">Editar</Link> */}
                      &nbsp;
                      <button className="btn btn-danger" onClick={() => deleteMatricula(matricula.id)}>Eliminar</button>
                    </td>
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

export default ShowMatriculas;
