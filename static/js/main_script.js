const { randomInt } = require("crypto")

// Появление и исчезание дела
let case_element = document.getElementsByClassName('case-container')[0]
let case_open = document.getElementById('case-open')
function show_case(){
   case_open.style.display = 'none' 
   case_element.style.display = 'block' 
   case_element.scrollIntoView()
}
function hide_case(){
    case_element.style.display = 'none' 
    case_open.style.display = 'block'
    case_open.scrollIntoView() 
 }
 case_element.style.display = 'none'
 // Печать диалогов
 let current_interviewee = null
 let current_choice = null
 let options = null
 let path_to_interviewee = 'static/data/'
 $('#case_num').text("Дело &numero; "+Math.floor(Math.random()*10))
 function print_interviewee_case(){
    $('#description').text(current_interviewee.name+' '
    +current_interviewee.surname+', '
    +current_interviewee.description)
 }
 function print_lines(text, role){
   sentences = text.split('.')
   for (let i = 0; i < sentences.length; i++) {
      const line = array[i];
      $('#dialogue-container').append('<div class="'+role+'-line">'+
      line+'<div>');
   }
 }
 function switch_interviewee(id){
   $.ajax({
      url:'/get_next_dialogue',
      type: 'get',
         data:{
            next_file: path_to_interviewee+id 
         },
         success: function(result){
            current_interviewee = JSON.parse(result);
            print_interviewee_case();
         }
               });
 }
 function print_dialogue(){
    // choice - выбор который привёл к текущему диалогу
    // В классе это option
   if (current_choice === null){// Начало игры
      
   }
   print_lines(current_choice.answer, 'interviewee');
   options = [];
   $('#choices-container').html('');
   for (let i = 0; i < current_choice.branches.length; i++) {
      const element = current_choice.branches[i];
      $.ajax({
         url:'/get_next_dialogue',
         type: 'get',
         data:{
            next_file: element
         },
         async: false,
         success: function(result){
            let choice = JSON.parse(result);
            options.push(choice);
            $('#choices-container').append('<div class="choice" id="'+i+'">'+
            choice.option);
         }
               });
      $('.choice')[i].click(function(){
         let curr_id = this.id;
         if(options[curr_id].interviewee_id != current_interviewee.id){
            switch_interviewee(options[curr_id].interviewee_id)
         }
         print_lines(current_choice.option, 'protagonist')
         current_choice = options[curr_id];
         $.ajax({
            url:'/add_keyword',
            data:{keyword: current_choice.add_keyword},
            type: 'post',
            success: function(result){
               console.log("Done!")
            }
         });
         print_dialogue();
      })
   }
   

 }
 print_dialogue();