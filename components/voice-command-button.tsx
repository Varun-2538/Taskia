"use client"

import { Mic } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface VoiceCommandButtonProps {
  isListening: boolean
  onClick: () => void
}

export function VoiceCommandButton({ isListening, onClick }: VoiceCommandButtonProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className={`rounded-xl transition-all ${isListening ? "animate-pulse border-primary shadow" : "hover:shadow"}`}
            onClick={onClick}
          >
            <Mic className={`h-4 w-4 ${isListening ? "text-primary" : ""}`} />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Voice commands (Ctrl+Space)</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
