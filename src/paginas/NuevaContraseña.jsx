
import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/axios"

const NuevaContraseña = () => {

    const [password, setPassword] = useState('')
    const [alerta, setAlerta] = useState({})
    const [tokenValido, setTokenValido] = useState(false)
    const [passModificado, setPassModificado] = useState(false)

    const params = useParams()
    const { token } = params

    useEffect(() => {
        const comprobarToken = async () => {
            try {
                await clienteAxios(`/veterinarios/reset-password/${token}`)
                setAlerta({
                    msg: 'Coloca tu nueva constraseña'
                })
                setTokenValido(true)
            } catch (error) {
                setAlerta({
                    msg: 'Hubo un error con el enlace',
                    error: true
                })
            }
        }
        comprobarToken()
    }, [])

    const handleSubmit = async (e) => {

        e.preventDefault()

        if (password < 6) {
            setAlerta({
                msg: 'La constraseña debe contener al menos 6 caracteres',
                error: true
            })
            return
        }

        try {
            const url = `/veterinarios/reset-password/${token}`
            const { data } = await clienteAxios.post(url, { password })
            setAlerta({
                msg: data.msg
            })
            setPassModificado(true)
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }

    }

    const { msg } = alerta

    return (
        <>

            <div>
                <h1 className="text-indigo-600 font-black text-6xl">Reestablece tu contraseña</h1>
            </div>

            <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
                {msg && <Alerta
                    alerta={alerta}
                />}
                {tokenValido && (
                    <>
                        <form onSubmit={handleSubmit}>
                            <div className="my-5">

                                <label
                                    className="uppercase text-gray-600 block text-xl font-bold rounded-xl"
                                >
                                    Nueva contraseña
                                </label>

                                <input
                                    type="password"
                                    placeholder="Ingrese una nueva contraseña"
                                    className="border w-full p-3 mt-3 bg-gray-50"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />

                                <input
                                    type="submit"
                                    value="Reestablecer contraseña"
                                    className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
                                />

                            </div>
                        </form>

                    </>

                )}

                {passModificado &&
                    <Link
                        to="/"
                        className='block text-center my-5 text-gray-500'
                    >
                        Iniciar sesión
                    </Link>
                }

            </div>

        </>
    )
}

export default NuevaContraseña