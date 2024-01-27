"use client";
import React, { useEffect, useState } from 'react';
import { SignInButton, UserButton, useAuth } from "@clerk/nextjs";
import MiComponenteConBoton from "@/components/ui/botonPentra";

const LandingPage = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const [userSignedIn, setUserSignedIn] = useState(false);

  useEffect(() => {
    setUserSignedIn(isSignedIn);
  }, [isSignedIn]);

  return (
    <div className="flex flex-col items-center justify-center h-screen mb-[100%] ">
      <header className="flex items-center justify-between px-4 py-7 border-b dark:border-gray-800 fixed top-0 left-0 w-full bg-emerald-600 text-white ">
        <h1 className="font-sans text-2xl font-semibold tracking-wide">GroupCraft</h1>
        {isLoaded && (
          <div className="flex items-end justify-end ">
            {userSignedIn ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <SignInButton mode="redirect">
                <div className='font-sans text-xl font-semibold pl-10 text-white'>Iniciar Sesión</div>
              </SignInButton>
            )}
          </div>
        )}
      </header>

      {isLoaded && userSignedIn && (
        <div className="flex items-center justify-center h-full">
          <MiComponenteConBoton />
        </div>
      )}

      {!isLoaded && (
        <div className="w-full flex items-end justify-end">Cargando...</div>
      )}
    </div>
  );
};

export default LandingPage;