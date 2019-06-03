'use strict';
const _ = require('lodash');
const inquirer = require('inquirer');
const colors = require('colors');
const main = require('../../main');

var questions = [{
    type: 'number',
    name: 'orderers',
    message: "orderer의 수를 입력해주세요(2개 이상)",
}, {
    type: 'number',
    name: 'peers',
    message: "peer의 수를 입력해주세요(1개 이상)",
}];

exports.ask = function (network) {
    inquirer.prompt(questions).then(answers => {
        if (!answers.orderers || answers.orderers <= 1) {
            console.log(colors.red('올바른 Orderer의 수를 입력해 주세요.'));
            this.ask(network);
            return;
        } else if (!answers.peers || answers.peers <= 0) {
            console.log(colors.red('올바른 Peer의 수를 입력해 주세요.'));
            this.ask(network);
            return;
        }
        main.output[network].orderers = answers.orderers;
        main.output[network].peers = answers.peers;
        main.ask();
    });
}