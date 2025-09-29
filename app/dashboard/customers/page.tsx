import {lusitana} from "@/app/ui/fonts"
import { resolve } from "path"
import { Metadata } from "next"

export const metadata: Metadata={
    title: 'Our customers'
}


export default function page(){
    return <h1 className={`${lusitana.className}`}>Welcome to Customers Page </h1>
}

