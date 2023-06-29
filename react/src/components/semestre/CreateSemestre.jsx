import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const baseUrl = "http://127.0.0.1:8000/semestres/";

const CreateSemestre = () => {
  const [nombre, setNombre] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFinal, setFechaFinal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axios.post(baseUrl, { nombre, fecha_inicio: fechaInicio, fecha_final: fechaFinal });
      navigate("/semestres");
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  };

  return (
    <div className="container-fluid">
      <div className="row mt-3">
        <div className="col-12 col-lg-8 offset-0 offset-lg-2">
          <div className="card">
            <div className="card-header bg-dark text-white">Añadir Semestre</div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
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
                <button className="btn btn-success mt-3" disabled={isLoading}>
                  {isLoading ? "Guardando..." : "Guardar"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSemestre;
