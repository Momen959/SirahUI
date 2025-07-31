
"use client";

import React, { createContext, useState, useContext, useMemo } from 'react';

export interface AdvancedSettings {
    temperature: number;
    topP: number;
    topK: number;
    maxOutputTokens: number;
}

interface AdvancedSettingsContextType {
    advancedSettings: AdvancedSettings;
    setAdvancedSettings: React.Dispatch<React.SetStateAction<AdvancedSettings>>;
}

const AdvancedSettingsContext = createContext<AdvancedSettingsContextType | undefined>(undefined);

export function AdvancedSettingsProvider({ children }: { children: React.ReactNode }) {
    const [advancedSettings, setAdvancedSettings] = useState<AdvancedSettings>({
        temperature: 0.7,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 1024,
    });

    const value = useMemo(() => ({
        advancedSettings,
        setAdvancedSettings
    }), [advancedSettings]);

    return (
        <AdvancedSettingsContext.Provider value={value}>
            {children}
        </AdvancedSettingsContext.Provider>
    );
}

export function useAdvancedSettings() {
    const context = useContext(AdvancedSettingsContext);
    if (context === undefined) {
        throw new Error('useAdvancedSettings must be used within an AdvancedSettingsProvider');
    }
    return context;
}
