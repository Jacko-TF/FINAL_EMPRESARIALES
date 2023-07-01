import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const baseUrl = "http://127.0.0.1:8000/matriculas/";

const EditMatricula = () => {
  const [fecha, setFecha] = useState("");
  const [estudiante, setEstudiante] = useState({ nombre: "" });
  const [seccion, setSeccion] = useState("");
  const [seccionOptions, setSeccionOptions] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getMatricula();
    fetchSecciones();
  }, []);

  const getMatricula = async () => {
    try {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        console.log("Unauthorized access");
        return;
      }

      const response = await axios.get(`${baseUrl}${id}/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const matricula = response.data;
      setFecha(matricula.fecha || "");
      setEstudiante({ nombre: matricula.estudiante.nombre || "" });
      setSeccion(matricula.seccion?.id || "");
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSecciones = async () => {
    try {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        console.log("Unauthorized access");
        return;
      }

      const response = await axios.get("http://127.0.0.1:8000/secciones/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setSeccionOptions(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const updateMatricula = async (e) => {
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        console.log("Unauthorized access");
        return;
      }

      await axios.put(
        `${baseUrl}${id}/`,
        { fecha, estudiante, seccion },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      navigate("/matriculas");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row mt-3">
        <div className="col-12 col-lg-8 offset-0 offset-lg-2">
          <div className="card">
            <div className="card-header bg-dark text-white">Editar Matrícula</div>
            <div className="card-body">
              <form onSubmit={updateMatricula}>
                <div className="mb-3">
                  <label htmlFor="fecha" className="form-label">Fecha:</label>
                  <input
                    type="date"
                    id="fecha"
                    className="form-control"
                    required={true}
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="estudiante" className="form-label">Estudiante:</label>
                  <input
                    type="text"
                    id="estudiante"
                    className="form-control"
                    required={true}
                    value={estudiante.nombre}
                    onChange={(e) => setEstudiante({ nombre: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="seccion" className="form-label">Sección:</label>
                  <select
                    id="seccion"
                    className="form-control"
                    required={true}
                    value={seccion}
                    onChange={(e) => setSeccion(e.target.value)}
                  >
                    <option value="">Seleccione una opción</option>
                    {seccionOptions.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.nombre}
                      </option>
                    ))}
                  </select>
                </div>
                <button className="btn btn-success mt-3">Guardar</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditMatricula;
