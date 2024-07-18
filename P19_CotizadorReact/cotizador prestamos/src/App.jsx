import Header from "./components/Header";
import { useState } from 'react';

function App() {

  /* state es para valores que se van a modificar */
  const [cantidad, setCantidad] = useState(10000);

  const MIN = 0;
  const MAX = 20000;
  const STEP = 100;

  //funcion encargada de manejar el valor de nuestro range
  function handleChange(e) {
    setCantidad(e.target.value);
  }

  return (
    <>
      <div className="my-20 max-w-lg mx-auto bg-white shadow p-10">
        <Header />

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
          {cantidad}
        </p>
      </div>
    </>
  )
}

export default App
