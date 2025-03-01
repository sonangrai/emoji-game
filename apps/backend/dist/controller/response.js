"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A response class
 *  msg = the message of the response
 *  data = data object
 *  status = the response status
 */
class ResponseObj {
    constructor(status, data, msg) {
        this.status = status;
        this.data = data;
        this.meta = null;
        this.msg = msg;
    }
    // For Creating pagination Meta data
    setMeta(total, offset, limit) {
        const page = offset / limit + 1;
        const meta = {
            total: total,
            offset: Number(offset),
            limit: Number(limit),
            page: page,
            hasPrevious: false,
            hasNext: false,
        };
        meta["hasPrevious"] = page != 1 ? true : false;
        meta["hasNext"] = Math.ceil(total / limit) >= page;
        this.meta = meta;
    }
}
exports.default = ResponseObj;
