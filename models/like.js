import {
    Http
} from '../util/http'

class LikeModel extends Http {
    like(behavior, artID, category) {
        let url = behavior == 'like' ? 'like' : 'like/cancel'
        this.request({
            url: url,
            data: {
                art_id: artID,
                type: category
            },
            method: "POST"
        })
    }
    getClassicLikeStatus(artID, category) {
        return this.request({
            url: 'classic/' + category + '/' + artID + '/favor',
        })
    }
}

export {
    LikeModel
}