import { useParams, Link } from "react-router"
import { useTaxonomies } from "../../context/TaxonomyContext"
import AdsSlot from "../../components/ads/AdsSlot"


const AdsCountry = () => {
    const params = useParams()
    const {adminTaxonomies} = useTaxonomies()
    const country = adminTaxonomies?.countries?.find(country => (country.id == Number(params?.country)))
    const cities = adminTaxonomies?.cities?.filter(city => (city.id_parent == country?.id))
    const url = country?.slug
    return (
        <>
            <div className="title-wrapper">
                <p className="text-front-title font-medium">{country?.name}</p>
            </div>
            <>
                <AdsSlot url={`/ads/leaderboard/${url}`} title="Leaderboard" />
                <div className="spacer py-2"></div>
            </>
            <>
                <AdsSlot url={`/ads/mrec/${url}`} title="Square" />
                <div className="spacer py-2"></div>
            </>
            <>
                <AdsSlot url={`/ads/mrec2/${url}`} title="Second Square" />
                <div className="spacer py-2"></div>
            </>
            <>
                <div className="title-wrapper text-front-subtitle">
                    Cities
                </div>
                <div className="grid grid-cols-12 gap-8">
                    {cities?.map(cit => (
                        <div className="col-span-4" key={cit.slug}>
                            <Link to={`/admin/ads/city/${cit.id}`} className="w-full bg-front-red text-white py-4 block text-center">{cit.name}</Link>
                        </div>
                    ))}
                </div>
            </>
        </>
    )
}

export default AdsCountry