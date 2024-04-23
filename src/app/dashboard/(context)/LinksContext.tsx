'use client';

import { ApiData, Link } from "@/app/lib/definitions";
import { IconOptions } from "@/app/lib/utils";
import { createContext, useContext, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

interface LinksContextProps{
    user_id: string;
    userlinks: Link[]
    addUserLink: () => void
    removeUserLink: (id: string) => void
    updateUserLinkPlatform: (id: string, platform: string) => void
}

interface LinksProviderProps{
    children: React.ReactNode;
    data: ApiData | undefined
}

// Context for the generation of links
const LinksContext = createContext<LinksContextProps | undefined>(undefined)


export const LinksProvider = ({ children, data }: LinksProviderProps) => {
    const [user_id, setUserId] = useState(data?.id || '');
    const [userlinks, setUserlinks] = useState<Link[]>(data?.json_data?.links || []);

    const addUserLink = () => {
        const randomPlatform = Math.floor(Math.random() * (IconOptions.length -1 ))
        const newLink = {
            id: uuidv4(),
            url: 'https://example.com',
            platform: IconOptions[randomPlatform].value
        }
        setUserlinks([...userlinks, newLink]);
    }

    const removeUserLink = (id: string) => {
        setUserlinks(userlinks.filter(link => link.id !== id));    
    }

    const updateUserLinkPlatform = (id: string, platform : string) => {
        setUserlinks(userlinks.map(link => link.id === id ? {...link, platform: platform} : link));
    }

    return (
        <LinksContext.Provider value={{user_id,userlinks, addUserLink, removeUserLink, updateUserLinkPlatform}}>
            {children}
        </LinksContext.Provider>
    )
}

export const useLinksContext = () =>{
    const context = useContext(LinksContext);
    if (!context) {
        throw new Error('useLinksContext must be used within a LinksProvider');
    }
    return context;
}