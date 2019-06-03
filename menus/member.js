'use strict';
const _ = require('lodash');
const inquirer = require('inquirer');
const colors = require('colors');
const main = require('../main');
const orderer = require('./member/orderer');
const peer = require('./member/peer');

var questions = [{
    type: 'list',
    name: 'network',
    message: "구성원들이 속할 네트워크를 선택해주세요.",
    choices: []
}];

exports.ask = function () {
    questions[0].choices = _.keys(main.output);
    if (_.size(questions[0].choices) === 0) {
        console.log(colors.red('네트워크를 먼저 만들어주세요.'));
        main.ask();
        return;
    }

    inquirer.prompt(questions).then(answers => {
        if (!answers.network) {
            console.log(colors.red('올바른 네트워크를 선택해주세요.'));
            this.ask();
        } else if (main.output[answers.network].type === 'solo') {
            peer.ask(answers.network)
        } else if (main.output[answers.network].type === 'kafka') {
            orderer.ask(answers.network)
        }
    });
}