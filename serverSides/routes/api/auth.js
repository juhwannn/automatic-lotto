console.log(`${__filename}:1`);

const express = require('express');
const router = express.Router();

const RouterUtil = require('../../utils/RouterUtil');
const BcryptLogic = require('../../logics/BcryptLogic');
const {selectOneWhereId} = require("../../repositories/User");
const {selectOne} = require("../../mysqlPool");
const wrapTryCatch = RouterUtil.wrapTryCatch;

const {query} = require("../../mysqlPool");

const rowUserToCookieObject = row => ({
    UserId: row.UserId,
    Email: row.Email,
    State: row.State,
});

/**
 * @openapi
 * /api/me:
 *   get:
 *     description: 내 정보 가져오기 (session check) + DB 조회
 *     responses: { 200: { description: user } }
 */
router.get('/', wrapTryCatch(async (req, res) => {
    const user = req.getUser();
    if (!user) {
        return res.renderJson();
    }

    const row = await selectOneWhereId(user.UserId);

    // // 접속 가능상태가 아니면 쿠키 삭제
    // if (row.state !== "Access") {
    //     res.signedCookieUserRemove();
    //     return res.renderJson();
    // }
    if (!row) {
        res.signedCookieUserRemove();
        return res.renderJson();
    }

    delete row.password;

    res.renderJson({
        user: row,
    });
}));

router.post("/login", wrapTryCatch(async (req, res) => {
    const {id, password} = req.getObjectRequired("id", "password");

    const row = await selectOneWhereId(id);
    if (!row) {
        return res.renderJson403();
    }

    const checkPassword = await BcryptLogic.compare(password, row.UserPwd);
    if (!checkPassword) {
        return res.renderJson403();
    }

    const user = rowUserToCookieObject(row);

    res.signedCookieUserSet(user);
    res.renderJson(user);
}));

router.get("/verify", wrapTryCatch(async (req, res) => {
    try {
        req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET_KEY);
    } catch (error) {
        // 유효시간이 초과된 경우
        if (error.name === 'TokenExpiredError') {
            return res.status(419).json({
                code: 419,
                message: '토큰이 만료되었습니다.'
            });
        }
        // 토큰의 비밀키가 일치하지 않는 경우
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                code: 401,
                message: '유효하지 않은 토큰입니다.'
            });
        }
    }
}));

router.get('/getUser', wrapTryCatch(async (req, res) => {
    const user = req.getUser();
    if (!user) {
        return res.renderJson();
    }

    const row = await selectOne(`SELECT * FROM User WHERE UserId = ?`, user.UserId);

    // 접속 가능상태가 아니면 쿠키 삭제
    if (row.state !== "Access") {
        res.signedCookieUserRemove();
        return res.renderJson();
    }
    if (!row) {
        res.signedCookieUserRemove();
        return res.renderJson();
    }

    delete row.UserPwd;

    res.renderJson({
        user: row,
    });
}));


router.post('/logout', wrapTryCatch(async (req, res) => {
    res.signedCookieUserRemove();
    res.renderJson({});
}));

router.post('/join', wrapTryCatch(async (req, res) => {
    const {id, password, confirmPassword, name, email} = req.getObjectRequired('id', 'password', 'confirmPassword', 'name', 'email');

    const hashPassword = await BcryptLogic.hash(password);

    const row = await query(`INSERT INTO User(UserId, UserPwd, email, name, state) VALUES(?, ?, ?, ?, "0")`, [id, hashPassword, email, name]);

    res.renderJson({
        'ss': 'ss'
    });
}));


module.exports = router;