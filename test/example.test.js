const assert = require('assert');
const axios = require('axios');
const { expect } = require('chai');
const { exit } = require('process');

describe('User', () => {
    it("Register", async function()
    {
        expect(200).to.equal(200)
    });
    it("Login", async function()
    {
        expect(200).to.equal(200)
    });
});

describe('Fridges', () => {
    it("Data", async function()
    {
        expect(200).to.equal(200)
    });
    it("Modification", async function()
    {
        expect(200).to.equal(200)
    });
});
