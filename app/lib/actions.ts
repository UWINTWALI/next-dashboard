'use server';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import postgres from 'postgres';
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require'});
import { redirect } from 'next/navigation';
import { validateHeaderName } from 'http';
import { signIn } from '@/auth'
import { AuthError } from 'next-auth';
import { deflate } from 'zlib';



// Zod Schema define the struncture of the invoice
const FormSchema = z.object({
    id: z.string(),
    customerId: z.string({
        invalid_type_error: 'Please select a customer.'
    }),
    amount: z.coerce.number().gt(0, {message: 'Please Enter an amount greater than $0.'}),
    status: z.enum(['pending', 'paid'], {
        invalid_type_error: 'Please select an invoice status'
    }),
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


export async function updateInvoice( id: string, prevState: State, formData: FormData ){
    const validatedFields = UpdateInvoice.safeParse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });

    if(!validatedFields.success){
        return{
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing fields. Failed to update the  Invoice.'
        };
    }

    const {customerId, amount, status} = validatedFields.data;
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

// updated createInvoice action to accept two parameters - prevState and formData

export type State = {
    errors?: {
        customerId?: string[];
        amount?: string[];
        status?: string[];

    }
    message?: string | null;
};

// prevState - contains the state passed from the useActionState hook. 
// You won't be using it in the action in this example, 
// but it's a required prop.

export async function createInvoice( prevState: State , formData : FormData){
    // Valiiidate form using Zod
    const validatedFields = CreateInvoice.safeParse({
        // safeParse() will return an object containing either a success or error field

        customerId : formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status')
    });
    if(!validatedFields.success){
        return{
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to create Invoice.',
        };
    }
    // prepare data for insertion into the database
    const {customerId, amount, status} = validatedFields.data;

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

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
){
    try{
        await signIn('credentials', formData);
    }catch(error){
        if(error instanceof AuthError){
            switch (error.type){
                case 'CredentialsSignin':
                    return 'Invalid Credentials.'
                default:
                    return 'Something Went Wrong!'
            }
        }
        throw error;
    }
}