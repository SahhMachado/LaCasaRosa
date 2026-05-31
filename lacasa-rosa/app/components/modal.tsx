type ModalProps = {
    aberto: boolean;
    fechar: () => void;
}

export default function Modal({ aberto, fechar }: ModalProps) {
    return(
        <div className={`
                        fixed inset-0 z-50 w-full overflow-hidden flex justify-center items-center
                        ${aberto ? "" : "pointer-events-none"}
                        `}
        >
            {/* fundo escuro */}
            <div onClick={fechar} className={`
                w-full h-screen
                absolute inset-0 bg-black/50
                transition-opacity duration-300

                ${aberto ? "flex" : "hidden"}
                `}
            />
           <div className={`bg-[#F2EBD5]/85 text-[#F2594B] absolute top-85 w-120 h-70 
                            rounded-xl flex justify-center items-center flex-col
                            
                            ${aberto ? "absolute" : "hidden"}`}
            >
            <div className="absolute top-25 text-2xl">
                <h1>Deseja cancelar esta venda?</h1>
            </div>
            <div className="flex gap-x-15 mt-35">
                <button className="bg-[#F2C84B] shadow-md p-2 w-20 rounded-md hover:scale-110">
                    Sim
                </button>
                <button onClick={fechar} className="bg-[#F2594B] text-[#F2C84B] shadow-md p-2 w-20 rounded-md hover:scale-110">
                    Não
                </button>
            </div>
           </div>
        </div>
    )
}
