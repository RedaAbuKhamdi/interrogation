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
 let path_to_data = 'static/data/'
 $('#case_num').text("Дело &numero; "+Math.floor(Math.random()*10))
 function print_interviewee_case(){
    $('#description').text(current_interviewee.name+' '
    +current_interviewee.surname+', '
    +current_interviewee.description)
 }
 function print_lines(text, role){
   sentences = text.split('.')
   for (let i = 0; i < sentences.length; i++) {
      const line = sentences[i];
      if (line != ''){
         $('#dialogue-container').append('<div class="'+role+'-line">'+
         line+'<div>');
      }
   }
 }
 function switch_interviewee(id){
   $.ajax({
      url:'/get_next_dialogue',
      type: 'get',
         data:{
            next_file: path_to_data+id+'.json'
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
      switch_interviewee(1);
      $.ajax({
         url:'/get_next_dialogue',
         type: 'get',
            data:{
               next_file: path_to_data+'1_1_1'+'.json' 
            },
            async:false,
            success: function(result){ 
               current_choice = JSON.parse(result)
            }
                  });
   }
   console.log(current_choice);
   print_lines(current_choice.answer, 'interviewee');
   options = [];
   $('#choices-container').html('');
   for (let i = 0; i < current_choice.branches.length; i++) {
      const element = current_choice.branches[i];
      $.ajax({
         url:'/get_next_dialogue',
         type: 'get',
         data:{
            next_file: path_to_data+element
         },
         async: false,
         success: function(result){
            let choice = JSON.parse(result);
            options.push(choice);
            $('#choices-container').append('<div class="choice" id="'+i+'">'+
            choice.option);
         }
               });
      $('.choice').eq(i).click(function(){
         let curr_id = this.id;
         if(options[curr_id].interviewee_id != current_interviewee.id){
            switch_interviewee(options[curr_id].interviewee_id)
         }
         current_choice = options[curr_id];
         print_lines(current_choice.option, 'protagonist')
         $.ajax({
            url:'/add_keyword',
            data:JSON.stringify({keyword: current_choice.add_keyword}),
            type: 'post',
            dataType: 'json',
            contentType: 'application/json',
            success: function(result){
               console.log("Done!")
            }
         });
         print_dialogue();
      })
   }
   

 }
 print_dialogue();