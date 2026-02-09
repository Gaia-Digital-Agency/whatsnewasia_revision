import React, {useContext, createContext, PropsWithChildren} from "react"

type AdsContextProps = {
    initialAds: any
}


interface ContentProviderProps extends PropsWithChildren {
    initialData: any
}

const AdsContext = createContext<AdsContextProps>({initialAds: {}})

export const AdsProvider: React.FC<ContentProviderProps> = ({children, initialData}) => {
    return (
        <AdsContext.Provider value={{initialAds: initialData}}>
            {children}
        </AdsContext.Provider>
    )
}

export const useAds = () => useContext(AdsContext)