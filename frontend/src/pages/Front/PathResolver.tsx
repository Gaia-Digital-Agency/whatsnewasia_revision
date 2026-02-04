// import React, { useEffect, useState, useRef } from "react";
// import { CountryProps, CityProps, RegionProps, TaxonomyProps, useTaxonomies } from "../../context/TaxonomyContext";
// import { Category } from "../../types/category.type";
// import HomeTemplate from "./Templates/Home";
// import { useRoute } from "../../context/RouteContext";
// import Single from "./Templates/Single";
// import Deals from "./Templates/Deals";
// import JobListing from "./Templates/JobListing";
// import Directory from "./Templates/Directory";
// import Events from "./Templates/Events";
// import SingleJob from "./Templates/SingleJob";
// import SingleEvent from "./Templates/SingleEvent";
// import NotFound from "../OtherPage/NotFound";
// import { useParams } from "react-router";
// import { getArticleBySlug } from "../../services/article.service";
// import Housing from "./Templates/Housing";
// import Search from "./Templates/Search";
// import Overseas from "./Templates/Overseas";

// export type ParamsProps = {
//   country: CountryProps | undefined,
//   city: CityProps | undefined,
//   region: RegionProps | undefined,
//   category: Category | undefined
// }

// const checkForIndonesia = (listingParams: ParamsProps) => {
//   if(listingParams.country?.slug === 'indonesia') {
//     window.location.replace('https://whatsnewindonesia.com')
//   }
// }

// const parseListingParams = (slugs: string[], taxonomies: TaxonomyProps) => {
//     const params = { country: undefined, city: undefined, region: undefined, category: undefined } as ParamsProps;
//     slugs.forEach(slug => {
//       const findCountry = taxonomies?.countries?.find((tax: CountryProps) => (tax.slug == slug))
//       const findCity = taxonomies?.cities?.find((tax: CityProps) => (tax.slug == slug))
//       const findRegion = taxonomies?.regions?.find((tax: RegionProps) => (tax.slug == slug))
//       const findCategory = taxonomies?.categories?.find((tax: Category) => (tax.slug_title == slug))
//       if (findCountry) params.country = findCountry
//       else if (findCity) params.city = findCity
//       else if (findRegion) params.region = findRegion
//       else if (findCategory) params.category = findCategory
//     });
//     return params;
// };


// const fetchRouteData = async (url: string, taxonomies: TaxonomyProps) => {

//   const checkArticleStatus = async (slug: string) => {
//     const getArticle = await getArticleBySlug(slug)
//     if(getArticle) {
//       // const theCategory = taxonomies.categories?.find(cat => cat.id == getArticle.category_id)
//       return {article: getArticle, isArticle: true, category: taxonomies.categories?.find((cat: Category) => (cat.id == getArticle.category_id))?.slug_title}
//     }
//     return {isArticle: false, category: null};
//   }
//   const slugs = url ? url.split('/').filter(Boolean) : [];

//   if (slugs.length === 0) {
//     return({ type: 'HOME', listingParams: {country: undefined, city: undefined, region: undefined, category: undefined, article: undefined} });
//   }

//   const lastSlug = slugs[slugs.length - 1];
//   return checkArticleStatus(lastSlug).then(articleStatus => {
    
//     const listingSlugs = articleStatus.isArticle ? slugs.slice(0, -1) : slugs;
//     const listingParams = parseListingParams(listingSlugs, taxonomies);
//     checkForIndonesia(listingParams)
//     if (articleStatus.isArticle) {
//       if (articleStatus.category === 'job-listing') {
//         return{
//           type: 'ARTICLE_JOB',
//           listingParams: {...listingParams, article: articleStatus.article},
//           articleSlug: lastSlug,
//         };
//       } else if (articleStatus.category === 'events') {
//         return{
//           type: 'ARTICLE_EVENT',
//           listingParams: {...listingParams, article: articleStatus.article},
//           articleSlug: lastSlug
//         }
//       } else {
//         return{
//           type: 'ARTICLE_PAGE',
//           articleSlug: lastSlug,
//           listingParams: {...listingParams, article: articleStatus.article}
//         };
//       }
//     } else {
//       const listParam = {...listingParams, article: undefined}
//       if(lastSlug == 'trending') {
//         return{
//           type: 'LISTING_TRENDINGS',
//           listingParams: listParam,
//         }
//       } else if (lastSlug == 'overseas') {
//         return {
//           type: 'LISTING_OVERSEAS',
//           listingParams: listParam
//         }
//       } else if (lastSlug == 'search') {
//         return {
//           type: 'LISTING_SEARCH',
//           listingParams: listParam
//         }
//       } else if (listingParams?.category?.slug_title == 'events') {
//         return{
//           type: 'LISTING_EVENTS',
//           listingParams: listParam
//         }
//       } else if (listingParams?.category?.slug_title == 'job-listing') {
//         return{
//           type: 'LISTING_JOBS',
//           listingParams: listParam
//         }
//       } else if (listingParams?.category?.slug_title == 'deals') {
//         return{
//           type: 'LISTING_DEALS',
//           listingParams: listParam
//         }
//       } else if (listingParams?.category?.slug_title == 'housing') {
//         return{
//           type: 'LISTING_HOUSING',
//           listingParams: listParam
//         }
//       } else if (listingParams?.category) {
//         return{
//           type: "LISTING_CATEGORIES",
//           listingParams: listParam
//         }
//       } else if(!listingParams.country && !listingParams.city && !listingParams.region && !listingParams.category) {
        
//         return {
//           type: "NOT_FOUND",
//           listingParams: {...listingParams, article: undefined},
//         }
//       }
//       else {
//         return{
//           type: 'LISTING_HOME',
//           listingParams: listParam,
//         };
//       }
//     }
//   });

// }



// const PathResolver: React.FC = () => {
//   const {routeType, setRouteType, setActualRoute, actualRoute, setClientChange, clientChange} = useRoute()
//   const [renderState, setRenderState] = useState<any>({type: routeType ?? 'LOADING', listingParams: actualRoute ?? {country: undefined, city: undefined, region: undefined, category: undefined, article: undefined}})
//   const prevParams = useRef<any>(null)
//   // const firstRender = useRef<boolean>(true)
//   const params = useParams()
//   const url = params['*']
//   const {taxonomies} = useTaxonomies()

//   useEffect(() => {
//     if(!clientChange) return
//     if(renderState.listingParams) {
//       setActualRoute(renderState.listingParams)
//     }
//     if(renderState.type) {
//       setRouteType(renderState.type)
//     }
//   }, [renderState])

//   useEffect(() => {
//     // if(firstRender.current) {
//     //   firstRender.current = false
//     //   return
//     // }
//     // setClientChange(true)

//     if(prevParams.current == null) {
//       prevParams.current = params
//       return
//     }

//     if(prevParams.current['*'] !== params['*']) {
//       setClientChange(true)
//     }
//   }, [params])


//   useEffect(() => {
//     if(!clientChange) return;
//     (async () => {
//       const render = await fetchRouteData(url ?? '', taxonomies)
//       setRenderState(render)
//     })()
//   }, [params, clientChange])



//   switch (routeType) {
//     case "ARTICLE_JOB" :
//       return <JobListing key='single-job'><SingleJob /></JobListing>
//     case "ARTICLE_EVENT":
//       return <SingleEvent key='single-event' />
//     case "ARTICLE_PAGE":
//       return <Single key='single-article' />
//     case "LISTING_JOBS":
//       return <JobListing key='job-listing' />
//     case "LISTING_SEARCH": 
//       return <Search key='search' />
//     case "LISTING_TRENDINGS":
//       return <Directory key='trending' isTrending={true} />
//     case "LISTING_OVERSEAS":
//       return <Overseas key="overseas" />
//     case "LISTING_EVENTS":
//       return <Events key='events' />
//     case "LISTING_DEALS":
//       return <Deals key='deals' />
//     case "LISTING_CATEGORIES":
//       return <Directory key={`category-${renderState.listingParams.category}`} />
//     case "LISTING_HOUSING":
//       return <Housing key="housing" />
//     case "LISTING_HOME":
//     case "HOME":
//       return <HomeTemplate key={`home`} />
//     case "LOADING":
//       return
//     case "UNKNOWN":
//     default:
//       return <NotFound />
//   }
// }

// export default PathResolver;


import React, { useEffect, useState, useRef, lazy, Suspense } from "react"
import { CountryProps, CityProps, RegionProps, TaxonomyProps, useTaxonomies } from "../../context/TaxonomyContext"
import { Category } from "../../types/category.type"
// import HomeTemplate from "./Templates/Home"
// import Single from "./Templates/Single"
// import Deals from "./Templates/Deals"
// import JobListing from "./Templates/JobListing"
// import Directory from "./Templates/Directory"
// import Events from "./Templates/Events"
// import SingleJob from "./Templates/SingleJob"
// import SingleEvent from "./Templates/SingleEvent"
// import NotFound from "../OtherPage/NotFound"
// import Housing from "./Templates/Housing"
// import Search from "./Templates/Search"
// import Overseas from "./Templates/Overseas"
const HomeTemplate = lazy(() => import('./Templates/Home'))
const Single = lazy(() => import('./Templates/Single'))
const Deals = lazy(() => import('./Templates/Deals'))
const JobListing = lazy(() => import("./Templates/JobListing"))
const Directory = lazy(() => import('./Templates/Directory'))
const Events = lazy(() => import('./Templates/Events'))
const SingleJob = lazy(() => import('./Templates/SingleJob'))
const SingleEvent = lazy(() => import('./Templates/SingleEvent'))
const NotFound = lazy(() => import('../OtherPage/NotFound'))
const Housing = lazy(() => import('./Templates/Housing'))
const Search = lazy(() => import('./Templates/Search'))
const Overseas = lazy(() => import('./Templates/Overseas'))
import { useRoute } from "../../context/RouteContext"
import { useParams } from "react-router"
import { getArticleBySlug } from "../../services/article.service"
import { useAuth, UserDetailsProps } from "../../context/AuthContext"

export type ParamsProps = {
    country: CountryProps | undefined
    city: CityProps | undefined
    region: RegionProps | undefined
    category: Category | undefined
    article?: any
}

// Disabled Indonesia redirect - now behaves like other countries
// const checkIndonesia = (p: ParamsProps, userDetails: UserDetailsProps) => {
//     if (p.country?.slug === "indonesia") {
//         console.log(userDetails, 'from check indo')
//         if(userDetails) return;
//         window.location.replace("https://whatsnewindonesia.com")
//     }
// }

const parseParams = (slugs: string[], tax: TaxonomyProps) => {
    const p = { country: undefined, city: undefined, region: undefined, category: undefined } as ParamsProps
    slugs.forEach(s => {
        const c = tax.countries?.find(x => x.slug == s)
        const ct = tax.cities?.find(x => x.slug == s)
        const r = tax.regions?.find(x => x.slug == s)
        const cat = tax.categories?.find((x: Category) => x.slug_title == s)
        if (c) p.country = c
        else if (ct) p.city = ct
        else if (r) p.region = r
        else if (cat) p.category = cat
    })
    return p
}

const resolveRoute = async (path: string, tax: TaxonomyProps, _userDetails: UserDetailsProps) => {
    const slugs = path ? path.split("/").filter(Boolean) : []
    if (slugs.length === 0) {
        return { type: "HOME", listingParams: { country: undefined, city: undefined, region: undefined, category: undefined } }
    }

    const last = slugs[slugs.length - 1]
    const art = await getArticleBySlug(last)
    if (art) {
        const cat = tax.categories?.find((x: Category) => x.id == art.category_id)
        const listing = parseParams(slugs.slice(0, -1), tax)
        // checkIndonesia(listing, userDetails)
        if (cat?.slug_title === "job-listing") {
            return { type: "ARTICLE_JOB", listingParams: { ...listing, article: art }, articleSlug: last }
        }
        if (cat?.slug_title === "events") {
            return { type: "ARTICLE_EVENT", listingParams: { ...listing, article: art }, articleSlug: last }
        }
        return { type: "ARTICLE_PAGE", listingParams: { ...listing, article: art }, articleSlug: last }
    }

    const listing = parseParams(slugs, tax)
    // checkIndonesia(listing, userDetails)
    const lp = { ...listing, article: undefined }

    if (last === "trending") return { type: "LISTING_TRENDINGS", listingParams: lp }
    if (last === "overseas") return { type: "LISTING_OVERSEAS", listingParams: lp }
    if (last === "search") return { type: "LISTING_SEARCH", listingParams: lp }
    if (listing.category?.slug_title === "events") return { type: "LISTING_EVENTS", listingParams: lp }
    if (listing.category?.slug_title === "job-listing") return { type: "LISTING_JOBS", listingParams: lp }
    if (listing.category?.slug_title === "deals") return { type: "LISTING_DEALS", listingParams: lp }
    if (listing.category?.slug_title === "housing") return { type: "LISTING_HOUSING", listingParams: lp }
    if (listing.category) return { type: "LISTING_CATEGORIES", listingParams: lp }
    if (!listing.country && !listing.city && !listing.region && !listing.category) return { type: "NOT_FOUND", listingParams: lp }

    return { type: "LISTING_HOME", listingParams: lp }
}

const PathResolver: React.FC = () => {
    const { routeType, setRouteType, setActualRoute, actualRoute, setClientChange, clientChange } = useRoute()
    const [renderState, setRenderState] = useState({ type: routeType, listingParams: actualRoute })
    const [firstRender, setFirstRender] = useState<boolean>(true)
    const prevParams = useRef<any>(null)
    // const firstRender = useRef(true)
    const params = useParams()
    const path = params["*"]
    const { taxonomies } = useTaxonomies()
    const {userDetails} = useAuth()

    useEffect(() => {
        prevParams.current = params
    }, [])
    useEffect(() => {
        // if (firstRender) {
            
        // //     // firstRender.current = false
        // //     // Trigger initial route resolution when no SSR data
        // //     // if (routeType === 'LOADING' || !routeType) {
        // //     //     setClientChange(true)
        // //     // }
        // //     // return
        // }
        if (prevParams.current["*"] !== params["*"]) {
            prevParams.current = params
            setFirstRender(false)
            // setClientChange(true)
        }
    }, [params])

    useEffect(() => {
        if(firstRender) return
        setClientChange(true)
    }, [firstRender])

    useEffect(() => {
        if (!clientChange) return
        ;(async () => {
          const r = await resolveRoute(path ?? "", taxonomies, userDetails)
            setRenderState(r)
            setRouteType(r.type)
            setActualRoute(r.listingParams)
        })()
    }, [clientChange, params])

    switch (routeType) {
        case "ARTICLE_JOB":
            return <Suspense fallback={<></>}><JobListing key="single-job"><SingleJob /></JobListing></Suspense>
        case "ARTICLE_EVENT":
            return <Suspense fallback={<></>}><SingleEvent key="single-event" /></Suspense>
        case "ARTICLE_PAGE":
            return <Suspense fallback={<></>}><Single key="single-article" /></Suspense>
        case "LISTING_JOBS":
            return <Suspense fallback={<></>}><JobListing key="job-listing" /></Suspense>
        case "LISTING_SEARCH":
            return <Suspense fallback={<></>}><Search key="search" /></Suspense>
        case "LISTING_TRENDINGS":
            return <Suspense fallback={<></>}><Directory key="trending" isTrending /></Suspense>
        case "LISTING_OVERSEAS":
            return <Suspense fallback={<></>}><Overseas key="overseas" /></Suspense>
        case "LISTING_EVENTS":
            return <Suspense fallback={<></>}><Events key="events" /></Suspense>
        case "LISTING_DEALS":
            return <Suspense fallback={<></>}><Deals key="deals" /></Suspense>
        case "LISTING_CATEGORIES":
            return <Suspense fallback={<></>}><Directory key={`cat-${renderState.listingParams.category?.slug_title}`} /></Suspense>
        case "LISTING_HOUSING":
            return <Suspense fallback={<></>}><Housing key="housing" /></Suspense>
        case "LISTING_HOME":
        case "HOME":
            return <Suspense fallback={<></>}><HomeTemplate key="home" /></Suspense>
        case "LOADING":
            return null
        default:
            return <Suspense fallback={<></>}><NotFound /></Suspense>
    }
}

export default PathResolver
