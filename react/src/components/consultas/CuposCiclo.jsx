import React, { useEffect, useState, useRef } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import { useReactToPrint } from 'react-to-print';

function CuposCicloList() {
  const [cuposCiclo, setCuposCiclo] = useState([]);
  const [error, setError] = useState('');
  const [semestres, setSemestres] = useState([]);
  const [semestreSeleccionado, setSemestreSeleccionado] = useState('');
  const [cuposFiltrados, setCuposFiltrados] = useState([]);
  const componentPDF = useRef();

  useEffect(() => {
    obtenerCuposCiclo();
  }, [semestreSeleccionado]);

  const obtenerCuposCiclo = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/cupos-ciclo/');
      setCuposCiclo(response.data);

      const semestresUnicos = [...new Set(response.data.map((cupo) => cupo.semestre))];
      setSemestres(semestresUnicos);

      const cuposFiltrados = semestreSeleccionado
        ? response.data.filter((cupo) => cupo.semestre === semestreSeleccionado)
        : response.data;
      setCuposFiltrados(cuposFiltrados);
    } catch (error) {
      console.error(error);
      setError('Error al obtener los cupos por ciclo');
    }
  };

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: 'Cupos por Ciclo',
  });

  return (
    <div className="container-fluid">
      <div ref={componentPDF} style={{ width: '100%' }}>
        <h1>Cupos por Ciclo</h1>
        <div className="row mt-3 col-12">
          <div className="col-12 col-lg-8 offset-0 offset-lg-2">
            <div className="table-responsive">
              <h2 className="mt-4 mb-3">Cupos por Ciclo</h2>
              <select value={semestreSeleccionado} onChange={(event) => setSemestreSeleccionado(event.target.value)}>
                <option value="">Todos los semestres</option>
                {semestres.map((semestre) => (
                  <option key={semestre} value={semestre}>
                    {semestre}
                  </option>
                ))}
              </select>
              {error && <p className="text-danger">{error}</p>}
              {cuposFiltrados.length > 0 ? (
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Ciclo</th>
                      <th>Semestre</th>
                      <th>Cupos</th>
                    </tr>
                  </thead>
                  <tbody className="table-group-divider">
                    {cuposFiltrados.map((cupo) => (
                      <tr key={cupo.id}>
                        <td>{cupo.id}</td>
                        <td>{cupo.ciclo}</td>
                        <td>{cupo.semestre}</td>
                        <td>{cupo.cupos}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ): (
                <p>No hay cupos por ciclo disponibles.</p>
              )}
            </div>
            <div>
              <button className="btn btn-success" onClick={generatePDF}>
                PDF
              </button>
            </div>
          </div>
        </div>
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div style={{ width: "100%", height: 400 }} className="mx-auto mt-4">
            <ResponsiveContainer>
              <BarChart
                width={500}
                height={300}
                data={cuposFiltrados}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="ciclo" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="cupos" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CuposCicloList;
