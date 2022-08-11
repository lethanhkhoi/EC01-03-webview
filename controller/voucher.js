const database = require("../utils/database");
const voucherCol = require("../dataModel/voucherCol");
const ObjectID = require("mongodb").ObjectId;

async function getAll(req, res) {
  const page = req.query.page ?? defaultPage;
  const limit = req.query.limit ?? recordPerPage;
  const sortBy = {
    createdAt: -1,
  };
  let match = {}
  if(req.query.filters){
    match["user"] = req.query.filters["userId"]
  }
  const data = await voucherCol.getAll(page, limit, sortBy, match);
  if (!data) {
    return res.json({ errorCode: true, data: "system error" });
  }
  return res.json({ errorCode: null, data: data[0].data });
}

async function create(req, res) {
  let data = req.body;
  data.id = ObjectID().toString();
  for (property of voucherCol.voucherProperties) {
    if (data[property] === null) {
      return res.json({ errorCode: true, data: `Lack of ${property}` });
    }
  }
  data.createdAt = new Date();
  const voucher = await voucherCol.create(data);
  if (!voucher) {
    return res.json({ errorCode: true, data: "System error" });
  }
  return res.json({ errorCode: null, data: data });
}

async function update(req, res) {
  const code = req.params.code;
  const data = req.body;
  const update = await voucherCol.update(code, data);

  if (!update) {
    return res.json({ errorCode: true, data: "System error" });
  }
  for (property of voucherCol.voucherProperties) {
    if (req.body[property]) {
      update[property] = req.body[property];
    }
  }
  return res.json({ errorCode: false, data: update });
}

module.exports = { getAll, create, update };
