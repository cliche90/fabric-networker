'use strict';
const _ = require('lodash');
const inquirer = require('inquirer');
const colors = require('colors');
const main = require('../../main');

var questions = [{
    type: 'number',
    name: 'peers',
    message: "peer의 수를 입력해주세요(1개 이상)",
}];

exports.ask = function (network) {
    inquirer.prompt(questions).then(answers => {
        if (!answers.peers || answers.peers <= 0) {
            console.log(colors.red('올바른 Peer의 수를 입력해 주세요.'));
            this.ask(network);
            return;
        }
        main.output[network].orderers = 1;
        main.output[network].peers = answers.peers;
        main.ask();
    });
}