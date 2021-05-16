"use strict";
exports.__esModule = true;
exports.session = void 0;
// История
var Story = /** @class */ (function () {
    function Story(num_of_interviewees) {
        // Данные об игроке и игровой сессии
        this.keywords = null;
        this.num_of_interviewees = num_of_interviewees;
    }
    Story.prototype.addKeyword = function (key) {
        this.keywords.push(key);
    };
    return Story;
}());
exports.session = new Story(5);
// Допрашиваемые
var Interviewee = /** @class */ (function () {
    function Interviewee(name, surname, description, photo, id) {
        this.name = name;
        this.surname = surname;
        this.description = description;
        this.photo = photo;
        this.id = id;
    }
    return Interviewee;
}());
// Диалог вопрос - ответ
var Dialogue = /** @class */ (function () {
    function Dialogue(option, answer, req_keywords, add_keyword, branches, interviewee_id) {
        this.option = option;
        this.answer = answer;
        this.req_keywords = req_keywords;
        this.add_keyword = add_keyword;
        this.interviewee_id = interviewee_id;
        this.branches = branches;
    }
    return Dialogue;
}());
