import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const baseUrl = "http://127.0.0.1:8000/secciones/";

const MostrarSeccion = () => {
  const [secciones, setSecciones] = useState([]);

  useEffect(() => {
    getSecciones();
  }, []);

  const getSecciones = async () => {
    try {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        // Handle unauthorized access
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
        <div className="col-md-4 offset-md-4">
        </div>
      </div>
      <div className="row mt-3">
       
          <div className="table-responsive">
            <h1>Seccion</h1>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>#</th>
                  <th>NOMBRE</th>
                  <th>CICLO</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {secciones.map((seccion, index) => (
                  <tr key={seccion.id}>
                    <td>{index + 1}</td>
                    <td>{seccion.nombre}</td>
                    <td>{seccion.ciclo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        
      </div>
    </div>
  );
};

export default MostrarSeccion;