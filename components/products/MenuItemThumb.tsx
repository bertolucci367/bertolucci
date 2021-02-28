import Image from 'next/image'
import xw from 'xwind'

interface ThumbProps {
  slug?: any
}

const MenuItemThumb = ({ slug }: ThumbProps) => {
  const posBySlug = {
    abajur: 0,
    embutido: 0,
    arandela: 2,
    coluna: 4,
    pendente: 6,
    plafom: 8,
  }

  if (!Object.keys(posBySlug).includes(slug)) {
    return <></>
  }

  return (
    <div css={[xw`overflow-hidden`, { height: '32px' }]}>
      <div
        css={{
          marginTop: `-${32 * posBySlug[slug]}px`,
          marginRight: '4px',
        }}
      >
        <Image src="/pic_thumbs.png" layout="fixed" height={448} width={32} />
      </div>
    </div>
  )
}

export default MenuItemThumb
