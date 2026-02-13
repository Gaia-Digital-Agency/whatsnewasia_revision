import { useParams, Link } from "react-router"
import { useTaxonomies } from "../../context/TaxonomyContext"
import AdsSlot from "../../components/ads/AdsSlot"


const AdsCity = () => {
    const params = useParams()
    const {adminTaxonomies} = useTaxonomies()
    const country = adminTaxonomies?.countries?.find(country => (country.id == Number(params?.country)))
    const city = adminTaxonomies?.cities?.find(city => (city.id == Number(params?.city)))
    const regions = adminTaxonomies?.regions?.filter(region => (region.id_parent == city?.id))
    const url = [country?.slug, city?.slug].join('/')
    return (
        <>
            <div className="title-wrapper">
                <p className="text-front-title font-medium">{city?.name}</p>
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
                    Regions
                </div>
                <div className="grid grid-cols-12 gap-8">
                    {regions?.map(region => (
                        <div className="col-span-4" key={region.slug}>
                            <Link to={`/admin/ads/region/${region.id}`} className="w-full bg-front-red text-white py-4 block text-center">{region.name}</Link>
                        </div>
                    ))}
                </div>
            </>
        </>
    )
}

export default AdsCity