import { Button } from "@/components/ui/button"
import { ArrowLeft, Mountain } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link href="/" className="flex items-center justify-center">
          <Mountain className="h-6 w-6 text-primary" />
          <span className="sr-only">Acme Inc</span>
        </Link>
      </header>
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-6 px-4">
          <div className="space-y-2">
            <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl">404 - Not Found</h1>
            <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              The page you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>
          </div>
          <div className="mx-auto max-w-sm space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium tracking-wide uppercase text-primary">Error Code: 404</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Please check the URL in the address bar and try again.
              </p>
            </div>
            <div className="flex justify-center">
              <Button asChild>
                <Link href="/" className="inline-flex items-center">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Return Home
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-gray-200 dark:border-gray-800">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} TodoApp. All rights reserved.
        </p>
        
      </footer>
    </div>
  )
}