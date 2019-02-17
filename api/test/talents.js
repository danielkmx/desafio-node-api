//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const { talentMock , incompletetalentMock} = require('./mocks/talentMock');
//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../app');
let should = chai.should();
let Talent = require('../models/talent');


chai.use(chaiHttp);
//Our parent block
describe('Talents', () => {
    beforeEach((done) => { //Before each test we empty the database
      Talent.remove({}, (err) => { 
           done();           
        });        
    });
/*
  * Test the /GET route
  */
  describe('/GET talents', () => {
      it('it should GET all the talents', (done) => {
        chai.request(server)
            .get('/talents')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.talents.should.be.a('array');
                  res.body.talents.length.should.be.eql(0);
              done();
            });
      });
  });

describe('/POST talent', () => {
  it('it should not POST a talent without email', (done) => {
    chai.request(server)
        .post('/talents')
        .send(incompletetalentMock)
        .end((err, res) => {
              res.should.have.status(500);
              res.body.should.be.a('object');
              res.body.should.have.property('error');
              res.body.error.errors.should.have.property('Email');
              res.body.error.errors.Email.should.have.property('kind').eql('required');
          done();
        });
  });

});
describe('/POST talent', () => {
  it('it should  POST a talent', (done) => {
    chai.request(server)
        .post('/talents')
        .send(talentMock)
        .end((err, res) => {
              res.should.have.status(201);
              res.body.should.be.a('object');
              res.body.should.have.property('talent');
              res.body.talent.should.have.property('Email');
              res.body.talent.should.have.property('Name');
              res.body.talent.should.have.property('Email');
              res.body.talent.should.have.property('PhoneNumber');
              res.body.talent.should.have.property('Linkedin');
              res.body.talent.should.have.property('State');
              res.body.talent.should.have.property('City');
              res.body.talent.should.have.property('Portfolio');
              res.body.talent.should.have.property('WillignessToWork');
              res.body.talent.should.have.property('BestTimeToWork');
              res.body.talent.should.have.property('SalaryRequirementPerHour');
          done();
        });
  });

});
describe('/GET/:talentId talent', () => {
  it('it should GET a talent by the given id', (done) => {
    talentMock.save((err, talent) => {
          chai.request(server)
        .get('/talents/' + talent._id)
        .send(talentMock)
        .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('Email');
              res.body.should.have.property('Name');
              res.body.should.have.property('Email');
              res.body.should.have.property('PhoneNumber');
              res.body.should.have.property('Linkedin');
              res.body.should.have.property('State');
              res.body.should.have.property('City');
              res.body.should.have.property('Portfolio');
              res.body.should.have.property('WillignessToWork');
              res.body.should.have.property('BestTimeToWork');
              res.body.should.have.property('SalaryRequirementPerHour');
          done();
        });
      });

  });
});

describe('/PATCH/:id talent', () => {
  it('it should UPDATE a talent given the id', (done) => {
      let talent = talentMock;
      talent.save((err, talent) => {
            chai.request(server)
            .patch('/talents/' + talent.id)
            .send([{propName: 'name', value: 'Joao'}])
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('message').eql('Talent updated');
                  res.body.should.have.property('request');
              done();
            });
      });
  });
});


describe('/DELETE/:id talent', () => {
  it('it should delete a talent given the id', (done) => {
      let talent = talentMock;
      talent.save((err, talent) => {
            chai.request(server)
            .delete('/talents/' + talent.id)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('message').eql('Talent deleted');
              done();
            });
      });
  });
});


});
