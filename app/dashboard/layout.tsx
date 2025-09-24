import SideNav from "@/app/ui/dashboard/sidenav"
// adopt pre-rendering for specific route
//Next.js will prerender the static parts of your route and defer the dynamic parts until the user requests them
export const experimental_ppr = true //this improve performance in production

type LayoutProps = {
    children : React.ReactNode
}

export default function Layout({children} : LayoutProps){
    return (
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden ">
            <div className="w-full flex-none md:w-64 ">
                <SideNav/>
            </div>

            <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
        </div>
    )
}