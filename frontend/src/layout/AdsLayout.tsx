import React from "react"
import { Outlet, useNavigate } from "react-router"
import ComponentCard from "../components/common/ComponentCard"
import PageAdminTitle from "../components/common/PageAdminTitle"
import { useAuth } from "../context/AuthContext"


const AdsLayout: React.FC = () => {

    const {userDetails} = useAuth()
    const navigate = useNavigate()
    if(userDetails?.user_level !== 'super_admin') {
        navigate(`/admin`)
    }

    return (
        <>
            <PageAdminTitle pageTitle="Ads Manager" />
            <ComponentCard title="">
                <Outlet context={{adsBaseUrl: "/ads/"}} />
            </ComponentCard>
        </>
    )
}

export default AdsLayout