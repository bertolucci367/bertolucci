const designers = [
  {
    img:
      'http://assets2.bertolucci.com.br/uploads/designer_images/image/517ed6eb43493b7e4600009d/thumb_ana-strumpf.jpg',
    name: 'ana strumpf',
    slug: 'ana-strumpf',
  },
  {
    img:
      'http://assets2.bertolucci.com.br/uploads/designer_images/image/56df1be8a7ab750602000003/thumb_atelier-bam.jpg',
    name: 'atelier bam',
    slug: 'atelier-bam',
  },
  {
    img:
      'http://assets2.bertolucci.com.br/uploads/designer_images/image/5098140b43493b4870000006/thumb_beto-galvez-norea-de-vitto.jpg',
    name: 'beto galvez e nórea de vitto',
    slug: 'beto-galvez-e-norea-de-vitto',
  },
  {
    img:
      'http://assets2.bertolucci.com.br/uploads/designer_images/image/509d3b1b43493b540a000012/thumb_atelier-marko-brajovic.jpg',
    name: 'atelier marko brajovic',
    slug: 'atelier-marko-brajovic',
  },
  {
    img:
      'http://assets1.bertolucci.com.br/uploads/designer_images/image/5188f96d43493b130c000005/thumb_camila_sarpi.jpg',
    name: 'camila sarpi',
    slug: 'camila-sarpi',
  },
  {
    img:
      'http://assets2.bertolucci.com.br/uploads/designer_images/image/5098142443493b487000000a/thumb_claudia-moreira-salles.jpg',
    name: 'claudia moreira salles',
    slug: 'claudia-moreira-salles',
  },
  {
    img:
      'http://assets1.bertolucci.com.br/uploads/designer_images/image/5098144943493b4876000004/thumb_Deborah-Roig.jpg',
    name: 'deborah roig',
    slug: 'deborah-roig',
  },
  {
    img:
      'http://assets1.bertolucci.com.br/uploads/designer_images/image/5098143643493b487000000c/thumb_debora-aguiar.jpg',
    name: 'débora aguiar',
    slug: 'debora-aguiar',
  },
  {
    img:
      'http://assets1.bertolucci.com.br/uploads/designer_images/image/517ed62943493b7e4600009c/thumb_etel-carmona.jpg',
    name: 'etel carmona',
    slug: 'etel-carmona',
  },
  {
    img:
      'http://assets2.bertolucci.com.br/uploads/designer_images/image/56deec08a7ab7506ba000001/thumb_fernanda-yamamoto.jpg',
    name: 'fernanda yamamoto',
    slug: 'fernanda-yamamoto',
  },
  {
    img:
      'http://assets1.bertolucci.com.br/uploads/designer_images/image/5098145c43493b4873000008/thumb_fernando-piva.jpg',
    name: 'fernando piva',
    slug: 'fernando-piva',
  },
]

const materials = [
  { name: 'acrilico' },
  { name: 'ceramica' },
  { name: 'cortiça' },
  { name: 'fibras naturais' },
  { name: 'madeira' },
  { name: 'metal' },
  { name: 'tecido' },
  { name: 'vidro' },
]

const typologies = [
  {
    slug: 'lampshade',
    name: 'abajur',
    thumb: true,
  },
  {
    slug: 'sconce',
    name: 'arandela',
    thumb: true,
  },
  { slug: 'column', name: 'coluna', thumb: true },
  { slug: 'pending', name: 'pendente', thumb: true },
  { slug: 'plafom', name: 'plafom', thumb: true },
]

const families = [
  { name: '2050' },
  { name: '3D de luxo' },
  { name: '85g' },
  { name: 'abaeté' },
  { name: 'alma' },
  { name: 'anamórfica' },
  { name: 'apoena' },
  { name: 'araucária' },
  { name: 'arco' },
  { name: 'atman' },
  { name: 'batuque' },
  { name: 'bella' },
  { name: 'berimbau' },
  { name: 'berloque' },
  { name: 'beto galvez e nórea de vitto' },
  { name: 'bionda' },
  { name: 'canoa' },
  { name: 'cantante' },
  { name: 'carimbó' },
  { name: 'cesta' },
  { name: 'címbalo' },
  { name: 'cine' },
  { name: 'ciranda' },
  { name: 'cresça e apareça' },
  { name: 'débora aguiar' },
  { name: 'deborah roig' },
  { name: 'dendê' },
  { name: 'dórica' },
  { name: 'drum' },
  { name: 'fernando piva' },
  { name: 'flash' },
  { name: 'fractus' },
  { name: 'francisco cálio' },
  { name: 'galeão' },
  { name: 'gras' },
  { name: 'guará' },
  { name: 'herba' },
  { name: 'ibira' },
  { name: 'ju' },
  { name: 'king size' },
  { name: 'leonardo' },
  { name: 'liana' },
  { name: 'lótus' },
  { name: 'luz ecológica' },
  { name: 'maracatu' },
  { name: 'marcelo rosenbaum' },
  { name: 'marina linhares' },
  { name: 'maxixe' },
  { name: 'minimum' },
  { name: 'mix print' },
  { name: 'mix simples e dupla' },
  { name: 'mube' },
  { name: 'mube coluna' },
  { name: 'nitens' },
  { name: 'nonno' },
  { name: 'nuvem' },
  { name: 'oito' },
  { name: 'olegário de sá e gilberto cioni' },
  { name: 'orecchiette' },
  { name: 'oscar mikail' },
  { name: 'otto' },
  { name: 'pequim' },
  { name: 'piá' },
  { name: 'poste' },
  { name: 'quadrados' },
  { name: 'queen size' },
  { name: 'raízes' },
  { name: 'ramy' },
  { name: 'realejo' },
  { name: 'roberto negrete' },
  { name: 'se vira!' },
  { name: 'siricutico' },
  { name: 'súber' },
  { name: 'taboa' },
  { name: 'tifa' },
  { name: 'tramas' },
  { name: 'tríade' },
  { name: 'tunga' },
  { name: 'umbu' },
  { name: 'universo' },
  { name: 'urucum' },
  { name: 'volta' },
  { name: 'zumbi' },
]

const submenu = {
  designers,
  materials,
  typologies,
  families,
}

export default async (req, res) => {
  // res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate')

  if (req.query.id === 'undefined') {
    return
  }

  let _subItems: any[] = submenu[req.query.id]

  if (req.query.id === 'families') {
    const dic = {}
    const subLines = []
    submenu[req.query.id].forEach(item => {
      const char = item.name.charAt(0)
      dic[char] = dic[char] ? [...dic[char], item] : [item]
    })

    for (var [key, value] of Object.entries(dic)) {
      subLines.push({ name: key, title: true })

      const arr: any = value
      arr.map((item: any) => subLines.push(item))
    }

    _subItems = subLines
  }

  res.status(200).json(_subItems)
}
