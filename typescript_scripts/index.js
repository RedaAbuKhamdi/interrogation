"use strict";
exports.__esModule = true;
var fs = require("fs");
// История
var Story = /** @class */ (function () {
    function Story() {
        // Данные об игроке и игровой сессии
        this.keywords = null;
        this.interviewees = null;
    }
    Story.prototype.addKeyword = function (key) {
        this.keywords.push(key);
    };
    Story.prototype.addInterviewee = function (interviewee) {
        this.interviewees.push(interviewee);
    };
    return Story;
}());
var session = new Story();
// Допрашиваемые
var Interviewee = /** @class */ (function () {
    function Interviewee(name, surname, description, photo, dialogue) {
        this.name = name;
        this.surname = surname;
        this.description = description;
        this.photo = photo;
        this.current_dialogue = dialogue;
    }
    return Interviewee;
}());
// Диалог вопрос - ответ
var Dialogue = /** @class */ (function () {
    function Dialogue(option, answer, keyword, branches) {
        this.option = option;
        this.answer = answer;
        this.keyword = keyword;
        this.branches = branches;
    }
    // Getters
    Dialogue.prototype.getOption = function () {
        return this.option;
    };
    // Вернуть варианты ответа 
    Dialogue.prototype.getResponse = function () {
        var responses = [];
        for (var i = 0; i < this.branches.length; i++) {
            var json_str = fs.readFileSync(this.branches[i]).toString();
            var dialogue_option = JSON.parse(json_str);
            if (dialogue_option.keyword == null || dialogue_option.keyword in session.keywords) {
                responses.push([dialogue_option.getOption(), this.branches[i]]);
            }
        }
        return responses;
    };
    return Dialogue;
}());
