import { ICommonSearch } from 'src/api/search';
import { InjectionKey } from 'vue';

export const searchListKey = Symbol() as InjectionKey<ICommonSearch>;
export const searchOrderKey = Symbol() as InjectionKey<string[]>;
