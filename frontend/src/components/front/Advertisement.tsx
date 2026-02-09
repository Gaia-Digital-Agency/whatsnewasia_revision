import React, { useEffect, useRef, useState } from "react";
import useAdvertisement from "../../hooks/useAdvertisement";

type AdvertisementProps = {
    ratio?: "vertical" | "horizontal",
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


    useEffect(() => {
        if(!ready || !adRef.current || !slot || !wrapperRef.current) return
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
            <div className={`relative w-full ${ready ? '' : 'bg-[#d9d9d9]'} ${ratio === "vertical" ? "pt-[600px]" : "pt-[16%]"}`}>
                {/* {ready && */}
                    <ins
                        ref={adRef}
                        style={{display: "none"}}
                        data-ad-slot={slot}
                        data-ad-client={clientId}
                        data-ad-format="auto"
                        className="absolute adsbygoogle inset-0 h-full"
                    />
                {/* } */}
            </div>
        </section>
    )
}

export default Advertisement
