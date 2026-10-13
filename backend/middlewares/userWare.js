const JWT = require('jsonwebtoken');
const Model = require('../models/applicationModel');

module.exports = (req, res, next) => {
    const token = req.headers['x-admin-token'];
    if (!token) {
        return res.send({ ok: false, msg: "Avtorizatsiya qiling!" });
    }
    JWT.verify(token, process.env.JWT_USER_SECRET, async (err, payload) => {
        if (err) {
            return res.send({
                ok: false,
                msg: "Token yaroqsiz yoki muddati tugagan! Qayta avtorizatsiya qiling!"
            });
        }
        try {
            const $user = await Model.findOne({ _id: payload.usernameId });
            if (!$user) {
                return res.send({ ok: false, msg: "Foydalanuvchi topilmadi" });
            }
            if ($user.access_token !== token) {
                return res.send({
                    ok: false,
                    msg: "Qurulmada sessiya yakunlangan! Qayta avtorizatsiya qiling!"
                });
            }
            const { _id, username } = $user;
            req.user = { usernameId: _id, username };
            next();
        } catch (e) {
            console.error(e);
            res.send({ ok: false, msg: "Serverda xatolik yuz berdi" });
        }
    });
};
