import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const baseUrl = "http://127.0.0.1:8000/semestres/";

const ShowSemestre = () => {
  const [semestres, setSemestres] = useState([]);

  useEffect(() => {
    getSemestres();
  }, []);

  const getSemestres = async () => {
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

      setSemestres(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row mt-3">
        <div className="col-12 col-lg-8 offset-0 offset-lg-2">
          <div className="table-responsive">
          <h2>Lista de Semestres</h2>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Semestre</th>
                  <th>Fecha de Inicio</th>
                  <th>Fecha Final</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {semestres.map((semestre, index) => (
                  <tr key={semestre.id}>
                    <td>{index + 1}</td>
                    <td>{semestre.nombre}</td>
                    <td>{semestre.fecha_inicio}</td>
                    <td>{semestre.fecha_final}</td>
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

export default ShowSemestre;
