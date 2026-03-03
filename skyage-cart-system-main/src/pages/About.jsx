import { useLanguage } from '../contexts/LanguageProvider'

export default function About(){
  const { t } = useLanguage()
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">{t('aboutTitle')}</h1>
      <p className="text-gray-700">{t('aboutText')}</p>
    </main>
  )
}
