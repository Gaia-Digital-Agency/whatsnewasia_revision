import React, {useEffect, useState} from "react"
import { ArticleProps } from "../../types/article.type"
import Image from "./Image"
import Button from "./Button"
import { Link } from "react-router"
import { useRoute } from "../../context/RouteContext"
import { useTaxonomies } from "../../context/TaxonomyContext"
import useArticle from "../../hooks/useArticle"
import { PreContentProps, ComponentTemplateHomeProps } from "../../types/template.type"
import { Spacer } from "../../pages/Front/Templates/Home"

const Overseas: React.FC<ComponentTemplateHomeProps> = ({preContent = []}) => {
    const {actualRoute, clientChange} = useRoute()
    const {taxonomies, getCategoryById} = useTaxonomies()
    // const {locations} = useOutletContext<LocationsContextProps>()
    // const {availableCategories} = useOutletContext<AvailableCategoriesProps>()
    const CATEGORY_SLUGS = ['experience', 'ultimate-guide', 'featured']
    const {generateContent, getPermalink, getFeaturedImageUrl} = useArticle()

    const [content, setContent] = useState<PreContentProps>(preContent)


    const findCategory = (article: ArticleProps) => {
        return getCategoryById(article.category_id)
    }
    useEffect(() => {
        if(!clientChange) return
        (async () => {
            try {
                const filterCountry = taxonomies?.countries?.filter(country => (actualRoute?.country?.id != country.id)).map(country => (country.id))
                const get = await generateContent({
                    content: preContent,
                    query: {
                        id_country: filterCountry,
                        limit: 8,
                        category: taxonomies.categories?.filter(item => CATEGORY_SLUGS.includes(item.slug_title)).map(cat => (cat.id))
                    }
                })
                if(get) {
                    setContent(get)
                }
                // if(content.length) return
                // if(!clientChange) return
                // const getArticle = await getArticleByFields({
                //     id_country: filterCountry,
                //     limit: 8,
                //     category: taxonomies.categories?.filter(item => CATEGORY_SLUGS.includes(item.slug_title)).map(cat => (cat.id))
                // })
                // if(getArticle?.articles) {
                //     setContent(getArticle.articles)
                //     return
                // }
            } catch (e) {
                console.log(e)
            }
        })()
    }, [actualRoute, preContent, clientChange])

    return (
        <>
            {
                !!content.filter(Boolean).length &&
                    <>
                        <Spacer />
                        <section id="overseas">
                            <div className="container">
                                <div className="title-wrapper text-center mb-8">
                                    <p className="text-front-section-title font-serif font-semibold"><span className="text-front-red">Overseas</span> News</p>
                                </div>
                                <div className="grid grid-cols-12 md:gap-x-10 gap-y-10 gap-x-6 md:mb-10 mb-12 overflow-x-hidden">
                                    {
                                        content?.map((article) => {
                                            if(article) {
                                                return (
                                                    <>
                                                        <div className={`md:col-span-6 lg:col-span-3 col-span-12 line-right-5 relative`}>
                                                            <div className="image-wrapper mb-5">
                                                                <Image url={getFeaturedImageUrl(article)} ratio="100%" mobileRatio="125%" link={getPermalink(article)} alt={article?.featured_image_alt} />
                                                            </div>
                                                            <div className="category-wrapper mb-2">
                                                                <p className="text-front-grey">{findCategory(article)?.title}</p>
                                                            </div>
                                                            <div className="title-wrapper">
                                                                <Link to={getPermalink(article)}>
                                                                    <p className="text-front-title text-front-grey font-serif">{article.title}</p>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </>
                                                )
                                            }
                                        })
                                    }
                                </div>
                                <div className="button-wrapper text-center">
                                    <Button text="VIEW ALL" link={`${actualRoute?.country ? `/${actualRoute.country.slug}` : ''}${actualRoute?.city ? `/${actualRoute.city.slug}` : ''}${actualRoute?.region ? `/${actualRoute.region.slug}` : ''}/overseas`} />
                                </div>
                            </div>
                        </section>
                        <Spacer />
                    </>
            }
        </>
    )
}

export const AdminOverseas: React.FC<ComponentTemplateHomeProps> = ({preContent}) => {
    const [content, setContent] = useState<PreContentProps>([])
    const {generateContent} = useArticle()
    useEffect(() => {
        (async () => {
            const get = await generateContent({
                content: preContent,
                admin: true
            })
            if(get) {
                setContent(content)
            }
        })()
    }, [preContent])
    if(content.length) {
        return <Overseas preContent={content} admin={true} />
    }
}

export default Overseas