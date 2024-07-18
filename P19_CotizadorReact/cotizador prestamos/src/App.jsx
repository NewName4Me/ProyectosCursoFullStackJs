import Header from "./components/Header";
import Button from "./components/Button";
import { formatearDinero, calcularTotalPagar } from "./helpers/index.js";
import { useState, useEffect } from 'react';

function App() {

  /* state es para valores que se van a modificar */
  const [cantidad, setCantidad] = useState(10000);
  const [meses, setMeses] = useState(6);
  const [total, setTotal] = useState(0);
  const [pago, setPago] = useState(0);

  useEffect(() => {
    const resultadoTotalApagar = calcularTotalPagar(cantidad, Number(meses));
    setTotal(resultadoTotalApagar);
  }, [cantidad, meses]);

  useEffect(() => {
    //calcular el pago mensual
    setPago(total / meses);
  }, [total]);

  const MIN = 0;
  const MAX = 20000;
  const STEP = 100;

  //funcion encargada de manejar el valor de nuestro range
  function handleChange(e) {
    setCantidad(Number(e.target.value));
  }

  function handlerClickDecremento() {
    const valor = cantidad - STEP;
    if (valor < MIN) { alert('Cantidad No Válida'); return; }
    setCantidad(valor);
  }

  function handlerClickIncremento() {
    const valor = cantidad + STEP;
    if (valor >= MAX) { alert('Cantidad No Válida'); return; }
    setCantidad(valor);
  }


  return (
    <>
      <div className="my-20 max-w-lg mx-auto bg-white shadow p-10">
        <Header />

        <div className="flex justify-between my-6">
          <Button operador='-' fn={handlerClickDecremento} />
          <Button operador='+' fn={handlerClickIncremento} />
        </div>

        <input
          type="range"
          className="w-full h-6 bg-gray-600 accent-lime-500 hover:accent-lime-600"
          onChange={handleChange}
          min={MIN}
          max={MAX}
          step={STEP}
          value={cantidad} /* asi indicamos su posicion inical(que coincide en el centro)*/
        />

        <p className="text-center my-10 text-5xl font-extrabold text-indigo-500">
          {formatearDinero(cantidad)}
        </p>

        <h2 className="text-2xl font-extrabold text-gray-500 text-center">
          Elige un <span className="text-indigo-500">plazo</span> a pagar
        </h2>

        <select
          name="" id=""
          className="mt-5 w-full bg-white border-gray-300 rounded-lg text-center text-xl 
        font-bold text-gray-500"
          value={meses}
          onChange={e => setMeses(e.target.value)}
        >
          <option value="6">6 meses</option>
          <option value="12">12 meses</option>
          <option value="24">24 meses</option>
        </select>


        <div className="my-5 space-y-3 bg-gray-50 p-5">
          <h2 className="text-2xl font-extrabold text-gray-500 text-center">
            Resumen<span className="text-indigo-500"> de pagos</span>
            <p className="text-xl text-gray-500 text-center font-bold">{meses} Meses</p>
            <p className="text-xl text-gray-500 text-center font-bold">{formatearDinero(total)} Total a pagar</p>
            <p className="text-xl text-gray-500 text-center font-bold">{formatearDinero(pago)} Mensuales</p>
          </h2>
        </div>
      </div>
    </>
  )
}

export default App
