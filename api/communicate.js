import request from '@/utils/request'
export default {
    getPageList(page, limit) {
        return request({
            url: `/eduservice/communication/getComList/${page}/${limit}`,
            method: 'post',
        })
    },
    addCommunicate(communicate) {
        return request({
            url: `/eduservice/communication/addCom`,
            method: 'post',
            data: communicate
        })
    },
    thumbUp(id) {
        return request({
            url: `/eduservice/communication/ThumbUp/${id}`,
            method: 'post',
        })
    },
}