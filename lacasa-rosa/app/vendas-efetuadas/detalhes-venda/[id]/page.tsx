import Link from "next/link";
import CirclesBottom from "../../../components/circles-bottom";
import CirclesTop from "../../../components/circles-top";
import { Poppins } from "next/font/google";
import { Major_Mono_Display } from "next/font/google";
import { FaArrowLeft } from "react-icons/fa6";
import { TiArrowSortedDown } from "react-icons/ti";
import { itensVendaGet, vendaGetId } from "@/app/api/vendas/route";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["300", "400", "500", "700"],
});

const majorMono = Major_Mono_Display({
    subsets: ["latin"],
    weight: "400",
});

export default async function DetalhesVenda({
    params,
}: {
    params: Promise<{ id: string }>
}
) {
    const { id } = await params;
    const venda = await vendaGetId(Number(id));
    const itens = await itensVendaGet(Number(id));

    return (
        <div className={poppins.className + " relative w-screen min-h-screen flex flex-col bg-[#F2EBD5] text-black overflow-hidden"}>

            <CirclesTop />
            <CirclesBottom />

            {/* Título */}
            <div className="relative z-10 flex flex-col flex-1">
                <header className="m-45 mb-10">
                    <h1 className={majorMono.className + " text-4xl mt-2 mb-5"}>Detalhes da Venda</h1>
                    <div className="border border-black/30"></div>
                </header>

                {/* Área de produtos da venda */}
                <div className="h-141 ml-45 mr-45 overflow-y-auto overflow-x-hidden text-[#F2EBD5] font-bold">
                    <div className="text-black font-normal absolute right-46 top-66">
                        <span className="min-w-25 max-w-45 mr-42 2xl:mr-56">Valor Unitário</span>
                        <span className="min-w-25 max-w-45 mr-28 2xl:mr-84">Quantidade</span>
                        <span className="min-w-25 max-w-45">Total (por item)</span>
                    </div>
                    {
                        itens.map((item) => (
                            <div key={item.item_id}
                                className="bg-[#F25EA3] h-20 rounded-lg border-2 border-[#F2EBD5] mb-10 
                                            flex text-center items-center"
                            >
                                <img src={`data:image/jpeg;base64,${item.produto_imagem}`}
                                    className="w-15 h-15 rounded-full border-4 border-[#F2EBD5] ml-5 mr-10" />
                                <p className="mr-30 2xl:mr-70 min-w-45 max-w-45">
                                    {item.produto_nome}
                                </p>
                                <p className="mr-23 2xl:mr-38 min-w-45 max-w-45">
                                    {Number(item.produto_preco).toLocaleString("pt-BR", {
                                        style: "currency",
                                        currency: "BRL",
                                    })}
                                </p>
                                <p className="mr-12 2xl:mr-62 min-w-45 max-w-45">
                                    {item.item_quantidade} un.
                                </p>
                                <p className="mr-23 2xl:mr-38 min-w-45 max-w-45">
                                    {Number(Number(item.item_quantidade) * Number(item.produto_preco)).toLocaleString("pt-BR", {
                                        style: "currency",
                                        currency: "BRL",
                                    })}
                                </p>
                            </div>
                        ))
                    }
                </div>

                {/* Informações total venda e forma de pagamento */}
                <div className="flex text-center items-center font-bold">
                    <span className="bg-[#F2594B] text-[#F2EBD5] p-2 absolute z-10 text-center items-center right-98 mt-7">
                        <label className="mr-2">Pagto.:</label>
                        <select disabled name="pagamento" id="pagamento"
                            className="w-30 bg-[#F2594B] transition-colors outline-none
                                    appearance-none"  defaultValue={venda.venda_formapagto}>
                            <option value="dinheiro" className="bg-[#F2EBD5] text-[#F2594B]">Dinheiro</option>
                            <option value="pix" className="bg-[#F2EBD5] text-[#F2594B]">PIX</option>
                            <option value="cartao" className="bg-[#F2EBD5] text-[#F2594B]">Cartão</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                            <TiArrowSortedDown size={18} />
                        </div>
                    </span>

                    <span className="bg-[#F2594B] min-w-45 max-w-45 text-[#F2EBD5] p-2 absolute flex text-center items-center gap-x-5 right-48 2xl:right-50 mt-7">
                        <p>Total:</p>
                        <p>
                            {Number(venda.venda_total).toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                            })}
                        </p>
                    </span>
                </div>

                {/* Botão para voltar */}
                <div className="flex items-center ml-45 gap-x-90 mt-20 2xl:mt-4 2xl:gap-x-150">
                    <Link href="/vendas-efetuadas" className="bg-[#F2C84B] w-10 h-10 rounded-full flex flex-col items-center 
                                                    justify-center shadow-md hover:scale-110">
                        <FaArrowLeft size={30} className="text-[#F2594B]" />
                    </Link>
                </div>
            </div>
        </div>
    )
}
