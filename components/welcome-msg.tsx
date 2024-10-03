"use client";
import { useUser } from "@clerk/nextjs";

export const WelcomeMsg = () => {
  const { user, isLoaded } = useUser();
  return (
    <div className="spay-y-2 mb-4">
      <h2 className="text-2xl lg:text-4xl text-white font-medium">
        Bienvenido{isLoaded ? ", ": " "}{user?.firstName}
      </h2>
      <p className="text-sm lg:text-base text-slate-400">
        Aqui puedes ver el reporte de tus finzanzas.
      </p>
    </div>
  );
};
