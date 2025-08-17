import SelectedDiamondContext, {
  SelectedDiamondContextType,
} from '@components/context/SelectedDiamondContext'
import { useContext } from 'react'

const useSelectedProps = (): SelectedDiamondContextType => {
  const { selectedJewellery, setSelectedJewellery, selectedDiamond, setSelectedDiamond, resetSelections, secondselectedDiamond, secondsetSelectedDiamond } = useContext(SelectedDiamondContext)

  return { selectedJewellery, setSelectedJewellery, selectedDiamond, setSelectedDiamond, resetSelections, secondselectedDiamond, secondsetSelectedDiamond }
}

export default useSelectedProps
