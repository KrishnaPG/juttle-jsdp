import JSDP from '../src/';
import { expect } from 'chai';
import moment from 'moment';

describe('protocol', () => {
    it('serializes and deserializes object to the same value', () => {
        const obj = {
            aNaN: NaN,
            anInfinity: Infinity,
            aDate: new Date(2000),
            aDuration: moment.duration(1, 'hour')
        };

        expect(JSDP.deserialize(JSDP.serialize(obj))).to.deep.equal(obj);
    });

    it('serializes and deserializes object to the same value (serializing to object)', () => {
        const obj = {
            aNaN: NaN,
            anInfinity: Infinity,
            aDate: new Date(2000),
            error: new Error('hello'),
            aDuration: moment.duration(1, 'hour')
        };

        let serializedObject = JSDP.serialize(obj, { toObject: true });
        expect(serializedObject).to.be.a('object');

        let deserializedObject = JSDP.deserialize(serializedObject);

        expect(deserializedObject).to.deep.equal(obj);
        expect(deserializedObject.error.message).equal('hello');
    });
});
