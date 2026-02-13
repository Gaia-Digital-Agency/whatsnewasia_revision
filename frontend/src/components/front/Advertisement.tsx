import React, { useEffect, useRef, useState } from "react";
import useAdvertisement from "../../hooks/useAdvertisement";

type AdvertisementProps = {
    ratio?: "vertical" | "leaderboard" | "horizontal" | "rectangle" | "square",
    slot?: string
}

declare global {
    interface Window {
        adsbygoogle?: any[]
    }
}

const Advertisement: React.FC<AdvertisementProps> = ({ ratio = "horizontal", slot = null }) => {
    const [ready, setReady] = useState(false)
    const {clientId} = useAdvertisement()
    const wrapperRef = useRef<HTMLElement>(null)
    const adRef = useRef<HTMLModElement>(null)
    useEffect(() => {
        if(slot) {
            setReady(true)
        }
    }, [])

    const size = () => {
        if (ratio == "horizontal" || ratio == 'leaderboard') {
            return "md:w-[728px] md:h-[90px] w-[320px] h-[50px]"
        }

        if(ratio == 'rectangle' || ratio == 'square' || ratio == 'vertical') {
            return "md:w-[300px] md:h-[250px]"
        }
        
    }


    useEffect(() => {
        if(!ready || !adRef.current || !slot || !clientId) return
        // wrapperRef.current.style.display = 'block'
        // adRef.current.dataset.adSlot = slot
        // adRef.current.dataset.adClient = clientId
        // adRef.current.dataset.fullWidthResponsive = 'true'
        // adRef.current.dataset.fullHeightResponsive = 'true'
        adRef.current.dataset.adFormat = 'auto'
        adRef.current.style.display = 'block'
        // adRef.current.dataset.adTest = 'on'
        // window.addEventListener('load', () => {
        ;(window.adsbygoogle = window.adsbygoogle || []).push({});
        // })
    }, [ready])
    return (
        <section ref={wrapperRef}>
            <div className={`relative mx-auto ${ready ? '' : 'bg-[#d9d9d9]'} ${size()}`}>
                {/* {ready && */}
                    <ins
                        ref={adRef}
                        style={{display: "none"}}
                        data-ad-slot={slot}
                        data-ad-client={clientId ?? 0}
                        data-ad-format="auto"
                        className="absolute adsbygoogle inset-0 h-full"
                    />
                {/* } */}
            </div>
        </section>
    )
}

export default Advertisement
