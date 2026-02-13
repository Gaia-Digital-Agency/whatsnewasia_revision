import { useAds } from "../context/AdsContext"
import { useRoute } from "../context/RouteContext";
import { getTemplateByUrl } from "../services/template.service";


const useAdvertisement = () => { 
    const {initialAds} = useAds()
    const {actualRoute} = useRoute()

    const getAdsByUrl = async (type: "leaderboard" | "mrec" | "mrec2") => {
        let url = []
        if(actualRoute.country) url.push(actualRoute.country.slug)
        if(actualRoute.city) url.push(actualRoute.city.slug)
        if(actualRoute.region) url.push(actualRoute.region.slug)

        for(let i = 0; i < url.length; i++) {
            const _url = url.join('/')
            const get = await getTemplateByUrl(`/ads/${type}/${_url}`)
            if(get?.status_code == 200 && get?.data?.content) {
                return get?.data?.content
            }
            url.pop()
        }
        return ""
        
    }

    return {slot: initialAds?.slot, clientId: initialAds.clientid ?? false, getAdsByUrl}
};

export default useAdvertisement
