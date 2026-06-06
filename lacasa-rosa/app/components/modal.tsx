import { useRouter } from "next/navigation";
import { cancelarVenda } from "../api/vendas/route";

type ModalProps = {
    aberto: boolean;
    fechar: () => void;
    vendaId: number | null;
}

export default function Modal({ aberto, fechar, vendaId }: ModalProps) {
    const router = useRouter();

    const confirmar = async (e: React.FormEvent) => {
        e.preventDefault();

        if (vendaId === null) return;

        const result = await cancelarVenda(vendaId);

        if (result.success) {
            router.push("/venda-cancelada");
        }
    };

    return (
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

                    <form onSubmit={confirmar}>
                        <button type="submit" className="bg-[#F2C84B] shadow-md p-2 w-20 rounded-md hover:scale-110">
                            Sim
                        </button>
                    </form>

                    <button type="button" onClick={fechar} className="bg-[#F2594B] text-[#F2C84B] shadow-md p-2 w-20 rounded-md hover:scale-110">
                        Não
                    </button>
                </div>
            </div>
        </div>
    )
}
