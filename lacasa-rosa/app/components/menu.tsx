import { FaUser } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";
import { FaGear } from "react-icons/fa6";
import { BsCircleSquare } from "react-icons/bs";
import { BsFillBagFill } from "react-icons/bs";

type MenuProps = {
    aberto: boolean;
    fechar: () => void;
}

export default function Menu({ aberto, fechar }: MenuProps) {
    return(
        <div  className={`
                        fixed inset-0 z-50
                        ${aberto ? "" : "pointer-events-none"}
                        `}
        >
            {/* fundo escuro */}
            <div  className={`
                absolute inset-0 bg-black/50
                transition-opacity duration-300

                ${aberto ? "opacity-100" : "opacity-0 pointer-events-none"}
                `}
            />
            {/* menu lateral */}
            <div className={`
                            absolute top-0 left-0 h-screen w-80 text-[#F2594B] text-lg font-bold flex justify-center
                             bg-[#F2EBD5]/75 backdrop-blur-xs rounded-r-lg transition-transform duration-300 ease-out

                            ${aberto ? "translate-x-0" : "-translate-x-full"}
                            `}
            >
                <button onClick={fechar}>
                    <MdCancel size={45} className="absolute top-5 right-5" />
                </button>
                <div className="mt-40 flex flex-col">
                    <p className="flex items-center gap-2"><FaGear /> <span>Painel Administrativo</span></p>
                    <div className="mt-4 mb-4 border-b border-[#F2594B]"></div>
                    <a href="#" className="mb-5 flex items-center gap-2"><BsCircleSquare /> <span className="hover:underline">Estoque</span></a>
                    <a href="#" className="mb-5 flex items-center gap-2"><FaUser /> <span className="hover:underline">Usuários</span></a>
                    <a href="#" className="mb-5 flex items-center gap-2"><BsFillBagFill /> <span className="hover:underline">Vendas Efetuadas</span> </a>
                </div>
            </div>
        </div>
    )
}