import { BiSolidShoppingBags } from "react-icons/bi";
import { Poppins } from "next/font/google";
import { Major_Mono_Display } from "next/font/google";
import AuthCirclesTop from "@/app/components/authcircles-top";
import AuthCirclesBottom from "@/app/components/authcircles-bottom";
import AuthBackgroundStripes from "@/app/components/authbackground-stripes";
import Card from "@/app/components/card";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const majorMono = Major_Mono_Display({
  subsets: ["latin"],
    weight: "400",
});


export default function Login() {
    return(
        <div className="w-screen h-screen relative flex flex-col bg-[#F2EBD5] text-black">
            <AuthCirclesTop />

            <div className={poppins.className + " ml-25 mt-80"}>
                <BiSolidShoppingBags size={80}/>
                <h1 className={majorMono.className + " text-4xl mt-2 mb-5"}>Bem-Vindo(a)!</h1>
                <h2 className="text-2xl">Realize seu login <br /> para acessar o sistema</h2>
            </div>
            
            <Card />
            <AuthBackgroundStripes />
            <AuthCirclesBottom />
        </div>
    )
}