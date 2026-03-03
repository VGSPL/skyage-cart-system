import { createContext, useContext, useEffect, useState } from 'react'
import translations from '../i18n/translations'

const LanguageContext = createContext()

export function LanguageProvider({ children }){
  const defaultLang = (localStorage.getItem('ama-lang') || navigator.language || 'en').slice(0,2)
  const [lang, setLang] = useState(defaultLang in translations ? defaultLang : 'en')

  useEffect(()=>{
    localStorage.setItem('ama-lang', lang)
  },[lang])

  function t(key){
    return translations[lang] && translations[lang][key] ? translations[lang][key] : translations['en'][key] || key
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage(){
  return useContext(LanguageContext)
}
