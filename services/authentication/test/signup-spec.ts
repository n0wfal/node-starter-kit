import mocha from 'mocha';
import { User } from '../src/models/user';
import chai from 'chai';
import chaiHttp from 'chai-http';
import {
    SIGNUP_TESTS,
    SIGNUP_RESPONSE_MESSAGES
} from '../src/utils/lang';
import {
    EXISTING_USER,
    NEW_USER,
    INVALID_PASSWORD,
    VALID_PASSWORD,
    INVALID_EMAIL
} from './constants';
import app from '../src/app';

chai.use(chaiHttp);

const should = chai.should();

describe('Signup', function () {

    const requester = chai.request(app).keepOpen();
    let dummyUser: User;
    before( async () => { 
        dummyUser = await User.create(EXISTING_USER);
    });

    after(async () => {
        if (requester) await requester.close();
        await User.destroy({
            where: {
                id: dummyUser.id
            }
        });
        await User.destroy({
            where: {
                email: NEW_USER.email
            }
        });
    });

    describe('#Failures', function () {

        it(SIGNUP_TESTS.FAILURE.PASSWORD_CONFIRMATION_REQUIRED, function (done) {
            requester.post(SIGNUP_TESTS.API)
                .send({
                    email: NEW_USER.email,
                    password: VALID_PASSWORD,
                    name: NEW_USER.name
                })
                .end((err, res) => {
                    if (err) return done(err)
                    res.should.have.status(400); 
                    res.body.message.should.be.equal(SIGNUP_RESPONSE_MESSAGES.PASSWORD_CONFIRMATION_REQUIRED)
                    done();
                });
        });

        it(SIGNUP_TESTS.FAILURE.PASSWORD_REQUIRED, function (done) {
            requester.post(SIGNUP_TESTS.API)
                .send({
                    email:  NEW_USER.email,
                    confirmPassword: NEW_USER.confirmPassword,
                    name: NEW_USER.name
                })
                .end((err, res) => {
                    if (err) return done(err)
                    res.should.have.status(400); 
                    res.body.message.should.be.equal(SIGNUP_RESPONSE_MESSAGES.PASSWORD_REQUIRED)
                    done();
                });
        });

        it(SIGNUP_TESTS.FAILURE.EMAIL_REQUIRED, function (done) {
            requester.post(SIGNUP_TESTS.API)
                .send({
                    password: NEW_USER.password,
                    confirmPassword: NEW_USER.confirmPassword,
                    name: NEW_USER.name
                })
                .end((err, res) => {
                    if (err) return done(err)
                    res.should.have.status(400); 
                    res.body.message.should.be.equal(SIGNUP_RESPONSE_MESSAGES.EMAIL_REQUIRED)
                    done();
                });
        });

        it(SIGNUP_TESTS.FAILURE.INVALID_EMAIL, function (done) {
            requester.post(SIGNUP_TESTS.API)
                .send({
                    email: INVALID_EMAIL,
                    password: NEW_USER.password,
                    confirmPassword: NEW_USER.confirmPassword,
                    name: NEW_USER.name
                })
                .end((err, res) => {
                    if (err) return done(err)
                    res.should.have.status(400); 
                    res.body.message.should.be.equal(SIGNUP_RESPONSE_MESSAGES.INVALID_EMAIL)
                    done();
                });
        });

        it(SIGNUP_TESTS.FAILURE.PASSWORD_LENGTH, function (done) {
            requester.post(SIGNUP_TESTS.API)
                .send({
                    email: NEW_USER.email,
                    password: INVALID_PASSWORD,
                    confirmPassword: INVALID_PASSWORD,
                    name: NEW_USER.name
                })
                .end((err, res) => {
                    if (err) return done(err)
                    res.should.have.status(400); 
                    res.body.message.should.be.equal(SIGNUP_RESPONSE_MESSAGES.PASSWORD_LENGTH)
                    done();
                });
        });

        it(SIGNUP_TESTS.FAILURE.EXISTING_USER, function (done) {
            requester.post(SIGNUP_TESTS.API)
                .send(EXISTING_USER)
                .end((err, res) => {
                    if (err) return done(err)
                    res.should.have.status(400); 
                    res.body.message.should.be.equal(SIGNUP_RESPONSE_MESSAGES.EXISTING_USER)
                    done();
                });
        });
        
        it(SIGNUP_TESTS.FAILURE.PASSWORD_CONFIRMATION, function (done) {
            requester.post(SIGNUP_TESTS.API)
                .send({
                    email: NEW_USER.email,
                    password: NEW_USER.password,
                    confirmPassword: INVALID_PASSWORD,
                    name: NEW_USER.name
                })
                .end((err, res) => {
                    if (err) return done(err)
                    res.should.have.status(400); 
                    res.body.message.should.be.equal(SIGNUP_RESPONSE_MESSAGES.PASSWORD_CONFIRMATION)
                    done();
                });
        });
        
    });
    describe('#Success', function () {
        it(SIGNUP_TESTS.SUCCESS.SIGNUP_SUCCESS, function (done) {
            requester.post(SIGNUP_TESTS.API)
                .send(NEW_USER)
                .end((err, res) => {
                    if (err) return done(err);
                    res.should.have.status(200); 
                    res.body.message.should.be.equal(SIGNUP_RESPONSE_MESSAGES.SIGNUP_SUCCESS)
                    done();
                });
        });
    });
});
