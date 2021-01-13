const request = require('supertest'),
  server = require('../server'),
  assert = require('assert'),
  path = require('path')

describe('SUPERTEST // "/characters"', function () {

  it('Get Characters (Page characters)', (done) => {
    request(server)
      .get('/characters')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) {
          console.log("error");
          done(err);
        } else {
          // console.log(res.header);
          // console.log(res)
          done();
        }
      })
  });

  it('Get Character // (Page characters)', (done) => {
    request(server)
      .get('/characters')
      .send({ title: 'Supertest' })
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) {
          console.log("error");
          done(err);
        } else {
          // console.log(res);
          done();
        }
      })
  });


  it("Post Characters // (create)", (done) => {
    
    request(server)
      .post("/characters")
      .field("Content-Type", "multipart/form-data")
      .field("title", "SuperTest")
      .attach("imgCharacters", path.resolve(__dirname, "../public/images/characters/css.png"))
      .end(function(err, res) {
        if (err) {
          done(err);
        }
        done();
      });
  });

});