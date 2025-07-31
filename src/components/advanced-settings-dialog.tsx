
"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { useAdvancedSettings, type AdvancedSettings } from "@/components/advanced-settings-provider";

type AdvancedSettingsDialogProps = {
  children: React.ReactNode;
};

export function AdvancedSettingsDialog({ children }: AdvancedSettingsDialogProps) {
  const { toast } = useToast();
  const { advancedSettings, setAdvancedSettings } = useAdvancedSettings();
  const [localSettings, setLocalSettings] = React.useState<AdvancedSettings | null>(null);
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    if (isOpen) {
      setLocalSettings(advancedSettings);
    }
  }, [advancedSettings, isOpen]);

  const handleSave = () => {
    if (localSettings) {
        setAdvancedSettings(localSettings);
        toast({
            title: "Settings Saved",
            description: "Your advanced AI settings have been updated.",
        });
        setIsOpen(false);
    }
  };
  
  if (!localSettings) {
      return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
        </Dialog>
      );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Advanced AI Settings</DialogTitle>
          <DialogDescription>
            Fine-tune the AI's behavior with these advanced parameters. Changes will apply to new messages.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
             <div className="space-y-4">
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label>Temperature: <span className="text-muted-foreground font-normal">({localSettings.temperature})</span></Label>
                      <span className="text-xs text-muted-foreground">Focused &harr; Creative</span>
                    </div>
                    <Slider
                      value={[localSettings.temperature]}
                      onValueChange={(value) => setLocalSettings(s => s ? ({...s, temperature: value[0]}) : null)}
                      min={0}
                      max={1}
                      step={0.1}
                    />
                </div>
            </div>
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label>Top-P: <span className="text-muted-foreground font-normal">({localSettings.topP})</span></Label>
                    <p className="text-sm text-muted-foreground">Controls diversity via nucleus sampling. Lower values mean less random responses.</p>
                    <Slider
                        value={[localSettings.topP]}
                        onValueChange={(value) => setLocalSettings(s => s ? ({...s, topP: value[0]}) : null)}
                        min={0}
                        max={1}
                        step={0.05}
                    />
                </div>
                <div className="space-y-2">
                    <Label>Top-K: <span className="text-muted-foreground font-normal">({localSettings.topK})</span></Label>
                     <p className="text-sm text-muted-foreground">Controls diversity by sampling from the K most likely tokens.</p>
                    <Slider
                        value={[localSettings.topK]}
                        onValueChange={(value) => setLocalSettings(s => s ? ({...s, topK: value[0]}) : null)}
                        min={1}
                        max={100}
                        step={1}
                    />
                </div>
                <div className="space-y-2">
                    <Label>Max Output Tokens: <span className="text-muted-foreground font-normal">({localSettings.maxOutputTokens})</span></Label>
                     <p className="text-sm text-muted-foreground">The maximum number of tokens the AI can generate in a single response.</p>
                    <Slider
                        value={[localSettings.maxOutputTokens]}
                        onValueChange={(value) => setLocalSettings(s => s ? ({...s, maxOutputTokens: value[0]}) : null)}
                        min={100}
                        max={2048}
                        step={50}
                    />
                </div>
            </div>
        </div>

        <DialogFooter>
            <Button type="button" variant="ghost" onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button type="submit" onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
