import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const baseUrl = "http://127.0.0.1:8000/semestres/";

const EditSemestre = () => {
  const [nombre, setNombre] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFinal, setFechaFinal] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getSemestre();
  }, []);

  const getSemestre = async () => {
    try {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        console.log("Unauthorized access");
        return;
      }

      const response = await axios.get(`${baseUrl}${id}/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const semestre = response.data;
      setNombre(semestre.nombre);
      setFechaInicio(semestre.fecha_inicio);
      setFechaFinal(semestre.fecha_final);
    } catch (error) {
      console.error(error);
    }
  };

  const updateSemestre = async (e) => {
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        // Handle unauthorized access
        console.log("Unauthorized access");
        return;
      }

      await axios.put(
        `${baseUrl}${id}/`,
        { nombre, fecha_inicio: fechaInicio, fecha_final: fechaFinal },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      navigate("/semestres"); // Redirige a la lista de semestres después de la edición
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row mt-3">
        <div className="col-12 col-lg-8 offset-0 offset-lg-2">
          <div className="card">
            <div className="card-header bg-dark text-white">Editar Semestre</div>
            <div className="card-body">
              <form onSubmit={updateSemestre}>
                <label>Nombre: </label>
                <input
                  type="text"
                  id="nombre"
                  maxLength="80"
                  className="form-control"
                  required={true}
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
                <label>Fecha de Inicio: </label>
                <input
                  type="date"
                  id="fechaInicio"
                  className="form-control"
                  required={true}
                  value={fechaInicio}
                  onChange={(e) => setFechaInicio(e.target.value)}
                />
                <label>Fecha Final: </label>
                <input
                  type="date"
                  id="fechaFinal"
                  className="form-control"
                  required={true}
                  value={fechaFinal}
                  onChange={(e) => setFechaFinal(e.target.value)}
                />
                <button className="btn btn-success mt-3">Guardar</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditSemestre;
