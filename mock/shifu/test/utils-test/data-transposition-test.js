var Expect = require('chai').expect;
var Utils = require('../../lib/utils/common-utils');

describe('data-transposition-tests', function () {

  var substitutedData;

  before(function () {
    var dataToChange = {
      'items.item[0].id': 1234,
      'items.item[0].val': 'value',
      'items.item[1].id': 4567,
      'items.item[*].batters.batter[*].id': 5678,
      'items.item[*].topping[*].id': 9999
    };
    var fileLocation = require('path').join(__dirname, './../resources/test-data/data-transposition-test.json');
    var dataSet = Utils.readJsonFile(fileLocation);
    substitutedData = Utils.transposeData(dataSet, dataToChange);
  });

  it('should change the first array id', function (done) {
    Expect(substitutedData.items.item[0].id).to.equal(1234);
    done();
  });

  it('should add item to the first array element', function (done) {
    Expect(substitutedData.items.item[0].val).to.equal('value');
    done();
  });

  it('should add another item to array', function (done) {
    Expect(substitutedData.items.item[1].id).to.equal(4567);
    done();
  });

  it('should change the id value of all array nested elements nested element as * was used', function (done) {
    Expect(substitutedData.items.item[0].batters.batter[0].id).to.equal(5678);
    Expect(substitutedData.items.item[0].batters.batter[1].id).to.equal(5678);
    Expect(substitutedData.items.item[0].batters.batter[2].id).to.equal(5678);
    Expect(substitutedData.items.item[0].batters.batter[3].id).to.equal(5678);
    Expect(substitutedData.items.item[1].batters.batter[0].id).to.equal(5678);
    Expect(substitutedData.items.item[1].batters.batter[1].id).to.equal(5678);
    done();
  });

  it('should change the id value of all array elements (one level) nested element as * was used', function (done) {
    Expect(substitutedData.items.item[0].topping[0].id).to.equal(9999);
    Expect(substitutedData.items.item[0].topping[1].id).to.equal(9999);
    done();
  });
});
