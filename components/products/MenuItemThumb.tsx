import Image from 'next/image'

interface ThumbProps {
  slug?: any
}

const MenuItemThumb = ({ slug }: ThumbProps) => {
  const posBySlug = {
    abajur: 0,
    arandela: 2,
    coluna: 4,
    embutido: 6,
    pendente: 8,
    plafom: 10,
  }

  if (!Object.keys(posBySlug).includes(slug)) {
    return <></>
  }

  return (
    <div className={`overflow-hidden h-[32px]`}>
      <div
        data-index={posBySlug[slug]}
        className={`mr-4px`}
        style={{ marginTop: `-${32 * posBySlug[slug]}px` }}
      >
        <Image src="/pic_thumbs.png" layout="fixed" height={448} width={32} />
      </div>
    </div>
  )
}

export default MenuItemThumb
