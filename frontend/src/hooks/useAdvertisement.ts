import { useAds } from "../context/AdsContext"


const useAdvertisement = () => { 
    const {initialAds} = useAds()
    return {slot: initialAds?.slot, clientId: initialAds.clientid}
};

export default useAdvertisement
