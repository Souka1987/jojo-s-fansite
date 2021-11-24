var assert = require('assert');


describe('test', function() {
    it('should to do something', function(){
        var a = 3;
        // Demander à ce que la valeur soit égal à 6
        assert.equal(a * 2, 6, 'La multiplication n\'a pas fonctionné')
    })
})
