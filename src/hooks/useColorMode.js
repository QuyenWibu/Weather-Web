import { useContext } from 'react';
import { ColorModeContext } from '../App';

export const useColorMode = () => {
  return useContext(ColorModeContext);
};