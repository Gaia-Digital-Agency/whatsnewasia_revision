// test
import React, {useEffect, useRef, useState} from "react"
import { Category } from "../../../types/category.type"
import { NavLink } from "react-router-dom"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
// import { Observer } from "gsap/Observer"
import NavLogo from "../../../components/front/NavLogo"
import NavLocation from "../../../components/front/NavLocation"
import { useTaxonomies } from "../../../context/TaxonomyContext"
import { RouteProps, useRoute } from "../../../context/RouteContext"
import { HamburgerIcon } from "../../../icons"
import MobileMenu from "../../../components/front/MobileMenu"
import SearchBar from "../../../components/front/SearchBar"
import { getTemplateByUrl } from "../../../services/template.service"
import { useHeaderContent } from "../../../context/HeaderContext"
import DropDownCountry from "../../../components/front/DropDownCountry"
import DropDownCity from "../../../components/front/DropDownCity"
import DropDownRegion from "../../../components/front/DropDownRegion"



const MenuNav: React.FC<{menu: Category, menus: Category[]}> = ({menu, menus}) => {
    const {taxonomies} = useTaxonomies()
    const {actualRoute} = useRoute()
    const menuRef = useRef<HTMLDivElement>(null)
    const generateTo = (url: string, actualRoute: RouteProps) => {
        if(actualRoute?.article) {
            return `/${actualRoute.country?.slug}/${url}`
        }
        return `${actualRoute.country ? `/${actualRoute.country.slug}` : ''}${actualRoute.city ? `/${actualRoute.city.slug}` : ''}${actualRoute.region ? `/${actualRoute.region.slug}` : ''}/${url}`
    }

    const {contextSafe} = useGSAP({scope: menuRef})

    const onMouseLeaveHandler = contextSafe((e: React.MouseEvent<HTMLAnchorElement>) => {
        if(e.currentTarget.classList.contains('is-active')) return
        gsap.to(e.target, {
            '--hover-width': '0%',
            '--hover-color': '#a07b4f',
            '--hover-text': '#000'
            // '--hover-translate': '50%'
        })
    })
    const onMouseEnterHandler = contextSafe((e: React.MouseEvent<HTMLAnchorElement>) => {
        if(e.currentTarget.classList.contains('is-active')) return
        gsap.to(e.currentTarget, {
            '--hover-width': '100%',
            '--hover-color': '#a07b4f',
            '--hover-text': '#a07b4f'
            // '--hover-translate': '0%'
        })
    })

    const isActive = () => {
        if(menu.id == actualRoute.category?.id) return true
        if(actualRoute.category?.id_parent && !menus.find(men => (actualRoute.category?.id == men.id))) return taxonomies.categories?.find(cat => (actualRoute.category?.id_parent == cat.id))?.id == menu.id
        return false
    }

    return (
        <>
        <div className="menu" ref={menuRef}>
            <NavLink key={menu.id} relative={'route'} onMouseLeave={onMouseLeaveHandler} onMouseEnter={onMouseEnterHandler} className={`menu-link text-front-nav-header font-medium flex-1 text-nowrap uppercase text-black${isActive() ? ' is-active' : ''}`} to={generateTo(menu.slug_title, actualRoute)}>{menu.title}</NavLink>
        </div>
        </>
    )
}

const Header: React.FC = () => {
    const {initialData} = useHeaderContent()
    const [isClient, setIsClient] = useState<boolean>(false)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [search, setStateSearch] = useState<string>('')
    const {taxonomies} = useTaxonomies()
    const [headerMenus, setHeaderMenus] = useState<any[]>(initialData?.header ?? [])
    const headerRef = useRef<HTMLDivElement>(null)
    const locationRef = useRef<HTMLDivElement>(null)
    const categoryRef = useRef<HTMLDivElement>(null)
    const arrowRef = useRef<HTMLDivElement>(null)
    const mobileMenuRef = useRef<HTMLDivElement>(null)
    const {actualRoute} = useRoute()
    useEffect(() => {
        if(!isClient) return
        const element = headerRef.current
        if(!element) return
        document.documentElement.style.setProperty('--nav-height', `${element.offsetHeight}px`)
        const observer = new ResizeObserver(() => {
            document.documentElement.style.setProperty('--nav-height', `${element.offsetHeight}px`)
        })

        return (
            observer.disconnect()
        )

    }, [isClient])

    useEffect(() => {
        setIsClient(true);
        // Fetch header template if not provided by SSR
        if (!headerMenus || headerMenus.length === 0) {
            (async() => {
                try {
                    const getTemplate = await getTemplateByUrl('/header')
                    if(getTemplate?.data && getTemplate.status_code == 200) {
                        const jsonData = JSON.parse(getTemplate.data.content)
                        setHeaderMenus(jsonData)
                    } else {
                        // Fallback: show all top-level categories
                        const fallbackMenus = taxonomies.categories?.filter(cat => !cat.id_parent)?.map(cat => ({
                            label: cat.title,
                            url: cat.slug_title,
                            linkCategory: cat.id
                        })) ?? []
                        setHeaderMenus(fallbackMenus)
                    }
                } catch(e) {
                    console.log('Error fetching header template:', e)
                    // Fallback: show all top-level categories
                    const fallbackMenus = taxonomies.categories?.filter(cat => !cat.id_parent)?.map(cat => ({
                        label: cat.title,
                        url: cat.slug_title,
                        linkCategory: cat.id
                    })) ?? []
                    setHeaderMenus(fallbackMenus)
                }
            })()
        }
    }, [taxonomies.categories])

    useEffect(() => {
        setIsModalOpen(false)
    }, [actualRoute])
    
    useEffect(() => {
        if(!isClient) return
        const catEl = categoryRef.current
        const parent = catEl?.parentElement
        if(!catEl || !parent) return
        const resize = () => {
            if(parent?.scrollWidth > catEl?.offsetWidth) {
                if(catEl.classList.contains('nav-scroll-overflow')) return
                catEl.classList.add('nav-scroll-overflow')
                parent.classList.add('parent-nav-scroll-overflow')
            }
        }
        const config = { attributes: true, childList: true, subtree: true };

        const mutationObserver = new MutationObserver(resize)
        resize()
        mutationObserver.observe(catEl, config)

        // const arrowEl = arrowRef.current
        // if(!arrowEl) return


        return () => {
            mutationObserver.disconnect()
        }

    }, [isClient])

    useEffect(() => {
        const arrowEl = arrowRef.current
        const catEl = categoryRef.current
        if(!arrowEl || !catEl) return
        const scrollStep = 180
        const scrollRight = () => {
            gsap.to(catEl, {
                scrollLeft: `+=${scrollStep}`
            })
        }
        arrowEl.addEventListener('click', scrollRight)

        return () => {
            arrowEl.removeEventListener('click', scrollRight)
        }

    }, [])

    useEffect(() => {
        if(!isClient) return
        const catEl = categoryRef.current
        if(!catEl) return
        catEl.querySelectorAll('.menu-link').forEach(el => {
            if(el.classList.contains('is-active')) return
            gsap.set(el, {
                '--hover-width': '0%',
                '--hover-color': '#a07b4f',
                '--hover-text': '#000'
                // '--hover-translate': '50%'
            })
        })
        if(mobileMenuRef.current) {
            gsap.set(mobileMenuRef.current, {
                xPercent: 100
            })
        }
    }, [actualRoute, isClient])

    useEffect(() => {
        const mobileMenuEl = mobileMenuRef.current
        if(!mobileMenuEl) return

        if(isModalOpen) {
            gsap.to(mobileMenuEl, {
                xPercent: 0
            })
        }
    }, [isModalOpen])

    const closeModal = () => {
        setIsModalOpen(false)
    }

    const setSearch = (val: string) => {
        setStateSearch(val)
    }

    const toNav = () => {
        return `/${actualRoute?.country ? actualRoute.country.slug : ''}${actualRoute?.city ? `/${actualRoute.city.slug}` : ''}${actualRoute?.region ? `/${actualRoute.region.slug}` : ''}`
    }

    return (
        <>
            <header className="relative top-0 left-0 right-0 z-[100] bg-white" ref={headerRef}>
                <div className="container mx-auto py-6 flex justify-between items-center">
                    <div className="logo-wrapper w-max flex gap-x-0 md:gap-x-[20px] lg:gap-x-0 items-center">
                        <NavLogo url="/logo-header" to={toNav()} />

                        <div className="dropdown-country hidden md:block lg:hidden">
                            <DropDownCountry />
                        </div>
                    </div>
                    <div className="icons-wrapper flex items-center gap-x-4">
                        <div className={`item flex-1 max-w-[320px] block ${actualRoute.country ? 'lg:hidden' : 'lg:block'}`}>
                            <SearchBar search={search} setSearch={setSearch} />
                        </div>
                        <div className="hamburger md:hidden block" onClick={() => {setIsModalOpen(true)}}>
                            <HamburgerIcon className="w-[32px] h-[32px]" />
                        </div>
                    </div>
                </div>
                <div className="line bg-black h-[1px] w-full"></div>


                <div className="location-wrapper nav-location-wrapper" ref={locationRef}>
                    <div className={`inner container justify-between items-center mx-auto py-4 lg:flex flex ${(actualRoute.country && taxonomies.cities?.filter(city => (city.id_parent == actualRoute.country?.id)).length) ? 'md:flex' : 'md:hidden'}`}>
                        <div className="flex md:hidden">
                            <DropDownCountry />
                        </div>
                        <div className="md:flex hidden lg:hidden gap-x-[20px]">
                            <DropDownCity />
                            <DropDownRegion />
                        </div>
                        <div className="item lg:flex hidden w-full">
                            <NavLocation />
                        </div>
                        <div className={`item flex-1 hidden max-w-[320px] ${actualRoute.country ? 'lg:block' : 'lg:hidden'}`}>
                            <SearchBar search={search} setSearch={setSearch} />
                        </div>
                    </div>

                    <div className="line bg-black h-[1px] w-full"></div>

                    <div className="inner container mx-auto py-4 nav-category-wrapper">
                        <div className="menus-wrapper flex justify-between items-center" ref={categoryRef}>
                            <div className="menus flex gap-x-4 md:gap-x-6">
                                {taxonomies.categories?.filter(cat => (headerMenus?.map((ca: any) => (ca.linkCategory))?.includes(cat.id)))?.map((menu: Category) => <MenuNav menu={menu} menus={headerMenus} key={`header-menu-${menu.id}`} />)}
                            </div>
                            <div className="arrow-wrapper">
                                <div className="arrow" ref={arrowRef}></div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="line bg-black h-[1px] w-full"></div>
                </div>

            </header>

            <MobileMenu isModalOpen={isModalOpen} closeModal={closeModal} />
        </>
    )
}

export const schema = {
    menus: [
        {label: '', url: ''}
    ]
}

export default Header