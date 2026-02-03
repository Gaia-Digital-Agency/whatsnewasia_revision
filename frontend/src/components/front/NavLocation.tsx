import React, {useEffect, useState} from "react"
import SelectNav from "./SelectNav"
import { useNavigate } from "react-router"
import { CountryProps, useTaxonomies } from "../../context/TaxonomyContext"
import { useRoute } from "../../context/RouteContext"
import { CityProps, RegionProps } from "../../context/TaxonomyContext"
import { Link } from "react-router"
// import { useAuth } from "../../context/AuthContext" // No longer needed after removing Indonesia redirect

const NavLocation: React.FC = () => {
    // const [countries, setCountries] = useState<CountryProps[]>()
    const [cities, setCities] = useState<CityProps[]>()
    const [regions, setRegions] = useState<RegionProps[]>()
    const {actualRoute} = useRoute()
    // const {userDetails} = useAuth() // No longer needed after removing Indonesia redirect
    // const {actualRoute} = useOutletContext<{actualRoute: ActualRouteProps}>()
    // const {locations} = useOutletContext<LocationsContextProps>()
    const {taxonomies} = useTaxonomies()
    const filteredCountries = {...taxonomies}.countries?.filter(coun => coun.id!=999)
    const filteredTax = {...taxonomies, countries: filteredCountries}
    const navigate = useNavigate()
    // const {isReadyRenderHeader} = useOutletContext<IsReadyRenderHeaderContextProps>()
    useEffect(() => {
        const actualCountry = actualRoute.country
        if(actualCountry) {
            setCities(filteredTax?.cities?.filter(city => (city.id_parent == actualCountry.id)))
        }
        const actualCity = actualRoute.city
        if(actualCity) {
            setRegions(filteredTax?.regions?.filter(reg => (reg.id_parent == actualCity.id)))
        }
    }, [actualRoute])
    const changeCountryHandler = (country: string | number) => {
        if(country == '') {
            navigate(`${actualRoute?.category ? `/${actualRoute?.category?.slug_title}` : '/'}`)
            return
        }
        navigate(`/${country}${actualRoute?.category ? `/${actualRoute?.category?.slug_title}` : ''}`)
        return
    }

    const changeCityHandler = (city: string | number) => {
        // if(!locations) return
        if(city == '') {
            navigate(`/${actualRoute?.country?.slug}${actualRoute?.category ? `/${actualRoute?.category?.slug_title}` : ''}`)
            return
        }
        navigate(`/${actualRoute?.country?.slug}/${city}${actualRoute?.category ? `/${actualRoute?.category?.slug_title}` : ''}`)
        return
    }

    const changeRegionHandler = (region: string | number) => {
        if(region == '') {
            navigate(`/${actualRoute?.country?.slug}/${actualRoute?.city?.slug}/${actualRoute?.category ? `/${actualRoute?.category?.slug_title}` : ''}`)
            return
        }
        navigate(`/${actualRoute?.country?.slug}/${actualRoute?.city?.slug}/${region}${actualRoute?.category ? `/${actualRoute?.category?.slug_title}` : ''}`)
        return
    }

    // Disabled Indonesia redirect - now behaves like other countries
    const getCountryUrl = (country: CountryProps) => {
        return `/${country.slug}${actualRoute?.category ? `/${actualRoute.category.slug_title}` : ''}`
    }
    // if(loading) return <></>
    if(actualRoute.country) {
        return (
            <>
                <div className="flex flex-col md:flex-row gap-y-2 md:gap-y-0 md:gap-x-3">
                    <div className="md:w-[250px] w-full">
                        <SelectNav defaultLabel={"All Asia"} redOnActive={true} onChange={changeCountryHandler} value={actualRoute?.country ? actualRoute.country.slug : undefined} options={
                            filteredTax?.countries?.map(country => {
                                return {value: country.slug, label: country.name}
                            }) ?? []
                        } />
                    </div>
                    {
                        !!(cities && actualRoute.country && cities.length) &&
                        <div className="md:w-[250px] w-full">
                            <SelectNav defaultLabel={"Explore City"} onChange={changeCityHandler} value={actualRoute.city ? actualRoute.city.slug : undefined} options={
                                cities.map(city => {
                                    return {value: city.slug, label: city.name}
                                })
                            } />
                        </div>
                    }
                    {
                        !!(regions && actualRoute.city && regions.length) && 
                        <div className="md:w-[250px] w-full">
                            <SelectNav defaultLabel={"Explore by Area"} onChange={changeRegionHandler} value={actualRoute.region ? actualRoute.region.slug : undefined} options={
                                regions.map(region => {
                                    return {value: region.slug, label: region.name}
                                })
                            } />
                        </div>
                    }
                </div>
            </>
        )
    }
    return (
        <>
            <div className="country-select-wrapper flex md:gap-x-10 gap-y-4 md:items-center flex-col md:flex-row">
                <div className="title">
                    <p className="font-serif text-front-subtitle font-bold">EXPLORE COUNTRIES</p>
                </div>
                <div className="item flex-1 grid grid-cols-4 gap-2 md:gap-4 w-full">
                    {
                        filteredTax.countries?.map(country => {
                            return (
                                <div className="country col-span-2 md:col-span-1 uppercase text-center items-center" key={`navlocation-explore-${country.id}`}>
                                    <Link className="text-front-body border-[2px] border-front-red py-2 inline-block w-full transition text-white bg-front-red hover:text-black hover:bg-white" to={getCountryUrl(country)}>{country.name}</Link>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default NavLocation