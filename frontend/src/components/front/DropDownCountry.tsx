import React from "react"
import { useRoute } from "../../context/RouteContext"
import SelectNav from "./SelectNav"
import { useNavigate } from "react-router"
import { useTaxonomies } from "../../context/TaxonomyContext"


const DropDownCountry: React.FC = () => {
    const {actualRoute} = useRoute()
    const {taxonomies} = useTaxonomies()
    const navigate = useNavigate()

    const changeHandler = (val: string) => {
        const country = taxonomies?.countries?.find(coun => (coun.slug == val))
        if(country) {
            navigate(`/${country.slug}`)
            return
        }
        navigate('/')
        return
    }
    return (
        <>
            <div className="dropdown-country-wrapper">
                <SelectNav 
                    onChange={changeHandler}
                    options={taxonomies.countries?.filter(country => (country.slug != 'asia')).map(country => ({value: country.slug, label: country.name})) || []}
                    defaultLabel={'Choose Your Destination'}
                    value={actualRoute.country?.slug || undefined}
                    classNames={{
                        singleValue: "dropdown-country-nav dropdown-country-input text-theme-front-red md:w-[200px]",
                        option: "dropdown-country-nav dropdown-country-option text-theme-front-red"
                    }}
                >
                </SelectNav>
            </div>
        </>
    )
}

export default DropDownCountry