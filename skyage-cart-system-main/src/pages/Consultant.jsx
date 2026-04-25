import { useState } from "react"
import { submitConsultantRequest } from "../services/API"
import ConsultantAside from "../components/ConsultantAside"

export default function Consultant() {

  const [name, setName] = useState("")
  const [productService, setProductService] = useState("")
  const [mobile, setMobile] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    setLoading(true)
    setStatus(null)

    try {
      await submitConsultantRequest({
        person_name: name,
        product_service: productService,
        mobile_number: mobile,
        email: email,
        message: message
      })

      
      alert("Request Sent Successfully ")

      setStatus({ ok: true })

      // clear form
      setName("")
      setProductService("")
      setMobile("")
      setEmail("")
      setMessage("")

      setTimeout(() => setStatus(null), 3000)

    } catch (err) {

      const errorMsg = err.message || "Something went wrong "

      alert(errorMsg)

      setStatus({ ok: false, error: errorMsg })

      setTimeout(() => setStatus(null), 3000)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="container mx-auto px-4 py-8">

      <h1 className="text-2xl font-semibold mb-2">
         Consultant Services
      </h1>

      <p className="text-gray-600 mb-6">
        Tell us about your needs and we'll follow up.
      </p>

      <div className="flex flex-col md:flex-row gap-6">

        {/* FORM */}
        <form onSubmit={handleSubmit} className="w-full md:w-1/2 bg-white p-6 rounded shadow space-y-4">

          <div>
            <label className="block text-sm font-medium">Person Name</label>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              className="mt-1 w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Product/Service</label>
            <input
              value={productService}
              onChange={e => setProductService(e.target.value)}
              className="mt-1 w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block text-sm font-medium">Mobile Number</label>
              <input
                value={mobile}
                onChange={e => setMobile(e.target.value)}
                type="tel"
                className="mt-1 w-full border rounded px-3 py-2"
                required
              />
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium">Email</label>
              <input
                value={email}
                onChange={e => setEmail(e.target.value)}
                type="email"
                className="mt-1 w-full border rounded px-3 py-2"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Message</label>
            <textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              className="mt-1 w-full border rounded px-3 py-2"
              rows={4}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-[#147E9E] text-white px-4 py-2 rounded w-full hover:bg-[#126b86]"
          >
            {loading ? "Sending..." : "Send Request"}
          </button>

        </form>

        <ConsultantAside />

      </div>

      {status && !status.ok && (
        <div className="fixed top-5 right-5 bg-red-500 text-white px-4 py-3 rounded shadow-lg">
          {status.error}
        </div>
      )}

    </main>
  )
}