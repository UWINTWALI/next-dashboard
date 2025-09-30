"use client";

import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { deleteInvoice } from "@/app/lib/actions";
import { ProcessingButton } from "./processingbutton";
import { useRouter } from "next/navigation";

export function CreateInvoice() {
  const router = useRouter();
  return(
    <ProcessingButton
    label="Create Invoice"
    icon={<PlusIcon className="h-5 md:ml-4" />}
    onClick={()=>router.push('/dashboard/invoices/create')}
    />
  );
}


export function UpdateInvoice({ id }: { id: string }) {
  const router = useRouter()
  return(
    <ProcessingButton
    label=""
    icon={<PencilIcon className="w-5"/>}
    onClick={()=>{
      router.push(`/dashboard/invoices/${id}/edit`)
    }}
    />
  )
}

export function DeleteInvoice({ id }: { id: string }) {

  // const deleteInvoiceById = deleteInvoice.bind(null, id);

  // return (
  //   <form action={deleteInvoiceById}>
  //     <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
  //       <span className="sr-only">Delete</span>
  //       <TrashIcon className="w-5" />
  //     </button>
  //   </form>
  // );
  

  // wrap my async delete dunction
  const handleDelete = async () =>{
    // create a dummy formdata
    const formData = new FormData();
    await deleteInvoice(id, formData);
  };
  return (
    <ProcessingButton
    label="Del"
    icon={<TrashIcon className="w-5" />}
    onClick={handleDelete}

    />
  )
}
