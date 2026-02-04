import React, {useEffect, useRef, useState} from "react"
import SelectNav from "./SelectNav"
import { useNavigate } from "react-router"
import { CountryProps, useTaxonomies } from "../../context/TaxonomyContext"
import { useRoute } from "../../context/RouteContext"
import { CityProps, RegionProps } from "../../context/TaxonomyContext"
import { Link } from "react-router"
import { SwiperRef } from "swiper/react"
import { SwiperSlide, Swiper } from "swiper/react"
import { Navigation } from "swiper/modules"
import DropDownCountry from "./DropDownCountry"

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
    const swiperRef = useRef<SwiperRef>(null)
    const nextRef = useRef<HTMLDivElement>(null)
    const prevRef = useRef<HTMLDivElement>(null)
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

    useEffect(() => {
        setTimeout(() => {
            if(swiperRef.current) {
                swiperRef.current.swiper.init()
                // swiperRef.current.swiper.width = 100
                // swiperRef.current.swiper
            }
        }, 1000)
    }, [])

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
                        <SelectNav classNames={{singleValue: "uppercase"}} defaultLabel={"All Asia"} redOnActive={true} onChange={changeCountryHandler} value={actualRoute?.country ? actualRoute.country.slug : undefined} options={
                            filteredTax?.countries?.map(country => {
                                return {value: country.slug, label: country.name}
                            }) ?? []
                        } />
                    </div>
                    {
                        !!(cities && actualRoute.country && cities.length) &&
                        <div className="md:w-[250px] w-full">
                            <SelectNav classNames={{singleValue: "uppercase"}} defaultLabel={"Explore City"} onChange={changeCityHandler} value={actualRoute.city ? actualRoute.city.slug : undefined} options={
                                cities.map(city => {
                                    return {value: city.slug, label: city.name}
                                })
                            } />
                        </div>
                    }
                    {
                        !!(regions && actualRoute.city && regions.length) && 
                        <div className="md:w-[250px] w-full">
                            <SelectNav classNames={{singleValue: "uppercase"}} defaultLabel={"Explore by Area"} onChange={changeRegionHandler} value={actualRoute.region ? actualRoute.region.slug : undefined} options={
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
            <div className="country-select-wrapper hidden lg:flex gap-x-[10px] gap-y-4 items-center w-full">
                    <p className="font-serif text-front-subtitle-big font-bold flex-shrink-0">EXPLORE COUNTRIES</p>
                    {/* <div className="nav-location-selector-wrapper flex items-center"> */}
                        <div className="arrow-left arrow-wrapper" ref={prevRef}>
                            <div className="arrow">
                                <img src="/images/icons/chevron-left.svg" alt="" />
                            </div>
                        </div>
                        <Swiper
                            slidesPerView={3}
                            init={true}
                            spaceBetween={15}
                            ref={swiperRef}
                            modules={[Navigation]}
                            navigation={
                                {
                                    enabled: true,
                                    nextEl: nextRef.current,
                                    prevEl: prevRef.current
                                }
                            }
                        >
                        {
                            filteredTax.countries?.map(country => {
                                return (
                                    <SwiperSlide>
                                        <div className="country uppercase text-center items-center" key={`navlocation-explore-${country.id}`}>
                                            <Link className="text-front-body border-[2px] border-front-red flex justify-center items-center h-10 w-full transition text-white bg-front-red hover:text-black hover:bg-white" to={getCountryUrl(country)}>{country.name}</Link>
                                        </div>
                                    </SwiperSlide>
                                )
                            })
                        }
                        </Swiper>
                        <div className="arrow-right arrow-wrapper" ref={nextRef}>
                            <div className="arrow">
                                <img src="/images/icons/chevron-left.svg" alt="" />
                            </div>
                        </div>
                    {/* </div> */}
                </div>
            {/* <div className="country-select-wrapper flex md:gap-x-10 gap-y-4 md:items-center">
                <div className="title flex-shrink-0 flex-grow-1">
                    <p className="font-serif text-front-subtitle font-bold">EXPLORE COUNTRIES</p>
                </div>
                <div className="item flex-shrink-1 w-full">
                    <Swiper
                        slidesPerView={3}
                        init={false}
                        spaceBetween={15}
                        ref={swiperRef}
                    >
                    {
                        filteredTax.countries?.map(country => {
                            return (
                                <SwiperSlide>
                                    <div className="country uppercase text-center items-center" key={`navlocation-explore-${country.id}`}>
                                        <Link className="text-front-body border-[2px] border-front-red flex justify-center items-center h-10 w-full transition text-white bg-front-red hover:text-black hover:bg-white" to={getCountryUrl(country)}>{country.name}</Link>
                                    </div>
                                </SwiperSlide>
                            )
                        })
                    }
                    </Swiper>
                </div>
            </div> */}
        </>
    )
}

export default NavLocation