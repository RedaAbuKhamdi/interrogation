// История
class Story{
    // Данные об игроке и игровой сессии
    interviewees : Interviewee[];

}
// Допрашиваемые
class  Interviewee{
    // Данные о допрашиваемом 
    name: string;
    surname: string;
    description: string;
    current_dialogue: Dialogue;

}

// Диалог вопрос - ответ
class Dialogue{
    // Наша реплика, которая приведет к этой
    // инстанции диалога
    option: string;
    // Ответ допрашиваемого
    answer: string;
    // Варианты нашего ответа
    branches: Dialogue[];
    // Getters
    getOption(){
        return this.option
    }
    // Вернуть варианты ответа 
    getResponse(){
        let responses: string[];
        for (let i = 0; i < this.branches.length; i++) {
            
            responses.push(this.branches[i].getOption())
            
        }
        return responses
    }
}