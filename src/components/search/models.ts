import { ICommonSearch } from 'src/api/search';
import { InjectionKey } from 'vue';

export const searchListKey = Symbol() as InjectionKey<ICommonSearch>;
