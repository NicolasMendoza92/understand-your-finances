import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function HeaderLogo() {
  return (
    <Link href={"/"}>
      <div className="items-center hidden lg:flex">
        <Image src={"/logo.png"} alt="logo" width={35} height={35} />

        <p className="font-semibold text-white text-2xl ml-2.5">
          Entiende tus finanzas
        </p>
      </div>
    </Link>
  );
}
