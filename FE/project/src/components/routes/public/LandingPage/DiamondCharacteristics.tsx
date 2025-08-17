import React, { useEffect, useState } from 'react'
import Characteristics from './Characteristics'
import CharacteristicDescription from './CharacteristicDescription'
import ShapeCharacteristics from './ShapeCharacteristics'

export type Obj = {
  name: string
  description: string
  elemant?: JSX.Element
}

const DiamondCharacteristics: React.FC = () => {
  const [selected, setSelected] = useState<string>('shape')
  const [selectedObj, setSelectedObj] = useState<Obj>({
    name: '',
    description: '',
  })

  const characteristics: { [key: string]: Obj } = {
    shape: {
      name: 'Shape',
      description:
        'Diamonds come in different shapes and while people have different shape preferences, round cut diamonds are the world’s most popular diamond shape due to their incredible brilliance. Whatever your taste or preference may be, Almas-online has access to a large variety of diamond shapes',
      elemant: <ShapeCharacteristics />,
    },
    carat: {
      name: 'Carat',
      description:
        'The size of a diamond is proportional to its carat weight. When rough diamonds are cut and polished into finished diamonds, up to 65% of the total carat weight may be lost. High-quality large diamonds are found less frequently compared to small diamonds which, in turn, makes them more valuable. A two-carat diamond is always more expensive than several diamonds that add up to two carats.',
    },
    color: {
      name: 'Color',
      description:
        'Diamond color is graded on a scale from D-Z and is divided into five broad categories (colorless, near colorless, faint, very light and light). Diamonds come in all colors of the spectrum. The predominant color you see in a diamond is yellow, which is caused by the trace element nitrogen.',
    },
    cut: {
      name: 'Cut',
      description:
        'The cut of a diamond not only refers to the diamond’s shape, it also refers to how effectively the diamond returns light back to the viewer’s eye. A well-cut diamond will appear very brilliant and fiery, while a poorly cut diamond can appear dark and lifeless, regardless of its color or clarity.     ',
    },
    clarity: {
      name: 'Clarity',
      description:
        'Diamond clarity is an evaluation of discernible characteristics internally or externally. Surface characteristics are known as blemishes whereas internal characteristics are known as inclusions. Microscopic blemishes and inclusions do not affect the diamond’s overall beauty.The less visible these characteristics are in a diamond the higher the clarity grade is.',
    },
    price: {
      name: 'Price',
      description:
        'The shape is an important consideration when buying a diamond as it directly influences price. Round diamonds, the most popular diamond shape, tend to be priced higher than other shapes (referred to as fancy shapes) because of market demand, increased manufacturing costs, and their incredible brilliance.',
    },
  }

  useEffect(() => {
    setSelectedObj(characteristics[selected])
  }, [selected])

  return (
    <div className='flex flex-col md:flex-row w-[99%] lg:w-[96%] xl:w-[92%] 2xl:w-[82%] mx-auto md:mt-10 space-y-14 md:space-y-0'>
      <Characteristics selected={selected} setSelected={setSelected} />
      <CharacteristicDescription selectedObj={selectedObj} />
    </div>
  )
}

export default DiamondCharacteristics
