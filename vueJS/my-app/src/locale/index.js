import Vue from 'vue'
import VueI18n from 'vue-i18n'

//json 파일을 읽어들이는 함수
const requireLang = require.context(
    '@/locale',
    true,
    /\.json$/
)

const messages = {};

//json file 읽기
for(const file of requireLang.keys()){
    if(file === './index.js') continue;
    const path = file.replace(/(\.\/|\.json$)/g, '').split("/")
    
    path.reduce((o, s, i) => {
        if(o[s]) return o[s]
        o[s] = i + 1 === path.length ? requireLang(file) : {}

        return o[s]
    }, messages)
}

Vue.use(VueI18n);

const i18n = new VueI18n({
    locale : 'ko',
    fallbackLocale : 'en',
    messages,
    silentTranslationWarn : true
})

export default i18n;