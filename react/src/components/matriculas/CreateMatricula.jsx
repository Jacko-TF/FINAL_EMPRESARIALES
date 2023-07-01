import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const baseUrl = "http://127.0.0.1:8000/matricular/";
const cicloApiUrl = "http://127.0.0.1:8000/cicloActual/";
const carreraApiUrl = "http://127.0.0.1:8000/carreras/";
const estudianteApiUrl = "http://127.0.0.1:8000/estudiantes/";

const CreateMatricula = () => {
  //Obtener datos de la API
  const [estudiantesList, setEstudiantesList] = useState([]);

  useEffect(() => {
    const estudianteData = async () => {
      try {
        const response = await axios.get(estudianteApiUrl);
        setEstudiantesList(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    estudianteData();
  }, []);

  const [carrerasList, setCarrerasList] = useState([]);

  useEffect(() => {
    const carreraData = async () => {
      try {
        const response = await axios.get(carreraApiUrl);
        setCarrerasList(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    carreraData();
  }, []);

  const [ciclosList, setCiclosList] = useState([]);

  useEffect(() => {
    const cicloData = async () => {
      try {
        const response = await axios.get(cicloApiUrl);
        setCiclosList(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    cicloData();
  }, []);

  //capturar datos de formulario
  const [estudiante, setEstudiante] = useState('');
  const [carrera, setCarrera] = useState('');
  const [ciclo, setCiclo] = useState('');

  const handleEstudianteChange = (event) => {
    setEstudiante(event.target.value);
  };
  const handleCarreraChange = (event) => {
    setCarrera(event.target.value);
  };
  const handleCicloChange = (event) => {
    setCiclo(event.target.value);
  };
  const navigate = useNavigate();
  //almacenar datos de formulario (url)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      estudiante: estudiante,
      carrera: carrera,
      ciclo: ciclo
    };

    try {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        console.log("Unauthorized access");
        return;
      }

      const response = await axios.post(
        baseUrl,
        formData, 
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response.data);
      navigate("/departamento");
    } catch (error) {
      console.error(error);
    }
  };
  console.log(ciclosList)
  return (
    <div className="container-fluid">
      <div className="row mt-3">
        <div className="col-12 col-lg-8 offset-0 offset-lg-2">
          <div className="card">
            <div className="card-header bg-dark text-white">
              Añadir Matrícula
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="estudiante" className="form-label">
                    Estudiante:
                  </label>
                  <select
                    id="estudiante"
                    className="form-control"
                    required={true}
                    onChange={handleEstudianteChange}
                    size={3}
                  >
                    {estudiantesList.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.apellido}, {option.nombre}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="carrera" className="form-label">
                    Carrera:
                  </label>
                  <select
                    id="carrera"
                    className="form-control"
                    required={true}
                    onChange={handleCarreraChange}
                  >
                    <option value="">Seleccionar Carrera</option>
                    {carrerasList.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.nombre}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                <label className="form-label d-flex">
                    Ciclo:
                  </label>
                {ciclosList.map((option, index) => (
                  <div className="form-check form-check-inline" key={index}>
                  <input className="form-check-input" type="radio" name="ciclo" id={option.nombre} value={option.id} required={true} onChange={handleCicloChange}/>
                  <label className="form-check-label" htmlFor={option.nombre}>{option.nombre} ciclo</label>
                </div>
                    ))}
                </div>
                <button className="btn btn-success mt-3">Guardar</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



export default CreateMatricula;
