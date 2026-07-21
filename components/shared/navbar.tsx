'use client'

import Link from 'next/link'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { User, Settings, LogOut, UserCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { logout } from '@/service/logout'
import { toast } from 'sonner'

// Navigation items array - easy to maintain and update
const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Contact', href: '/contact' },
]

// User menu items array
const userMenuItems = [
    { label: 'Profile', href: '/profile', icon: UserCircle },
    { label: 'Settings', href: '/settings', icon: Settings },
]

type IUser = {
    success : boolean,
    message : string,
    data : {
        profile : {
            id : string,
            name : string,
            email : string,
            activeStatus : string,
            role : string,
            createdAt : string,
            updatedAt : string,
            profile : {
                id : string,
                profilePhoto : string,
                bio : string | null,
                userId : string,
                createdAt : string,
                updatedAt : string
            }
        }
    }
}

type NavbarProps = {
    user : IUser
}

export function Navbar({user}: NavbarProps) {

    const router = useRouter()
  const handleUserMenuAction = async (action: string) => {

    if(action === "logout"){
        await logout();
        toast.success("User Logged Out Successfully!");
        router.push("/login");
    }
  };

    return (
        <nav className="border-b border-border bg-background">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <div className="shrink-0">
                        <Link href="/" className="text-2xl font-bold text-primary">
                            Prisma Press
                        </Link>
                    </div>

                    {/* Nav Links */}
                    <div className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    {/* User Dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
                                <div className="size-8 rounded-full flex items-center justify-center bg-gray-100">
                                    <User className="size-4" />
                                </div>

                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            <div className="px-2 py-1.5">
                                <p className="text-sm font-medium">{user.data?.profile.name || "name"}</p>
                                <p className="text-xs text-muted-foreground">{user.data?.profile.email || "email"}</p>
                            </div>
                            <DropdownMenuSeparator />
                            {userMenuItems.map((item) => {
                                const Icon = item.icon
                                return (
                                    <DropdownMenuItem key={item.href} asChild>
                                        <Link href={item.href} className="cursor-pointer flex items-center gap-2">
                                            <Icon className="size-4" />
                                            {item.label}
                                        </Link>
                                    </DropdownMenuItem>
                                )
                            })}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={async ()=>{await handleUserMenuAction("logout")}} className="text-red-600 flex items-center gap-2 cursor-pointer">
                                <LogOut className="size-4" />
                                Logout
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </nav>
    )
}
