import React, {useEffect, useState} from "react"
import { Link, useNavigate } from "react-router"
import { useAuth } from "../../context/AuthContext"
import { useTaxonomies } from "../../context/TaxonomyContext"
import AdsSlot from "../../components/ads/AdsSlot"

type CountryProps = {
    id: number,
    name: string,
    slug: string,
}

const AdsManager: React.FC = () => {
    const [countries, setCountries] = useState<CountryProps[]>([])
    const {userDetails} = useAuth()
    const {adminTaxonomies} = useTaxonomies()
    const navigate = useNavigate()
    if(userDetails?.user_level !== 'super_admin') {
        navigate(`/admin`)
    }

    useEffect(() => {
        (async () => {
            if(adminTaxonomies.countries) {
                setCountries(adminTaxonomies.countries.map(coun => ({id: coun.id, name: coun.name, slug: coun.slug})))
            }
        })();
    }, [adminTaxonomies])

    return (
        <>
            <>
                <AdsSlot url={`/ads/leaderboard`} title="Leaderboard" />
                <div className="spacer py-2"></div>
            </>
            <>
                <AdsSlot url={`/ads/mrec`} title="Square" />
                <div className="spacer py-2"></div>
            </>
            <>
                <AdsSlot url={`/ads/mrec2`} title="Second Square" />
                <div className="spacer py-2"></div>
            </>
            <div className="spacer py-6"></div>
            <p>Countries</p>
            <div className="spacer py-1"></div>
            <div className="grid grid-cols-12 gap-8">
                {countries.filter(country => (country.slug != 'asia')).map(country => (
                    
                    <div className="col-span-3" key={country.slug}>
                        <Link to={`/admin/ads/country/${country.id}`} className="w-full bg-front-red text-white py-4 block text-center">{country.name}</Link>
                    </div>
                ))}
            </div>
        </>
    )
}

export default AdsManager