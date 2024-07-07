interface IResponseMeta {
  total: number;
  page: number;
  offset: number;
  limit: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

/**
 * A response class
 *  msg = the message of the response
 *  data = data object
 *  status = the response status
 */
class ResponseObj {
  status: number;
  data: object;
  meta: IResponseMeta | null;
  msg: string;

  constructor(status: number, data: object, msg: string) {
    this.status = status;
    this.data = data;
    this.msg = msg;
  }

  // For Creating pagination Meta data
  setMeta(total: number, offset: number, limit: number) {
    const page = offset / limit + 1;

    const meta: IResponseMeta = {
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

export default ResponseObj;

//Server error
export const serverError = (err, res) => {
  let respObject = new ResponseObj(500, err, "Server Error Occurred");
  return res.status(500).send(respObject);
};
