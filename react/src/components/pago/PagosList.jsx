import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PagosList() {
  const [pagos, setPagos] = useState([]);

  useEffect(() => {
    getPagos();
  }, []);

  const getPagos = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/pagos/');
      setPagos(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row mt-3 col-12">
        <div className="col-12 col-lg-8 offset-0 offset-lg-2">
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Semestre</th>
                  <th>DNI</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Carrera</th>
                  <th>Ciclo</th>
                  <th>Sección</th>
                  <th>Monto</th>
                  <th>Fecha de Creación</th>
                  <th>Fecha de Vencimiento</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {pagos.map((pago) => (
                  <tr key={pago.id}>
                    <td>{pago.id}</td>
                    <td>{pago.matricula.seccion.ciclo.semestre.nombre}</td>
                    <td>{pago.matricula.estudiante.dni}</td>
                    <td>{pago.matricula.estudiante.nombre}</td>
                    <td>{pago.matricula.estudiante.apellido}</td>
                    <td>{pago.matricula.seccion.carrera.nombre}</td>
                    <td>{pago.matricula.seccion.ciclo.nombre}</td>
                    <td>{pago.matricula.seccion.nombre}</td>
                    <td>{pago.monto}</td>
                    <td>{pago.fecha_creacion}</td>
                    <td>{pago.fecha_vencimiento}</td>
                    <td>{pago.estado ? 'Pagado' : 'Pendiente'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PagosList;