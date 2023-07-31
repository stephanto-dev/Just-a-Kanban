import { createGlobalState } from 'react-hooks-global-state';
import { CardModel } from '../utils/models';

const {setGlobalState, useGlobalState} = createGlobalState({
  cards: [] as CardModel[]
  // test: 0

})

export {setGlobalState, useGlobalState}