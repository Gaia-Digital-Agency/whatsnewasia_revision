import React, {useContext, createContext, useState, PropsWithChildren} from "react"
import { CountryProps, CityProps, RegionProps } from "./TaxonomyContext"
import { Category } from "../types/category.type"
import { ArticleApiResponseProps } from "../types/article.type"

type RouteContextProps = {
    actualRoute: RouteProps,
    setActualRoute: ({country, city, region, category, article}: RouteProps) => void,
    routeType: string,
    setRouteType: (type: string) => void,
    clientChange: boolean,
    setClientChange: (type: boolean) => void,
    getLocationRouteUrl: () => string
}

export type RouteProps = {
    country?: CountryProps | undefined,
    city?: CityProps | undefined,
    region?: RegionProps | undefined,
    category?: Category | undefined
    article?: ArticleApiResponseProps | undefined
}

interface RouteProviderProps extends PropsWithChildren {
    initialData: any
}

const RouteContext = createContext<RouteContextProps>({actualRoute: {country: undefined, city: undefined, region: undefined}, setActualRoute: () => {}, routeType: "", setRouteType: () => {}, clientChange: false, setClientChange: () => {}, getLocationRouteUrl: () => ('')})

export const RouteProvider: React.FC<RouteProviderProps> = ({children, initialData}) => {
    const [actualRoute, setStateActualRoute] = useState<RouteProps>(initialData?.listingParams ?? {})
    const [routeType, setStateRouteType] = useState<string>(initialData?.type ?? 'LOADING')
    // Set to true by default since SSR is disabled - allows components to fetch content on initial load
    const [clientChange, setStateClientChange] = useState<boolean>(true)
    const setActualRoute = (params: RouteProps) => {
        setStateActualRoute(prev => ({...prev, ...params}));
        // setClientChange(true)
    }
    const setRouteType = (type: string) => {
        setStateRouteType(type)
        // setClientChange(true)
    }
    const setClientChange = (val: boolean) => {
        setStateClientChange(val)
    }

    const getLocationRouteUrl = () => {
        return `${actualRoute.country ? `/${actualRoute.country.slug}` : ''}${actualRoute.city ? `/${actualRoute.city.slug}` : ''}${actualRoute.region ? `/${actualRoute.region.slug}` : ''}`
    }
    return (
        <RouteContext.Provider value={{actualRoute, setActualRoute, routeType, setRouteType, clientChange, setClientChange, getLocationRouteUrl}}>
            {children}
        </RouteContext.Provider>
    )
}

export const useRoute = () => useContext(RouteContext)