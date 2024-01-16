
import { useState } from 'react';
import { Link } from "react-router-dom";
import clienteAxios from '../config/axios';
import Alerta from '../components/Alerta';

const Registrar = () => {

  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repetirContraseña, setRepetirContraseña] = useState('')

  const [alerta, setAlerta] = useState({})

  const handleSubmit = async (e) => {

    e.preventDefault();

    if ([nombre, email, password, repetirContraseña].includes('')) {
      setAlerta({ msg: 'Hay campos vacios', error: true });
      return;
    }

    if (password !== repetirContraseña) {
      setAlerta({ msg: 'Las contraseñas no son iguales', error: true });
      return;
    }

    if (password.length < 6) {
      setAlerta({ msg: 'Ingrese una contraseña de al menos 6 caracteres', error: true });
      return;
    }

    setAlerta({});

    // Se crea el usuario en la API
    try {

      await clienteAxios.post('/veterinarios', { nombre, email, password });
      setAlerta({
        msg: 'Usuario creado correctamente, revisa tu email',
        error: false
      })

    } catch (error) {

      setAlerta({
        msg: error.response.data.msg,
        error: true
      })

    }

  }

  const { msg } = alerta; // se extrae el mensaje del objeto para poner un condicional en <Alerta/>

  return (
    <>

      <div>
        <h1 className="text-indigo-600 font-black text-6xl">Crea una cuenta y administra a tus pacientes</h1>
      </div>

      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>

        {msg && <Alerta
          alerta={alerta}
        />}

        <form
          onSubmit={handleSubmit}
        >

          <div className="my-5">
            <label
              className="uppercase text-gray-600 block text-xl font-bold rounded-xl"
            >
              Nombre
            </label>
            <input
              type="text"
              placeholder="Ingrese su nombre"
              className="border w-full p-3 mt-3 bg-gray-50"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
            />
          </div>

          <div className="my-5">
            <label
              className="uppercase text-gray-600 block text-xl font-bold rounded-xl"
            >
              Email
            </label>
            <input
              type="email"
              placeholder="Email de registro"
              className="border w-full p-3 mt-3 bg-gray-50"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div className="my-5">
            <label
              className="uppercase text-gray-600 block text-xl font-bold rounded-xl"
            >
              Contraseña
            </label>
            <input
              type="password"
              placeholder="Ingrese una contraseña"
              className="border w-full p-3 mt-3 bg-gray-50"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <div className="my-5">
            <label
              className="uppercase text-gray-600 block text-xl font-bold rounded-xl"
            >
              Reingresar contraseña
            </label>
            <input
              type="password"
              placeholder="Reingrese su contraseña"
              className="border w-full p-3 mt-3 bg-gray-50"
              value={repetirContraseña}
              onChange={e => setRepetirContraseña(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="Crear Cuenta"
            className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
          />

        </form>

        <nav className='mt-10 lg:flex lg:justify-between'>
          <Link
            to="/"
            className='block text-center my-5 text-gray-500'
          >
            Ya tiene una cuenta? Inicia sesión
          </Link>
          <Link
            to="/olvide-password"
            className='block text-center my-5 text-gray-500'
          >
            Olvidaste tu contraseña?
          </Link>
        </nav>

      </div>

    </>
  )
}

export default Registrar