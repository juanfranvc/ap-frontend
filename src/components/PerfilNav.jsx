
import { Link } from "react-router-dom"

const PerfilNav = () => {
    return (
        <nav className="flex gap-3">
            <Link
                to="/admin/perfil"
                className="font-bold uppercase text-gray-500 hover:text-black"
            >
                Perfil
            </Link>
            <Link
                to="/admin/cambiar-password"
                className="font-bold uppercase text-gray-500 hover:text-black"
            >
                Cambiar Contraseña
            </Link>
        </nav>
    )
}

export default PerfilNav