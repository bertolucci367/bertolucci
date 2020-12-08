import xw from 'xwind'
import Image from 'next/image'

const Index = () => (
  <div css={xw` justify-center items-center h-screen w-screen`}>
    <div css={xw`h-36 z-10 w-screen bg-red-300 fixed`}>
      <img alt="bertolucci" height="19" src="/logo.svg" width="90"></img>
    </div>

    <div css={xw`fixed h-screen w-screen overflow-hidden`}>
      <Image src="/home2.png" layout="fill" objectFit="contain" quality={100} />
    </div>
  </div>
)

export default Index
