'use strict';
const _ = require('lodash');
const inquirer = require('inquirer');
const colors = require('colors');
const main = require('../main');

var questions = [{
    type: 'list',
    name: 'type',
    message: "네트워크의 타입을 선택해 주세요.",
    choices: ['solo', 'kafka']
},{
    type: 'input',
    name: 'network',
    message: "네트워크 이름을 입력해 주세요."
}];

exports.ask = function() {
    inquirer.prompt(questions).then(answers => {
        if (!answers.network) {
            console.log(colors.red('올바른 네트워크 이름을 입력해주세요.'));
            this.ask();
        } else if (_.hasIn(main.output, answers.network)) {
            console.log(colors.red('이미 네트워크 이름이 존재합니다.'));
            this.ask();
        } else {
            main.output[answers.network] = {};
            main.output[answers.network].type = answers.type;
            main.ask();
        }
    });
}