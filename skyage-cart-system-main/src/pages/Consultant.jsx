import { useState } from 'react'
import { submitConsultantRequest } from '../services/API'
import { useLanguage } from '../contexts/LanguageProvider'
import ConsultantAside from '../components/ConsultantAside'

export default function Consultant() {
  const { t } = useLanguage()
  const [name, setName] = useState('')
  const [productService, setProductService] = useState('')
  const [mobile, setMobile] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await submitConsultantRequest({ name, productService, mobile, email, message })
      setStatus({ ok: true, id: res.id })
      // Clear form
      setName('')
      setProductService('')
      setMobile('')
      setEmail('')
      setMessage('')
    } catch (err) {
      setStatus({ ok: false, error: err.message })
    }
  }

  return (
    <main className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
      <h1 className="text-xs sm:text-lg md:text-2xl font-semibold mb-2 sm:mb-4">{t('consultantTitle')}</h1>
      <p className="mb-3 sm:mb-4 text-xs sm:text-sm md:text-base text-gray-600">{t('consultantText')}</p>

      <div className="flex flex-col md:flex-row items-stretch gap-0">
        <form
          onSubmit={handleSubmit}
          className="w-full md:w-1/2 bg-white p-3 sm:p-6 rounded shadow space-y-3 sm:space-y-4"
        >
          <h2
            style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(14px, 4vw, 26px)', fontWeight: 600 }}
            className="mb-4 sm:mb-6"
          >
            TELL US YOUR REQUIREMENT
          </h2>

          <div>
            <label className="block text-xs sm:text-sm font-medium">{t('name')}</label>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              className="mt-1 block w-full border rounded px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium">Enter Product/Service Name</label>
            <input
              value={productService}
              onChange={e => setProductService(e.target.value)}
              className="mt-1 block w-full border rounded px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm"
              required
            />
          </div>

          <div className="flex gap-2 sm:gap-3">
            <div className="flex-1">
              <label className="block text-xs sm:text-sm font-medium">{t('mobileNumber')}</label>
              <input
                value={mobile}
                onChange={e => setMobile(e.target.value)}
                type="tel"
                className="mt-1 block w-full border rounded px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs sm:text-sm font-medium">{t('email')}</label>
              <input
                value={email}
                onChange={e => setEmail(e.target.value)}
                type="email"
                className="mt-1 block w-full border rounded px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium">{t('message')}</label>
            <textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              className="mt-1 block w-full border rounded px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm"
              rows={5}
              required
            />
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="submit"
              className="bg-[#147E9E] text-white px-3 sm:px-4 py-1 sm:py-2 rounded text-xs sm:text-sm"
            >
              {t('sendRequest')}
            </button>

            {status === 'loading' && <span className="text-xs sm:text-sm">{t('sending')}</span>}
            {status && typeof status === 'object' && status.ok && (
              <span className="text-green-600 text-xs sm:text-sm">
                {t('sent')} (id: {status.id})
              </span>
            )}
            {status && typeof status === 'object' && !status.ok && (
              <span className="text-red-600 text-xs sm:text-sm">
                {t('errorPrefix')} {status.error}
              </span>
            )}
          </div>
        </form>

        <ConsultantAside />
      </div>
    </main>
  )
}