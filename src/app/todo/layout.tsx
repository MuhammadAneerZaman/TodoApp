import Navbar from "@/components/Navbar"
import { Toaster } from "@/components/ui/toaster"


export default function TodoLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
      return (
          <main>
            <Navbar />
            <Toaster />
            <section>
            {children}
            </section>
            </main>      
    ) 
}