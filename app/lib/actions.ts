'use server';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import postgres from 'postgres';
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require'});
import { redirect } from 'next/navigation';

// Zod Schema define the struncture of the invoice
const FormSchema = z.object({
    id: z.string(),
    customerId: z.string(),
    amount: z.coerce.number(),
    status: z.enum(['pending', 'paid']),
    date: z.string()
});

// we are omitting what we will not update and / or create

const CreateInvoice = FormSchema.omit({id: true, date: true});
const UpdateInvoice = FormSchema.omit({id: true, date: true})


export async function deleteInvoice(id: string, formData: FormData){
    // simulate the error
    // throw new Error("Error happen..")
    try{
        await sql`
        DELETE FROM invoices WHERE id=${id}
        `;

    }catch(error){
        console.log(error)
        message: 'Database Error: failed to Delete Invoices'
    }
    // trigger new server request and re-render the table
    revalidatePath('/dashboard/invoices')
}


export async function updateInvoice( id: string, formData: FormData ){
    const {customerId, amount, status} = UpdateInvoice.parse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });

    const amountInCents = amount * 100;
    
    try{
        await sql`
        UPDATE invoices
        SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
        WHERE id = ${id}    
        `;
    } catch(error){
        console.log("Error: ", error)
        return {
            message: 'Database Error: Failed to Update Invoice...'
        }
    }
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}



export async function createInvoice(formData : FormData){

    const {customerId, amount, status} = CreateInvoice.parse({

        customerId : formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status')
    });
    const amountInCents = amount * 100
    const date = new Date().toISOString().split('T')[0];


    try{
        await sql`
        INSERT INTO invoices(customer_id, amount, status, date)
        VALUES(${customerId}, ${amountInCents}, ${status}, ${date})
        `;
    } catch(error){
        console.error("Error: ", error)
        return {
            message : 'Database Error: Failed to create Invoice...'
        };
    }

    //test the output
    // console.log( typeof customerId)
    // console.log( typeof amount)
    revalidatePath('/dashboard/invoices') // Clears the cache for /dashboard/invoices. Tells Next.js: “Next time someone visits or navigates here, fetch fresh data
    redirect('/dashboard/invoices')
}

