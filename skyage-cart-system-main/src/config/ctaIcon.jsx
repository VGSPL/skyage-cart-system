import React from 'react'

// Default CTA icon (chat bubble)
export function DefaultCTAIcon({ className = '' }){
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.968 9.968 0 01-4.59-1.03L3 20l1.03-4.41A9.968 9.968 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  )
}

// Example alternate icons you can import and use
export function PhoneCTAIcon({ className = '' }){
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.508 4.526a1 1 0 01-.287 1.016l-1.72 1.72a11.036 11.036 0 005.516 5.516l1.72-1.72a1 1 0 011.016-.287L20.316 15.8A1 1 0 0121 16.748V20a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" />
    </svg>
  )
}

export function MailCTAIcon({ className = '' }){
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12H8m8 0l-4 4m4-4l-4-4M3 7a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
    </svg>
  )
}

export default DefaultCTAIcon
