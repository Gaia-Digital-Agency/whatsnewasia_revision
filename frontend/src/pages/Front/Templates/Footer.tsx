import React from "react";
// import { getTemplateByUrl } from "../../../services/template.service";
import NavLogo from "../../../components/front/NavLogo";
import { Link } from "react-router";
import { FacebookIcon, InstagramIcon, LinkedinIcon } from "../../../icons";
import { useTaxonomies } from "../../../context/TaxonomyContext";


const Footer: React.FC = () => {
    // const [content, setContent] = useState()

    const {taxonomies} = useTaxonomies()
    const filteredCountries = {...taxonomies}.countries?.filter(coun => coun.id!=999)
    const filteredTax = {...taxonomies, countries: filteredCountries}

    // useEffect(() => {

    //     (async() => {
    //         const getTemplate = await getTemplateByUrl('/footer')
    //         if(getTemplate?.status_code == 200 && getTemplate.data?.content) {
    //             setContent(JSON.parse(getTemplate.data.content))
    //             // console.log(content)
    //         }
    //     })()

    // }, [])
    // if(content) {
    //     return 
    // }
    // if(!content) {
        return (
            <footer className="footer">
                <div className="container py-12">
                    <div className="grid grid-cols-12 md:gap-x-16 gap-y-10">
                        <div className="col-span-12 mb-8">
                            <div className="logo-wrapper max-w">
                                <NavLogo url="/logo-header" to="/"></NavLogo>
                            </div>
                        </div>
                        <div className="md:col-span-6 col-span-12">
                            <div className="text-wrapper">
                                <p className="text-front-body-big mb-8">
                                    Welcome to What’s New Indonesia, your ultimate guide to exploring the big cities of Indonesia. Whether you are an expat, local, or tourist, we are here to help you discover the best things to do, places to stay and dine, and how to live life to the fullest
                                </p>
                                <p className="text-front-body-big mb-8">
                                    GoWork Fatmawati Private Office #107<br />
                                    Jl. RS Fatmawati No 188 Blok A Cipete Jakarta Selatan 12420
                                </p>
                                <p className="text-front-body-big">
                                    Hp. <Link to={'tel:6281382502771'} target="_blank">+62813-8250-2771</Link> <br />
                                    Email. <Link to={'mailto:admin@whatsnewasia.com'} target="_blank">admin@whatsnewasia.com</Link>
                                </p>
                            </div>
                        </div>
                        <div className="md:col-span-3 col-span-12">
                            <div className="title-wrapper mb-2.5">
                                <p className="font-serif text-front-body-big">Website Links</p>
                            </div>
                            <div className="links-wrapper">
                                <div className="link mb-2">
                                    <Link to='/privacy-policy' className="text-front-body-big">Privacy Policy</Link>
                                </div>
                                <div className="link">
                                    <Link to='/privacy-policy' className="text-front-body-big">Term & Conditions</Link>
                                </div>
                            </div>
                        </div>
                        <div className="md:col-span-3 col-span-12">
                            <div className="title-wrapper mb-2.5">
                                <p className="font-serif text-front-body-big">Explore</p>
                            </div>
                            <div className="links-wrapper">
                                {
                                    filteredTax?.countries?.map((country, i) => {
                                        return (
                                            <div className={`link ${(i + 1) == filteredTax?.countries?.length ? '' : 'mb-2'}`} key={`footer-${country.slug}`}>
                                                <Link to={`/${country.slug}`} className="text-front-body-big">{country.name}</Link>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="outer py-5 bg-front-red">
                    <div className="container">
                        <div className="flex justify-between items-center">
                            <div className="item text-front-small text-white">© 2025 - What’s New Asia</div>
                            <div className="item flex gap-x-4">
                                <Link to={'#'} target="_blank">
                                    <FacebookIcon />
                                </Link>
                                <Link to={'#'} target="_blank">
                                    <InstagramIcon />
                                </Link>
                                <Link to={'#'} target="_blank">
                                    <LinkedinIcon />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        )
    // }
}

export default Footer