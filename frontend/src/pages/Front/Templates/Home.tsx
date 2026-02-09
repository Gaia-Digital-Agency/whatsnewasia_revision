import React, {useState, useEffect} from "react"
import {Trending} from "../../../components/front/Trending"
import HeroImage from "../../../components/front/HeroImage"
import MostPopular from "../../../components/front/MostPopular"
import UltimateGuide from "../../../components/front/UltimateGuide"
import Overseas from "../../../components/front/Overseas"
import Newsletter from "../../../components/front/Newsletter"
import EventsHome from "../../../components/front/EventsHome"
import Advertisement from "../../../components/front/Advertisement"
import About from "../../../components/front/About"
import { useContent } from "../../../context/ContentContext"
import { useRoute } from "../../../context/RouteContext"
import { getTemplateByUrl } from "../../../services/template.service"
import { HomeTemplate as DefaultHomeTemplate } from "../../../lib/map/TemplatesMap"
import pkg from "../../../lib/utils/Helmet"
import useAdvertisement from "../../../hooks/useAdvertisement"
const {Helmet} = pkg

const SITE_URL = import.meta.env.VITE_SITE_URL || ''


export const Spacer: React.FC = () => (<div className="spacer md:py-12 py-6"></div>)

const HomeTemplate: React.FC = () => {
    const {initialData} = useContent()
    const [content, setContent] = useState<any>(initialData?.template ?? {})
    const [isReady, setIsReady] = useState<boolean>(true)
    const {actualRoute, clientChange} = useRoute()
    const {slot} = useAdvertisement()
    // const isV2 = searchParams.get('v2')
    const isLocation = actualRoute?.country || actualRoute?.city || actualRoute?.region
    useEffect(() => {
        if(!clientChange) return
        setIsReady(false);
        (async () => {
            try {
                const _urlToGet = isLocation ? `${actualRoute?.country ? `/${actualRoute.country.slug}` : ''}${actualRoute?.city ? `/${actualRoute.city.slug}` : ''}${actualRoute?.region ? `/${actualRoute.region.slug}` : ''}` : '/'
                const urlToGet = `/v2${_urlToGet}`
                const getTemplate = await getTemplateByUrl(urlToGet)
                if(getTemplate?.data?.content && getTemplate.status_code == 200) {
                    setContent(JSON.parse(getTemplate.data.content))
                } else {
                    setContent(DefaultHomeTemplate)
                    // if(isV2){
                    //     // const theContent = await generateContent(DefaultHomeTemplate) 
                    // } else {
                    //     setContent(null)
                    // }
                }
                setIsReady(true)
            } catch(e) {
                console.log(e)
                setIsReady(true)
                setContent(null)
            }
        })()
    }, [actualRoute])
    const heroImage = content.heroImage ? content.heroImage.articles : [0,0,0]
    const trending = content.trending ? content.trending.articles : [0,0,0,0,0]
    const mostPopular = content.mostPopular ? content.mostPopular.articles : [0,0,0,0,0,0,0,0]
    const events = content.events ? content.events.articles : [0,0,0,0]
    const ultimateGuide = content.ultimateGuide ? content.ultimateGuide.articles : [0,0,0,0,0,0]
    const overseas = content.overseas ? content.overseas.articles : [0,0,0,0,0,0,0,0]
    const getDeepestLocation = () => {
        if(actualRoute.region) return actualRoute.region.name
        if(actualRoute.city) return actualRoute.city.name
        if(actualRoute.country) return actualRoute.country.name
        return 'Home'
    }
    const getHelmet = () => {
        return (
            <Helmet>
                <title>{getDeepestLocation()} - Whatsnew Asia</title>
                <meta name="description" content="Whats's New Asia is the ultimate city guide for expats and travelers, featuring the best dining, events, schools, wellness, and travel in Asia" />
                <link rel="canonical" href={SITE_URL} />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Home - Whatsnew Asia" />
                <meta property="og:description" content="What's New Asia is the ultimate city guide for expats and travelers, featuring the best dining, events, schools, wellness, and travel in Asia" />
                <meta property="og:url" content={SITE_URL} />
                <meta property="og:site_name" content="Whatsnew Asia" />
            </Helmet>
        )
    }

    if(!isReady) return (
        <>
            {getHelmet()}
        </>
    )
    return (
        <>
            {getHelmet()}
            <HeroImage preContent={heroImage} />
            <Spacer />
            <div className="container">
                <Advertisement slot={slot?.home} />
            </div>
            
            <Trending preContent={trending} />
            {
                isLocation &&
                <>
                    <MostPopular preContent={mostPopular} />
                </>
            }
            <EventsHome preContent={events} />
            <UltimateGuide preContent={ultimateGuide} />
            <Overseas preContent={overseas} />
            <div className="outer bg-front-section-grey">
                <Spacer />
                <About />
                    <Newsletter />
                <Spacer />
            </div>
        </>
    )

}

export default HomeTemplate