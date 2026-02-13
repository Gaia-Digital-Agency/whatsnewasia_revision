import { useEffect, useState, useRef } from "react"
import TextArea from "../form/input/TextArea"
import Button from "../front/Button"
import { createTemplate, editTemplateByUrl, getTemplateByUrl } from "../../services/template.service"
import { TemplateType } from "../../types/template.type"
import { useNavigationPrompt } from "../../hooks/useNavigationPrompt"
import { useNotification } from "../../context/NotificationContext"

type AdsSlotProps = {
    url: string
    title: string,
}

const AdsSlot: React.FC<AdsSlotProps> = ({url, title}) => {
    const [value, setValue] = useState<string>()
    const isAvailable = useRef<boolean>(false)
    const {setBlock} = useNavigationPrompt()
    const {setNotification} = useNotification()

    useEffect(() => {
        (async() => {
            const getTemplate = await getTemplateByUrl(url)
            if(getTemplate?.status_code == 200 && getTemplate.data?.content) {
                setValue(getTemplate.data.content)
                isAvailable.current = true
            }
        })();
    }, [])

    const saveCallback = async (cb: (url: string, template: TemplateType, content: string) => void) => {
        if(!value) return
        try {
            await cb(url, 'Script', value)
            setBlock(false)
            setNotification({message: "success saved " + title, type: "neutral"})
        } catch(e) {
            console.log(e)
        }
    }

    const saveHandler = () => {
        if(isAvailable) return saveCallback(editTemplateByUrl)
        return saveCallback(createTemplate)
    }

    const changeHandler = (e: string) => {
        setValue(e)
        setBlock(true)
    }
    
    return (
        <>
            {title}
            <div className="spacer py-1"></div>
            <TextArea value={value} placeholder="<script>" onChange={changeHandler} />
            <Button onClick={saveHandler} text="Save"></Button>
        </>
    )

}

export default AdsSlot