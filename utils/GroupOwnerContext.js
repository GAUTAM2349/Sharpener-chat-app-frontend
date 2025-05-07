import { createContext, useEffect, useState } from "react";


export const GroupOwnerContext = createContext();

export const GroupOwnerProvider = ({children}) => {

    const [group, setGroup] = useState({});

    return (

        <GroupOwnerContext.Provider value={ { group, setGroup }} >
            {children}
        </GroupOwnerContext.Provider>
        
    )
    
}

