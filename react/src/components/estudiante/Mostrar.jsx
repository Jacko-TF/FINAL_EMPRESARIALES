import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const baseUrl = "http://127.0.0.1:8000/estudiantes/";

const MostrarEstudiante = () => {
  const [estudiantes, setEstudiantes] = useState([]);

  useEffect(() => {
    getEstudiantes();
  }, []);

  const getEstudiantes = async () => {
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

      setEstudiantes(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteEstudiante = async (id) => {
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

      getEstudiantes();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row mt-3">
        <div className="col-md-4 offset-md-4">
          <div className="d-grid mx-auto">
            <Link to="/estudiantes" className="btn btn-dark">Añadir</Link>
          </div>
        </div>
      </div>
      <div className="row mt-3">
          <div className="table-responsive">
            <h1>Estudiantes</h1>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>#</th>
                  <th>NOMBRE</th>
                  <th>APELLIDO</th>
                  <th>FECHA DE NACIMIENTO</th>
                  <th>DIRECCION</th>
                  <th>DNI</th>
                  <th>TELEFONO</th>
                  <th colSpan={2}>FUNCIONES</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {estudiantes.map((estudiante, index) => (
                  <tr key={estudiante.id}>
                    <td>{index + 1}</td>
                    <td>{estudiante.nombre}</td>
                    <td>{estudiante.apellido}</td>
                    <td>{estudiante.fecha_nacimiento}</td>
                    <td>{estudiante.direccion}</td>
                    <td>{estudiante.dni}</td>
                    <td>{estudiante.telefono}</td>
                    <td>
                      <Link to={`/estudiantes/edit/${estudiante.id}`} className="btn btn-warning">Editar</Link>
                    </td><td> 
                      <button className="btn btn-danger" onClick={() => deleteEstudiante(estudiante.id)}>Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        
      </div>
      
    </div>
  );
};

export default MostrarEstudiante;