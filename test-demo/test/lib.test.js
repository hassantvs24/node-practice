const lib = require('../lib');

describe('absolute', () => {
    it('Test number Positive', () => {
        // throw new Error('Some Thing Fail');
        const result = lib.absolute(1);
        expect(result).toBe(1);
     });
     
     it('Test number Negative', () => {
         // throw new Error('Some Thing Fail');
         const result = lib.absolute(-1);
         expect(result).toBe(1);
      });
     
     
      it('Test number Zero', () => {
         // throw new Error('Some Thing Fail');
         const result = lib.absolute(0);
         expect(result).toBe(0);
      });
});

