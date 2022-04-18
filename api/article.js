import request from '@/utils/request'
export default {
    getPageList(current, limit) {
        return request({
            url: `/eduservice/article/pageArticleFront/${current}/${limit}`,
            method: 'post',
        })
    },
    addArticle(article) {
        return request({
            url: `/eduservice/article/addArticle`,
            method: 'post',
            data: article
        })
    },
    getArticle(id){
        return request({
            url: `/eduservice/article/getArticle/${id}`,
            method: 'get',
        })
    }
}