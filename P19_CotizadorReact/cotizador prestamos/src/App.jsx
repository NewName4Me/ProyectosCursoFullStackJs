import Header from "./components/Header";
import { useState } from 'react';

function App() {

  const [cantidad, setCantidad] = useState(10000);

  //funcion encargada de manejar el valor de nuestro range
  function handleChange(e) {
    console.log(e.target.value);
  }

  return (
    <>
      <div className="my-20 max-w-lg mx-auto bg-white shadow p-10">
        <Header />
        <input
          type="range"
          className="w-full h-6 bg-gray-600 accent-lime-500 hover:accent-lime-600"
          onChange={handleChange}
        />
      </div>
    </>
  )
}

export default App
