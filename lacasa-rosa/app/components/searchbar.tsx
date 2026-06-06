"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type SearchBarProps = {
    placeholder?: string;
    className?: string;
};

export default function SearchBar({
    placeholder = "Pesquisar...",
    className = "",
}: SearchBarProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [pesquisa, setPesquisa] = useState(
        searchParams.get("pesquisa") || ""
    );

    useEffect(() => {
        const timeout = setTimeout(() => {
            const params = new URLSearchParams(searchParams);

            if (pesquisa.trim()) {
                params.set("pesquisa", pesquisa);
            } else {
                params.delete("pesquisa");
            }

            router.replace(`${pathname}?${params.toString()}`);
        }, 300);

        return () => clearTimeout(timeout);
    }, [pesquisa, pathname, router, searchParams]);

    return (
        <input
            type="text"
            placeholder={placeholder}
            value={pesquisa}
            onChange={(e) => setPesquisa(e.target.value)}
            className={className}
        />
    );
}