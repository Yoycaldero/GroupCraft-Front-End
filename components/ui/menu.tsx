import Link from "next/link";
import { SignInButton, UserButton } from "@clerk/nextjs";
import * as React from "react"



export  const Menus = () => {
  return (
    <>
     <SignInButton>
        <button className=" ml-auto rounded-md p-3 bg-slate-500 " >Accede Aqui</button>
      </SignInButton>
      <UserButton afterSignOutUrl="/main" /></>
       
        
  );
};


