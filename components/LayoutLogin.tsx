import Image from 'next/image'
import React, { useState } from 'react'

const LayoutLogin = ({ children }) => {
  return (
    <div className="h-full grid gap-10 grid-cols-1 md:grid-cols-2 xl:grid-cols-6 ">
      <div className="flex items-center justify-center mb-10 lg:mb-0 xl:col-start-2 xl:col-span-2">
        <div className="relative  mx-auto h-[100px] w-[100px] md:w-[200px] md:h-[200px]">
          <Image
            src="/logo-circle.jpg"
            alt="logo bertolucci"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </div>

      <div className="col-span-1 mb-20 flex items-center xl:col-start-4 xl:col-span-2">
        <div className="w-full">{children}</div>
      </div>
    </div>
  )
}

export default LayoutLogin
