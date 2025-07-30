"use client"

import * as React from "react"
import { Palette } from "lucide-react"
import { useColorTheme } from "@/components/color-theme-provider"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ColorThemeToggle() {
  const { setTheme } = useColorTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Palette className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Toggle color theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("theme-green")}>
          Green
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("theme-brown")}>
          Brown
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
