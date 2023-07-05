import React, { useEffect, useState } from "react";
import axios from "axios";

const baseUrl = "http://127.0.0.1:8000/secciones/";

const ShowSeccion = () => {
  const [secciones, setSecciones] = useState([]);

  useEffect(() => {
    getSecciones();
  }, []);

  const getSecciones = async () => {
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

      setSecciones(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row mt-3">
        <div className="col-12 col-lg-8 offset-0 offset-lg-2">
          <div className="table-responsive">
          <h1>Lista de Secciones</h1>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nombre</th>
                  <th>Cupos</th>
                  <th>Carrera</th>
                  <th>Ciclo</th>
                  <th>Semestre</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {secciones.map((seccion, index) => (
                  <tr key={seccion.id}>
                    <td>{index + 1}</td>
                    <td>{seccion.nombre}</td>
                    <td>{seccion.cupos}</td>
                    <td>{seccion.carrera.nombre}</td>
                    <td>{seccion.ciclo.nombre}</td>
                    <td>{seccion.ciclo.semestre.nombre}</td>
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

export default ShowSeccion;
