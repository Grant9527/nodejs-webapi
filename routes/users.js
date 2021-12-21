var express = require('express');
var router = express.Router();
var db = require('../sqlconnect/index');

/**,
 * @swagger
 * /users/getuser:
 *    get:
 *      tags:
 *      - 人员
 *      summary: 获取人员
 *      produces:
 *      - application/json
 *      responses:
 *        200:
 *          description: successful operation
 *          schema:
 *            ref: #/definitions/user
 * */
router.get('/getuser', function (req, res) {
  let sql = "select * from user";
  db.query(sql, function (err, rows) {
    res.json(rows);
  });
});
/**,
 * @swagger
 * /users/getuserById:
 *    get:
 *      tags:
 *      - 人员
 *      summary: 通过id获取人员
 *      produces:
 *      - application/json
 *      parameters:
 *       - name: "id"
 *         in: query
 *         type: integer
 *         required: true
 *         description: 
 *      responses:
 *        200:
 *          description: successful operation
 *          schema:
 *            ref: #/definitions/user
 * */
router.get('/getuserById', function (req, res) {
  let sql = "select * from user where id= " + req.query.id;
  db.query(sql, function (err, rows) {
    res.json(rows);
  });
});
/**,
 * @swagger
 * /users/adduser:
 *    post:
 *      tags:
 *      - 人员
 *      summary: 添加人员
 *      produces:
 *      - "application/json"
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema: #参数备注
 *              type: object #参数类型
 *              properties:
 *                userName:
 *                  type: string #参数类型
 *                  description: 姓名
 *                passWord:
 *                  type: string #参数类型
 *                  description: 密码
 *            example: #请求参数样例
 *              userName: "string"
 *              passWord: "string"
 *      responses:
 *        200:
 *          description: successful operation
 *          schema:
 *            ref: #/definitions/user
 * */
router.post('/adduser', function (req, res) {
  let param = req.body;
  let sql = "insert into user set ?";
  db.query(sql, param, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      //res.json(rows);
      res.send("添加成功");
    }
  });
});
/**,
 * @swagger
 * /users/edituser:
 *    put:
 *      tags:
 *      - 人员
 *      summary: 修改人员
 *      produces:
 *      - "application/json"
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema: #参数备注
 *              type: object #参数类型
 *              properties:
 *                id:
 *                  type: int #参数类型
 *                  description: id
 *                userName:
 *                  type: string #参数类型
 *                  description: 姓名
 *                passWord:
 *                  type: string #参数类型
 *                  description: 密码
 *            example: #请求参数样例
 *              id: 0
 *              userName: "string"
 *              passWord: "string"
 *      responses:
 *        200:
 *          description: successful operation
 *          schema:
 *            ref: #/definitions/user
 * */
router.put('/edituser', function (req, res) {
  let param = req.body;
  let sql = "update user set ? where id = ?";
  if (param.id <= 0) {
    res.send("该数据不存在");
  } else {
    db.query(sql, [param, param.id], function (err, result) {
      if (err) {
        console.log(err);
      } else {
        //res.json(rows);
        res.send("修改成功");
      }
    });
  }
});

/**,
 * @swagger
 * /users/deluser:
 *    delete:
 *      tags:
 *      - 人员
 *      summary: 删除人员
 *      produces:
 *      - "application/json"
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema: #参数备注
 *              type: object #参数类型
 *              properties:
 *                id:
 *                  type: int #参数类型
 *                  description: id
 *            example: #请求参数样例
 *              id: 0
 *      responses:
 *        200:
 *          description: successful operation
 *          schema:
 *            ref: #/definitions/user
 * */
router.delete('/deluser', function (req, res) {
  let param = req.body;
  let sql = "delete from user where id =?";
  db.query(sql, param.id, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      //res.json(rows);
      res.send("删除成功");
    }
  });
});





module.exports = router;
