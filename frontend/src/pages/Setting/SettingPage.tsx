import React, { useEffect, useState } from "react";
import {
  getTemplateByUrl,
  editTemplateByUrl,
  createTemplate,
} from "../../services/template.service";
import ComponentCard from "../../components/common/ComponentCard";
import { AdminFeaturedImage } from "../../components/ui/featured-image/FeaturedImage";
import { AssetMedia } from "../../types/media.type";
import { useNavigationPrompt } from "../../hooks/useNavigationPrompt";
import Button from "../../components/ui/button/Button";
import { useNotification } from "../../context/NotificationContext";
import TextArea from "../../components/form/input/TextArea";
import Input from "../../components/form/input/InputField";
const API_URL = import.meta.env.VITE_WHATSNEW_BACKEND_URL;

type SettingsProps<T> = {
  content: T,
  url: string,
  isAvailable: boolean
  isChanged: boolean
}

const SettingPage: React.FC = () => {
  const defaultSettingProps = {
    isAvailable: false,
    isChanged: false
  }
  const { setNotification } = useNotification();
  const [logoImage, setLogoImage] = useState<SettingsProps<{ id: number; url: string }>>({
    content: {
      id: 0,
      url: "",
    },
    url: '/logo-header',
    ...defaultSettingProps
  });

  const [headScript, setHeadScript] = useState<SettingsProps<string>>({
    content: "",
    url: '/script/head',
    ...defaultSettingProps
  })
  const [preBodyScript, setPreBodyScript] = useState<SettingsProps<string>>({
    content: '',
    url: '/script/prebody',
    ...defaultSettingProps
  })
  const [postBodyScript, setPostBodyScript] = useState<SettingsProps<string>>({
    content: "",
    url: '/script/postbody',
    ...defaultSettingProps
  })
  
  const [googleAdsClientId, setGoogleAdsClientId] = useState<SettingsProps<string>>({
    content: "",
    url: '/ads/client-id',
    ...defaultSettingProps
  })

  const [googleAdsSlotHome, setGoogleAdsSlotHome] = useState<SettingsProps<string>>({
    content: "",
    url: '/ads/slot/home',
    ...defaultSettingProps
  })

  const [googleAdsSlotArticleSidebar, setGoogleAdsSlotArticleSidebar] = useState<SettingsProps<string>>({
    content: "",
    url: '/ads/slot/article/sidebar',
    ...defaultSettingProps
  })
  
  const { setBlock, isDirty } = useNavigationPrompt();
  useEffect(() => {
    (() => {
      const getTemplate = async (state: SettingsProps<any>, setState: React.Dispatch<React.SetStateAction<SettingsProps<any>>>) => {
        const get = await getTemplateByUrl(state.url)
        if(get?.status_code == 200 && get.data) {
          const data = JSON.parse(get.data.content)
          setState(prev => ({...prev, content: data, isAvailable: true}))
        }
      }

      getTemplate(logoImage, setLogoImage)
      getTemplate(headScript, setHeadScript)
      getTemplate(preBodyScript, setPreBodyScript)
      getTemplate(postBodyScript, setPostBodyScript)
      getTemplate(googleAdsClientId, setGoogleAdsClientId)
      getTemplate(googleAdsSlotHome, setGoogleAdsSlotHome)
      getTemplate(googleAdsSlotArticleSidebar, setGoogleAdsSlotArticleSidebar)
    })();
  }, []);

  const saveLogoImageHandler = (file: AssetMedia) => {
    setLogoImage(prev => ({...prev, content: { id: file.id, url: file.path }}));
    setBlock(true);
  };

  const failedSave = (message: string = "Unexpected Error") => {
    setNotification({ message: message, type: "fail", isClosed: false });
    return false;
  };
  const successSave = (message: string = "successfully change logo header") => {
    setNotification({ message: message, type: "neutral", isClosed: false });
    setBlock(false);
    return true;
  };

  const saveSettingHandler = async (state: SettingsProps<any>, message: string = 'Setting succesfully saved') => {
    try {
      if(state.isAvailable) {
        if(!state.isChanged) return
        const edit = await editTemplateByUrl(
          state.url,
          "Script",
          JSON.stringify(state.content)
        )
        if(edit) return successSave(message)
        return failedSave()
      } else {
        const create = await createTemplate(
          state.url,
          "Script",
          JSON.stringify(state.content)
        )
        if(create) return successSave(message)
        return failedSave()
      }
    } catch (e) {
      console.error(e)
      return failedSave()
    }
  };

  const saveLogoHandler = async () => {
    saveSettingHandler(logoImage)
  }

  const saveScripts = async () => {
    saveSettingHandler(headScript)
    saveSettingHandler(preBodyScript)
    saveSettingHandler(postBodyScript)
  }


  const saveAds = async () => {
    saveSettingHandler(googleAdsClientId)
    saveSettingHandler(googleAdsSlotHome)
    saveSettingHandler(googleAdsSlotArticleSidebar)
  }

  return (
    <>
      <div className="grid grid-cols-12 justify-center">
        <div className="col-span-12">
          <ComponentCard title="Logo Image">
            <div>
              <AdminFeaturedImage
                width="600px"
                fit="contain"
                url={`${API_URL}/${logoImage.content.url}`}
                onSave={saveLogoImageHandler}
                
                // ratio="16/9"
              />
            </div>
            <Button onClick={saveLogoHandler}>Save Logo</Button>
          </ComponentCard>
          <br />
          <ComponentCard title="Additional Scripts">
            <>
            <p>Insert scripts inside {'<head>'} tag</p>
              <TextArea placeholder="<script>" value={headScript.content} onChange={e => {setHeadScript(prev => ({...prev, content: e, isChanged: true})); setBlock(true)}}>

              </TextArea>
            </>
            <div className="spacer py-8"></div>
            <>
            <p>Insert scripts right after {'<body>'} tag</p>
              <TextArea placeholder="<script>" value={preBodyScript.content} onChange={e => {setPreBodyScript(prev => ({...prev, content: e, isChanged: true})); setBlock(true)}}>

              </TextArea>
            </>
            <div className="spacer py-8"></div>
            <>
            <p>Insert scripts right before closing {'</body>'} tag</p>
              <TextArea placeholder="<script>" value={postBodyScript.content} onChange={e => {setPostBodyScript(prev => ({...prev, content: e, isChanged: true})); setBlock(true)}}>

              </TextArea>
            </>
            <div className="spacer py-8"></div>
            <Button onClick={saveScripts}>Save Scripts</Button>
          </ComponentCard>
          <br />
          <ComponentCard title="Google Ads">
            <p>
              Google Ads Client id
            </p>
            <div className="max-w-[600px]">
              <Input placeholder={"ca-pub-XXXXXXXXXXXXXXXX"} onChange={e => {setGoogleAdsClientId(prev => ({...prev, content: e.target.value, isChanged: true})); setBlock(true)}} value={googleAdsClientId.content}></Input>
            </div>
            <div className="spacer py-3"></div>
            <p>
              Google Ads Slots Home
            </p>
            <div className="max-w-[600px]">
              <Input placeholder={"123456789"} onChange={e => {setGoogleAdsSlotHome(prev => ({...prev, content: e.target.value, isChanged: true})); setBlock(true)}} value={googleAdsSlotHome.content}></Input>
            </div>
            <div className="spacer py-3"></div>
            <p>
              Google Ads Slots Article Sidebar
            </p>
            <div className="max-w-[600px]">
              <Input placeholder={"123456789"} onChange={e => {setGoogleAdsSlotArticleSidebar(prev => ({...prev, content: e.target.value, isChanged: true})); setBlock(true)}} value={googleAdsSlotArticleSidebar.content}></Input>
            </div>
            <Button onClick={saveAds}>Save Scripts</Button>
          </ComponentCard>
        </div>
      </div>
      <div className="fixed bottom-6 right-6">
        {isDirty && <Button onClick={() => {}}>Save all settings</Button>}
      </div>
    </>
  );
};

export default SettingPage;
