"use server";

import { BiSolidShoppingBags } from "react-icons/bi";
import { Poppins } from "next/font/google";
import { Major_Mono_Display } from "next/font/google";
import CirclesTop from "@/app/components/circles-top";
import CirclesBottom from "@/app/components/circles-bottom";
import BackgroundStripes from "@/app/components/background-stripes";
import Link from "next/link";
import Visualizar from "./components/visualizar";
import { produtoGetId } from "@/app/api/estoque/route";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const majorMono = Major_Mono_Display({
  subsets: ["latin"],
    weight: "400",
});

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
    const { id } = await params;
    const produtoId = Number(id);
    const produto = await produtoGetId(produtoId);
    
    return(
        <div className="w-screen h-screen relative flex flex-col bg-[#F2EBD5] text-black overflow-hidden">
            <CirclesTop />

            <div className={poppins.className + " ml-25 mt-80"}>
                <BiSolidShoppingBags size={80}/>
                <h1 className={majorMono.className + " text-4xl mt-2 mb-5"}>Bem-Vindo(a)!</h1>
                <h2 className="text-2xl">Aqui você pode visualizar os dados do  <br /> produto</h2>
            </div>
            
            <div className={poppins.className + " relative z-10"}>
                {/* Card */}
                <div className="bg-[#F2EBD5] w-[30%] h-auto p-10 rounded-2xl absolute right-40 -top-100">

                    <Visualizar produto={produto} />

                    <div className="flex justify-center text-center">
                        <Link href="/estoque" className="bg-[#F2594B] w-full h-auto p-3 font-bold text-[#F2EBD5] text-xl rounded-md 
                                    hover:shadow-xl">
                                Voltar
                        </Link>         
                    </div>

                </div>
            </div>
            <BackgroundStripes />
            <CirclesBottom />
        </div>
    )
}