
import { createContext, useState, useEffect } from "react";
import clienteAxios from '../config/axios';
import useAuth from '../hooks/useAuth';

const PacientesContext = createContext()

const PacientesProvider = ({ children }) => {

    const [pacientes, setPacientes] = useState([])
    const [paciente, setPaciente] = useState({})
    const { auth } = useAuth();

    useEffect(() => {
        const obtenerPacientes = async () => {

            try {

                const token = localStorage.getItem('token')
                if (!token) return

                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const { data } = await clienteAxios('/pacientes', config)

                setPacientes(data)

            } catch (error) {
                console.log(error)
            }
        }
        obtenerPacientes();
    }, [auth])

    const guardarPaciente = async (paciente) => {

        const token = localStorage.getItem('token')
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        if (paciente.id) { // editando paciente

            try {
                const { data } = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, config)
                const pacientesActualizados = pacientes.map(pacienteState => pacienteState._id === data._id ? data : pacienteState)
                setPacientes(pacientesActualizados)
            } catch (error) {
                console.log(error)
            }

        } else { // Paciente nuevo

            try {
                const { data } = await clienteAxios.post('/pacientes', paciente, config) // el post requiere autenticacion (config)
                const { createdAt, updatedAt, __v, ...pacienteAlmacenado } = data
                setPacientes([pacienteAlmacenado, ...pacientes])
            } catch (error) {
                console.log(error.response.data.msg)
            }

        }

    }

    const cargarEdicion = (paciente) => {
        setPaciente(paciente)
    }

    const eliminarPaciente = async id => {
        const eliminar = confirm('Deseas eliminar el paciente?')

        if (eliminar) {
            try {
                const token = localStorage.getItem('token')
                if (!token) return

                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const { data } = await clienteAxios.delete(`/pacientes/${id}`, config)
                const pacientesActualizados = pacientes.filter(pacienteState => pacienteState._id !== id)
                setPacientes(pacientesActualizados)
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <PacientesContext.Provider
            value={{
                pacientes,
                guardarPaciente,
                cargarEdicion,
                paciente,
                eliminarPaciente
            }}
        >
            {children}
        </PacientesContext.Provider>
    )

}


export {
    PacientesProvider
}

export default PacientesContext