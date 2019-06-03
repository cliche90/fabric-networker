'use strict';
const _ = require('lodash');
const inquirer = require('inquirer');
const colors = require('colors');
const network = require('./menus/network');
const member = require('./menus/member');

exports.output = {};

var question = {
    type: 'list',
    name: 'menu',
    message: "원하시는 메뉴를 선택해 주세요.",
    choices: [
        '네트워크 만들기',
        '네트워크 구성원 만들기',
        '채널 구성하기',
        '현재 구성(output) 출력해보기',
        'EXIT'
    ]
};

exports.ask = function () {
    inquirer.prompt(question).then(answers => {
        switch (answers.menu) {
            case question.choices[0]:
                network.ask();
                break;
            case question.choices[1]:
                member.ask();
                break;
            case _.nth(question.choices, -2):
                console.log(colors.blue("[Output] \n", JSON.stringify(this.output, null, 4)));
                this.ask();
                break;
            case _.last(question.choices):
                console.log(colors.yellow("Bye Bye!!"));
                break;
            default:
                console.log('메뉴 이름:', answers.menu);
                this.ask();
        }
    });
}

this.ask();