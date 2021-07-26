import { useEffect, useState } from 'react'
import useSWR from 'swr'
import fetcher from '~/components/libs/fetcher'

import style from './CookieBanner.module.css'

interface DataProps {
  cookiePolicy: {
    [index: number]: { updatedAt: string; banner: { html: string } }
  }
}

const CookieBanner = () => {
  const ACCEPTED_KEY = 'accepted-policies'
  const [showBanner, setShowBanner] = useState(false)
  const { data, error } = useSWR<DataProps>('/api/policy', fetcher)

  const handleAccept = e => {
    e.preventDefault()
    localStorage.setItem(ACCEPTED_KEY, data.cookiePolicy[0].updatedAt)
    setShowBanner(false)
  }

  useEffect(() => {
    try {
      const acceptedDate = localStorage.getItem(ACCEPTED_KEY)
      const updated = data.cookiePolicy[0].updatedAt
      setShowBanner(updated != acceptedDate)
    } catch (error) {}
  }, [])

  return (
    <>
      {showBanner && (
        <div
          className={`
            fixed left-4 right-4 bottom-4
            bg-white bg-opacity-90 py-4 px-6
            z-50

            ${style.animate}
          `}
        >
          <div className={`flex flex-wrap lg:flex-nowrap`}>
            <div
              dangerouslySetInnerHTML={{
                __html: data.cookiePolicy[0].banner.html,
              }}
            ></div>
            <div
              className={`flex flex-col font-medium mt-4 lg:mt-0 lg:ml-8 lg:w-2/12`}
            >
              <a href="" onClick={e => handleAccept(e)}>
                Concordo
              </a>
              <a
                href="/politica-de-cookies"
                className={`whitespace-nowrap mt-2`}
              >
                Definições dos Cookies
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default CookieBanner
