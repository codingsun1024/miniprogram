import {
    Http
} from '../util/http'
class BookModel extends Http {
    getHotList() {
        return this.request({
            url: 'book/hot_list'
        })
    }
    getMyBookCount() {
        return this.request({
            url: 'book/favor/count'
        })
    }

    getDetail(bid) {
        return this.request({
            url: `book/${bid}/detail`
        })
    }

    getComments(bid) {
        return this.request({
            url: `book/${bid}/short_comment`
        })
    }
    getLikeStatus(bid) {
        return this.request({
            url: `book/${bid}/favor`
        })
    }
    postComment(bid, comment) {
        return this.request({
            url: 'book/add/short_comment',
            method: 'POST',
            data: {
                book_id: bid,
                content: comment
            }
        })
    }
    search(start, q) {
        return this.request({
            url: 'book/search?summary=1',
            data: {
                q,
                start
            }
        })
    }
}

export {
    BookModel
}