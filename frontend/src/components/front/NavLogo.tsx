import React, { useEffect, useState } from "react"
import { getTemplateByUrl } from "../../services/template.service"
import { Link } from "react-router"
import Skeleton from 'react-loading-skeleton'
import { useRoute } from "../../context/RouteContext"
import { useHeaderContent } from "../../context/HeaderContext"
const API_URL = import.meta.env.VITE_WHATSNEW_BACKEND_URL
const IMAGE_URL = import.meta.env.VITE_IMAGE_URL || API_URL

type NavLogoProps = {
    url?: string,
    to: string
}


const NavLogo: React.FC<NavLogoProps> = ({to = '/'}) => {
    // const {setActualRoute} = useOutletContext<SetActualRouteContextProps>()
    const {initialData} = useHeaderContent()
    const [defaultImage, setDefaultImage] = useState<{url: string, id: number} | false>(initialData?.logo ?? false)
    const [image, setImage] = useState<{url: string, id: number} | false>(initialData?.currentLogo ? {url: initialData.currentLogo, id: 0} : false)
    const {actualRoute, clientChange} = useRoute()

    // Fetch logo template if not provided by SSR
    useEffect(() => {
        if (!defaultImage) {
            (async () => {
                try {
                    const getImage = await getTemplateByUrl('/logo-header')
                    if(getImage?.status_code === 200 && getImage.data?.content) {
                        setDefaultImage(JSON.parse(getImage.data.content))
                    }
                } catch(e) {
                    console.log('Error fetching logo template:', e)
                }
            })()
        }
    }, [])
    
    useEffect(() => {
        if(!clientChange) return;
        (async () => {
            try {
                if(actualRoute.region && actualRoute.region.site_logo) {
                    setImage({url: actualRoute.region.site_logo, id: 0})
                    return
                }
                if(actualRoute.city && actualRoute.city.site_logo) {
                    setImage({url: actualRoute.city.site_logo, id: 0})
                    return
                }
                if(actualRoute.country && actualRoute.country.site_logo) {
                    setImage({url: actualRoute.country.site_logo, id: 0})
                    return
                }
                setImage(false)
            } catch(e) {
                console.log(e)
            }
        })()
    }, [actualRoute, clientChange])

    // const clickHandler = () => {
    //     if(to == '/') {
    //         setActualRoute({})
    //     }
    // }

    const renderImage = () => {
        if(!defaultImage && !image) {
            return <Skeleton height="76px" width="141px" containerClassName="logo-wrapper-skeleton inline-block" />
        }
        if(!image && defaultImage) return <img src={defaultImage ? `${IMAGE_URL}/${defaultImage.url}` : '#'} style={{display: defaultImage ? 'block' : 'none'}} width={170} height={76} alt="Logo" />
        return <img src={image ? `${IMAGE_URL}/${image.url}` : '#'} style={{display: image ? 'block' : 'none'}} width={170} height={76} alt="Logo" />
    }

    return (
        <>
            <Link to={to}>
                {renderImage()}
            </Link>
        </>
    )

}

export default NavLogo