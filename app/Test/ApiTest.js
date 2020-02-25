const chai = require('chai');
const sinon = require('sinon');
const Controller = require('../controller/note.controller')
const sevises = require('../service/note.service');

let req = {
    body: {
        title: "abc",
        content: "content",

    }
},
    // server error
    error = new Error({ error: "blah blah" }),
    res = {},
    expectedResult;

describe('Controller', function () {

    beforeEach(function () { 
        res = {
            json: sinon.spy(),
            status: sinon.stub().returns({
                send: sinon.spy()
            }) 
         };
    }); 
    afterEach(function () {
        sevises.create.restore();
    })
    it("should return create object", function () {
        expectedResult = req.body
        sinon.stub(sevises, 'create').yields(null, expectedResult);
        Controller.create(req, res);
        sinon.assert.calledWith(sevises.create, req.body);
        sinon.assert.calledWith(res.json, sinon.match({ title: req.body.title }));
        sinon.assert.calledWith(res.json, sinon.match({ content: req.body.content }));
    })

    it('should return status 500 on server error', function () {
        sinon.stub(sevises, 'create').yields(error);
        Controller.create(req, res);
        sinon.assert.calledWith(sevises.create, req.body);
        sinon.assert.calledWith(res.status, 500);
        sinon.assert.calledOnce(res.status(500).send);
    });

});   