// 主要为后台服务器相关设置
const url: string = 'http://127.0.0.1:3000'

export const ServerManager: {getTextApi: string, getLangApi: string, getEssayList: string} = {
    getTextApi: (url + '/api/text/get'),
    getLangApi: (url + '/api/text/sitelanguage'),
    getEssayList: (url + '/api/essay/list'),
}