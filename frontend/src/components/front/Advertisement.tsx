import React from "react";

type AdvertisementProps = {
    ratio?: 'vertical' | 'horizontal'
}
const Advertisement: React.FC<AdvertisementProps> = ({ratio = 'horizontal'}) => {

    return (
        <>
            <section>
                <div className="">
                    <div className={`ads relative w-full bg-[#d9d9d9] ${ratio == 'vertical' ? 'pt-[260%]' : 'pt-[16%]'}`}>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <p className="text-front-small font-semibold text-front-black">ADS PLACEMENT</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Advertisement