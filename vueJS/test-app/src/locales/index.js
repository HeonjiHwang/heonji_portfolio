import { createI18n } from 'vue-i18n'

import ko from './ko.json';
import en from './en.json';

// 2. Create i18n instance with options
const i18n = createI18n({
    locale: 'ko',
    fallbackLocale: 'en',
    messages: { ko, en }
  })

export default i18n;