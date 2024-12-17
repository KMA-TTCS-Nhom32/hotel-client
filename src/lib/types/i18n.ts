import type { TFunction } from 'i18next';
import type Resources from '@global-types/resources';

// Creates a strongly typed translation function based on your Resources interface
export type AppTranslationFunction = TFunction<keyof Resources>;
