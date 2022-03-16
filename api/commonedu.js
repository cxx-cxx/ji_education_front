import request from '@/utils/request'
export default {
    getPageList(page, limit, courseId) {
        return request({
            url: `/eduservice/comment/getCommentList/${page}/${limit}/${courseId}`,
            method: 'get',
        })
    },
    addComment(comment) {
        return request({
            url: `/eduservice/comment/addComment`,
            method: 'post',
            data: comment
        })
    }
}