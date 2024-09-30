"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, Plus, ListTodo, LogOut, User, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useRouter } from "next/navigation"
import axios from "axios"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const NavItems = ({ isMobile = false, closeMenu = () => {} }) => (
    <>
      <Link
        href="/todo"
        className={`flex items-center space-x-2 ${
          isMobile ? "text-lg" : "text-sm"
        } font-medium text-gray-700 transition-colors hover:text-primary`}
        onClick={closeMenu}
      >
        <Plus className="h-4 w-4" />
        <span>Add Todo</span>
      </Link>
      <Link
        href="/todo/get-todos"
        className={`flex items-center space-x-2 ${
          isMobile ? "text-lg" : "text-sm"
        } font-medium text-gray-700 transition-colors hover:text-primary`}
        onClick={closeMenu}
      >
        <ListTodo className="h-4 w-4" />
        <span>Your Todos</span>
      </Link>
    </>
  )

  const handleSignOut = async () => {
    try {
      await axios.get('/api/signout')
      router.push('/login')
    } catch (error) {
      console.log("There was an error while signing out", error)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col space-y-4 mt-4">
                <Link
                  href="/"
                  className="flex items-center space-x-2 text-lg font-medium text-gray-700 transition-colors hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  <User className="h-4 w-4" />
                  <span>Home</span>
                </Link>
                <NavItems isMobile={true} closeMenu={() => setIsOpen(false)} />
              </nav>
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center space-x-2">
            <CheckCircle className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl text-gray-900 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              TodoApp
            </span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          <NavItems />
        </nav>
        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-8 w-8 rounded-full"
              >
                <Avatar className="h-8 w-8">
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuItem onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sign Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}