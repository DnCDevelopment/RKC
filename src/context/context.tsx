import { createContext } from 'react';

import { IContext } from '../components/Types';

const context = createContext<IContext | null>(null);

export default context;
