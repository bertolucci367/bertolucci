import Layout from '~/components/Layout'
import xw from 'xwind'

const Policy = () => {
  return (
    <Layout showCookie={false}>
      <div css={[xw`col-start-2`, `p { margin: 10px 0; }`]}>
        <h1 css={xw`font-medium text-18px mb-4`}>Política de Cookies</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum eum
          quia sint voluptatibus in numquam, aperiam, officiis nisi
          reprehenderit corrupti exercitationem dolor quis impedit eaque optio
          omnis expedita laborum ex!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum obcaecati
          quo sapiente, dicta velit aspernatur mollitia voluptatibus soluta.
          Accusamus, cum quae at totam veritatis sapiente accusantium voluptate
          fuga. Asperiores, repellat.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum eum
          quia sint voluptatibus in numquam, aperiam, officiis nisi
          reprehenderit corrupti exercitationem dolor quis impedit eaque optio
          omnis expedita laborum ex!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum obcaecati
          quo sapiente, dicta velit aspernatur mollitia voluptatibus soluta.
          Accusamus, cum quae at totam veritatis sapiente accusantium voluptate
          fuga. Asperiores, repellat.
        </p>
      </div>
    </Layout>
  )
}

export default Policy
