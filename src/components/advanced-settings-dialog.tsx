
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import type { AdvancedSettings } from "@/components/sirah-sense-client";

type AdvancedSettingsDialogProps = {
  children: React.ReactNode;
  settings: AdvancedSettings;
  onSettingsChange: (settings: AdvancedSettings) => void;
};

const safetyCategories = [
    { value: 'HARM_CATEGORY_HARASSMENT', label: 'Harassment' },
    { value: 'HARM_CATEGORY_HATE_SPEECH', label: 'Hate Speech' },
    { value: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', label: 'Sexually Explicit' },
    { value: 'HARM_CATEGORY_DANGEROUS_CONTENT', label: 'Dangerous Content' },
] as const;

const safetyThresholds = [
    { value: 'BLOCK_NONE', label: 'Block None' },
    { value: 'BLOCK_ONLY_HIGH', label: 'Block High' },
    { value: 'BLOCK_MEDIUM_AND_ABOVE', label: 'Block Medium & Up' },
    { value: 'BLOCK_LOW_AND_ABOVE', label: 'Block Low & Up' },
] as const;


export function AdvancedSettingsDialog({ children, settings, onSettingsChange }: AdvancedSettingsDialogProps) {
  const { toast } = useToast();
  const [localSettings, setLocalSettings] = React.useState(settings);

  React.useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  const handleSave = () => {
    onSettingsChange(localSettings);
    toast({
      title: "Settings Saved",
      description: "Your advanced AI settings have been updated.",
    });
  };

  const handleSafetyChange = (category: typeof safetyCategories[number]['value'], threshold: typeof safetyThresholds[number]['value']) => {
    setLocalSettings(prev => ({
        ...prev,
        safetySettings: prev.safetySettings.map(s => s.category === category ? { ...s, threshold } : s)
    }));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Advanced AI Settings</DialogTitle>
          <DialogDescription>
            Fine-tune the AI's behavior with these advanced parameters. Changes will apply to new messages.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-4">
                    <div className="space-y-2">
                        <Label>Top-P: <span className="text-muted-foreground font-normal">({localSettings.topP})</span></Label>
                        <p className="text-sm text-muted-foreground">Controls diversity via nucleus sampling. Lower values mean less random responses.</p>
                        <Slider
                            value={[localSettings.topP]}
                            onValueChange={(value) => setLocalSettings(s => ({...s, topP: value[0]}))}
                            min={0}
                            max={1}
                            step={0.05}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Top-K: <span className="text-muted-foreground font-normal">({localSettings.topK})</span></Label>
                         <p className="text-sm text-muted-foreground">Controls diversity by sampling from the K most likely tokens. 1 means the most likely token is always chosen.</p>
                        <Slider
                            value={[localSettings.topK]}
                            onValueChange={(value) => setLocalSettings(s => ({...s, topK: value[0]}))}
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
                            onValueChange={(value) => setLocalSettings(s => ({...s, maxOutputTokens: value[0]}))}
                            min={100}
                            max={2048}
                            step={50}
                        />
                    </div>
                </div>

                <div className="space-y-4">
                     <div className="space-y-2">
                        <Label>Safety Settings</Label>
                        <p className="text-sm text-muted-foreground">Adjust content safety filters for the AI. Stricter settings can reduce harmful responses but may also be less helpful.</p>
                    </div>
                    {safetyCategories.map(cat => (
                         <div key={cat.value} className="grid grid-cols-3 items-center gap-4">
                            <Label className="col-span-1 text-sm">{cat.label}</Label>
                            <Select 
                                value={localSettings.safetySettings.find(s => s.category === cat.value)?.threshold}
                                onValueChange={(value: typeof safetyThresholds[number]['value']) => handleSafetyChange(cat.value, value)}
                            >
                                <SelectTrigger className="col-span-2">
                                    <SelectValue placeholder="Select threshold" />
                                </SelectTrigger>
                                <SelectContent>
                                    {safetyThresholds.map(thresh => (
                                        <SelectItem key={thresh.value} value={thresh.value}>{thresh.label}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        <DialogFooter>
            <Button type="submit" onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
