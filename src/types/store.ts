import { Persistor } from 'redux-persist';
import { EnhancedStore } from '@reduxjs/toolkit';

export interface PersistableStore extends EnhancedStore {
  __persistor?: Persistor;
}
