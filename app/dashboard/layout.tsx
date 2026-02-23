import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { MenuProvider } from "../context/MenuContext";


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <MenuProvider>
    <div className="flex min-h-screen">
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
    
          <AppSidebar variant="inset" />
         
          <main className="flex-1 flex flex-col">
            <SiteHeader />
            {children}
          </main>
        
      </SidebarProvider>
    </div>
    </MenuProvider>
  );
}