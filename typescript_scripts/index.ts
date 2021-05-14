import * as fs from 'fs';
import * as path from 'path';
import { domainToASCII } from 'url';
// История
class Story{
    // Данные об игроке и игровой сессии
    keywords : string[] = null as any;

    addKeyword(key: string){
        this.keywords.push(key);
    }

}
export let session = new Story(); 
// Допрашиваемые
class  Interviewee{
    // Данные о допрашиваемом 
    name: string;
    surname: string;
    description: string;
    photo: string;
    id: number;

    constructor(name: string, surname: string, 
        description: string, photo: string,id: number){

            this.name = name;
            this.surname = surname;
            this.description = description;
            this.photo = photo;
            this.id = id;

        }

}

// Диалог вопрос - ответ
class Dialogue{
    // Наша реплика, которая приведет к этой
    // инстанции диалога
    option: string;
    // Ответ допрашиваемого
    answer: string;
    // Требуемые ключивые слова
    req_keywords: string[];
    // Ключевое слово, которое добавит этот диалог
    add_keyword: string;
    // Варианты нашего ответа
    branches: string[];
    // id допраштваемого, к которому относится диалог
    interviewee_id: number;
    constructor(option: string, answer: string,
        req_keywords: string[], add_keyword: string,
        branches: string[], interviewee_id:number){
        this.option = option;
        this.answer = answer;
        this.req_keywords = req_keywords;
        this.add_keyword = add_keyword;
        this.interviewee_id = interviewee_id;
        this.branches = branches;
    }
    
}
