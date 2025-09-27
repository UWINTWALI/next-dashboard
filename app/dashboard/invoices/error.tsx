'use client';

import { useEffect } from "react";

export default function Error({error, reset}:{error: Error & {digest?:string}; reset: () => void}){
    // reset: a function provided by Next.js to retry rendering this route segment.
    useEffect(()=>{
        console.log("Debug Error: ", error);
    }, [error] );

    return (
        <main className="flex h-full flex-col items-center justify-center">
            <h2 className="text-center" >Something Went Wrong!</h2>
            <button className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400  " 
            onClick={
                // try to recover by re-rendering the invoice route
                () => reset()
            } 
            >Try again</button>

        </main>
    )

}