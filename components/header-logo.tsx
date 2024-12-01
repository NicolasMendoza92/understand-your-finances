import { WalletMinimal } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function HeaderLogo() {
  return (
    <Link href={"/"}>
      <div className="items-center hidden lg:flex">
        <WalletMinimal className="text-white"/>

        <p className="font-semibold text-white text-2xl ml-2.5">
          Finanzas personales
        </p>
      </div>
    </Link>
  );
}
