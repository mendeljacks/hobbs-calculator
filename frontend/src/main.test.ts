import { describe, test } from 'mocha'
import { expect } from 'chai'
import { get_time, is_time, time_diff } from './store'

describe('Time', () => {
    test(is_time.name, () => {
        expect(is_time('0000')).to.equal(true)
        expect(is_time('1234')).to.equal(true)
        expect(is_time('2359')).to.equal(true)
        expect(is_time('0101')).to.equal(true)
        expect(is_time('2901')).to.equal(false)
        expect(is_time('3000')).to.equal(false)
    })
    test(time_diff.name, () => {
        expect(time_diff('0130', '0203')).to.equal(0.6)
        expect(time_diff('1220', '1519')).to.equal(3)
        expect(time_diff('0000', '0015')).to.equal(0.3)
        expect(time_diff('1220', '1300')).to.equal(0.7)
        expect(time_diff('0000', '0000')).to.equal(0)
        expect(time_diff('0015', '0000')).to.be.NaN
        expect(time_diff('3015', '0000')).to.be.NaN
    })
    test(get_time.name, () => {
        const fake_date_1 = {
            getUTCHours: () => 1,
            getUTCMinutes: () => 11
        }
        const fake_date_2 = {
            getUTCHours: () => 12,
            getUTCMinutes: () => 15
        }
        expect(get_time(fake_date_1)).to.equal('0111')
        expect(get_time(fake_date_2)).to.equal('1215')
    })
    test(is_time.name, () => {
        expect(is_time('0000')).to.equal(true)
        expect(is_time('1234')).to.equal(true)
        expect(is_time('2359')).to.equal(true)
        expect(is_time('0101')).to.equal(true)
        expect(is_time('2901')).to.equal(false)
        expect(is_time('3000')).to.equal(false)
        expect(is_time('a200')).to.equal(false)
        expect(is_time('1a00')).to.equal(false)
        expect(is_time('12a0')).to.equal(false)
        expect(is_time('100a')).to.equal(false)
        expect(is_time('00000')).to.equal(false)
    })
})
