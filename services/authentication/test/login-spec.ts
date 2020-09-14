import mocha from 'mocha';
import { User } from '../src/models/user';
import chai from 'chai';
import chaiHttp from 'chai-http';
import {
    LOGIN_TESTS,
    LOGIN_RESPONSE_MESSAGES
} from '../src/utils/lang';
import {
    EXISTING_USER,
    NEW_USER,
    INVALID_PASSWORD,
    VALID_PASSWORD,
} from './constants';
import app from '../src/app';

chai.use(chaiHttp);

const should = chai.should();

describe("Login", function () {

    const requester = chai.request(app).keepOpen();
    let dummyUser: User;
    before(async () => {
        dummyUser = await User.create(EXISTING_USER);
    });

    after(async () => {
        if (requester) await requester.close();
        await User.destroy({
            where: {
                id: dummyUser.id
            }
        });
    });

    describe("#Success", function () {
        it(LOGIN_TESTS.SUCCESS.LOGIN_SUCCESS, function (done) {
            requester.post(LOGIN_TESTS.API)
                .send({
                    email: EXISTING_USER.email,
                    password: EXISTING_USER.password
                })
                .end((err, res) => {
                    if (err) return done(err);
                    res.status.should.equal(200);
                    res.body.email.should.equal(EXISTING_USER.email);
                    res.body.message.should.equal(LOGIN_RESPONSE_MESSAGES.LOGIN_SUCCESS)
                    done();
                });
        });
    });
    
    describe("#Failure", function () {
        it(LOGIN_TESTS.FAILURE.EMAIL_REQUIRED, function (done) {
            requester.post(LOGIN_TESTS.API)
                .send({
                    password: VALID_PASSWORD
                })
                .end((err, res) => {
                    if (err) return done(err);
                    res.should.have.status(400);
                    res.body.message.should.be.equal(LOGIN_RESPONSE_MESSAGES.EMAIL_REQUIRED)
                    done();
                });
        });

        it(LOGIN_TESTS.FAILURE.PASSWORD_REQUIRED, function (done) {
            requester.post(LOGIN_TESTS.API)
                .send({
                    email: EXISTING_USER.email
                })
                .end((err, res) => {
                    if (err) return done(err);
                    res.should.have.status(400);
                    res.body.message.should.be.equal(LOGIN_RESPONSE_MESSAGES.PASSWORD_REQUIRED)
                    done();
                });
        });

        it(LOGIN_TESTS.FAILURE.USER_NOT_FOUND, function (done) {
            requester.post(LOGIN_TESTS.API)
                .send({
                    email: NEW_USER.email,
                    password: NEW_USER.password
                })
                .end((err, res) => {
                    if (err) return done(err);
                    res.should.have.status(401);
                    done();
                });
        });

        it(LOGIN_TESTS.FAILURE.WRONG_CREDENTIALS, function (done) {
            requester.post(LOGIN_TESTS.API)
                .send({
                    email: EXISTING_USER.email,
                    password: INVALID_PASSWORD
                })
                .end((err, res) => {
                    if (err) return done(err);
                    res.should.have.status(401);
                    done();
                });
        });
    });
});