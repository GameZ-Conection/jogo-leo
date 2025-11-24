'use client';
import React, { createContext, useContext, useState } from 'react';

type TabType = 'shop' | 'research' | null;

interface MenuContextValue {
    activeTab: TabType;
    setActiveTab: (tab: TabType) => void;
}

const MenuContext = createContext<MenuContextValue | null>(null);

export function MenuProvider({ children }: { children: React.ReactNode }) {
    const [activeTab, setActiveTab] = useState<TabType>(null);
    return (
        <MenuContext.Provider value={{ activeTab, setActiveTab }}>
            {children}
        </MenuContext.Provider>
    );
}

export function useMenu() {
    const ctx = useContext(MenuContext);
    if (!ctx) throw new Error('useMenu must be used within MenuProvider');
    return ctx;
}
