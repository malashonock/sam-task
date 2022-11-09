import { createContext } from 'react';
import GuitarRepository from './GuitarRepository';
import { Undefinable } from '../../../utils/Nullable';

const GuitarContext = createContext<Undefinable<GuitarRepository>>(undefined);

export default GuitarContext;
