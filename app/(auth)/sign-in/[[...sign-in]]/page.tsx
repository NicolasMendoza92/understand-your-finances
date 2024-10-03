import { SignIn, ClerkLoading, ClerkLoaded } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import Image from "next/image";

export default function Page() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="h-full lg:flex flex-col items-center justify-center px-4">
        <div className="text-center space-y-4 pt-16">
          <h1 className="font-bold text-3xl text-foreground">
            Bienvenido de nuevo
          </h1>
          <p className=" text-base text-foreground">
            Inicia sesion para ingresar al dashboard
          </p>
        </div>
        <div className="flex items-center justify-center mt-8">
          <ClerkLoaded>
            <SignIn />
          </ClerkLoaded>
          <ClerkLoading>
            <Loader2 className="animete-spin text-muted-foreground" />
          </ClerkLoading>
        </div>
      </div>
      <div className=" h-full bg-blue-600 hidden lg:flex items-center justify-center">
        <Image src={"/logo.png"} alt="Logo" width={300} height={300} />
      </div>
    </div>
  );
}
