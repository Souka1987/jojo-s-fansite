// DB
const mongoose = require('mongoose'),
  Arcs = require('../database/models/Arcs')

// Config Chai
const chai = require('chai'),
  chaiHttp = require('chai-http'),
  should = require('chai').should(),
  expect = chai.expect,
  server = require('../server'),
  path = require('path')

chai.use(chaiHttp)

describe('CHAI // CONTROLLER //  arcsController', () => {

  beforeEach((done) => {
    Arcs.deleteOne({}, (err) => {
      done();
    });
  });

  it(' ChaiRouter // Get Arcs', (done) => {
    chai.request(server)
      .get('/')
      .set('Accept', 'application/json')
      //.expect(200)
      .end((err, res) => {
        //console.log(res)
        if (err) return done(err)
        res.should.have.status(200);
        res.should.be.a('object');
        done();
      });
  });

//   it(' ChaiRouter // Post Arcs', (done) => {
//     let arcs = {
//       title: 'test Chai Post'
//     }
//     chai.request(server)
//       .post('/admin/arcs')
//       .field("Content-Type", "multipart/form-data")
//       .field("title", "SuperTest")
//       .attach("imgArcs", path.resolve(__dirname, "../public/images/arcs/bcrypt-logo.jpg"))
//       .end(function (err, res) {
//         if (err) {
//           don(err);
//         }
//         expect(res.status).to.equal(500);
//         done()
//       });
//   });

//   it(' ChaiRouter // Put Arcs', (done) => {
//     let arcs = new Arcs({
//         title: 'test Chai Edit'
//       }),
//       arcsEdit = {
//         title: 'test Chai Edit 2'
//       }
//     chai.request(server)
//       .post('/arcs/' + arcs.id)
//       .send(arcsEdit)
//       .end((err, res) => {
//         res.should.be.a('object');
//         done();

//       });
//   });

//   it(' ChaiRouter // Delete Arcs', (done) => {
//     let arcs = new Arcs({
//       title: 'test Chai Delete'
//     })
//     chai.request(server)
//       .delete('/arcs/' + arcs.id)
//       .end((err, res) => {
//         res.should.be.a('object');
//         done();
//       });
//   });

 });