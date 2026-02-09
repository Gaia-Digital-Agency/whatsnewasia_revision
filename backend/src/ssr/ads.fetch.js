import { fetchTemplateRoute } from "./templates.fetch.js"

export async function getInitialAdsSlot() {
    // const homeSlot = await templateService.getTemplateByQuery({query:{ url: '/ads/slot/home'}})
    // const articleSidebarSlot = await templateService.getTemplateByQuery({query:{ url: '/ads/slot/article/sidebar'}})
    // const getClientId = await templateService.getTemplateByQuery({query:{ url: '/ads/client-id'}})
    const homeSlot = await fetchTemplateRoute('/ads/slot/home')
    const articleSidebarSlot = await fetchTemplateRoute('/ads/slot/article/sidebar')
    const clientid = await fetchTemplateRoute('/ads/client-id')
    const slot = {
        home: homeSlot ?? 0,
        article: {
            sidebar: articleSidebarSlot ?? 0
        }
    }

    console.log({clientid, slot})

    return {clientid, slot}
}