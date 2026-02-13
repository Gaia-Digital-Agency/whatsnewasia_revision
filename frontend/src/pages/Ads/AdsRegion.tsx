import { useParams } from "react-router"
import { useTaxonomies } from "../../context/TaxonomyContext"
import AdsSlot from "../../components/ads/AdsSlot"


const AdsRegion = () => {
    const params = useParams()
    const {adminTaxonomies} = useTaxonomies()
    const country = adminTaxonomies?.countries?.find(coun => (coun.id == Number(params?.country)))
    const city = adminTaxonomies?.cities?.find(cit => (cit.id == Number(params?.city)))
    const region = adminTaxonomies?.regions?.find(reg => (reg.id == Number(params.region)))
    const url = [country?.slug, city?.slug, region?.slug].join('/')
    return (
        <>
            <div className="title-wrapper">
                <p className="text-front-title font-medium">{region?.name}</p>
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
        </>
    )
}

export default AdsRegion