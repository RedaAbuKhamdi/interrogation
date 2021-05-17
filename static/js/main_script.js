function sleep(ms) {
   return new Promise(resolve => setTimeout(resolve, ms));
 }
// Появление и исчезание дела
let case_element = document.getElementsByClassName('case-container')[0]
let case_open = document.getElementById('case-open')
let num_of_interviewees = 1;
$.ajax({
   url: '/get_num_of_interviewees',
   type: 'get',
   async: false,
   success: function (result){
      num_of_interviewees = parseInt(result);
   }
})
function show_case(){
   case_open.style.display = 'none' 
   case_element.style.display = 'block' 
   case_element.scrollIntoView()
}
function hide_case(){
    case_element.style.display = 'none';
    case_open.style.display = 'block';
    case_open.scrollIntoView();
 }
 case_element.style.display = 'none';
 // Печать диалогов
 let current_interviewee = null;
 let current_choice = null;
 let options = null;
 let question_lim = 5;
 let path_to_data = 'static/data/utf8/';
 $('#case_num').text("Дело &numero; "+Math.floor(Math.random()*10))
 function print_interviewee_case(){
    $('#description').html(current_interviewee.name+' '
    +current_interviewee.surname+', '
    +current_interviewee.description)
 }
 function print_lines(text, role){
   sentences = text.split('.')
   let wait_time = 0
   for (let i = 0; i < sentences.length; i++) {
      const line = sentences[i];
      if (line != '' && line != 'null' && line != null){
         sleep(800*i).then(() => {
            $('#dialogue-container').append('<div class="'+role+'-line">'+
         line+'<div>');
            $('#dialogue-container')[0].scrollTop = $('#dialogue-container')[0].scrollHeight - $('#dialogue-container')[0].clientHeight;
         })
         wait_time+=1;
      }
   }
   return wait_time;

 }
 function switch_interviewee(id){
   $.ajax({
      url:'/get_next_dialogue',
      type: 'get',
         data:{
            next_file: path_to_data+id+'.json'
         },
         success: function(result){
            console.log(result);
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
   let wait_time = print_lines(current_choice.answer, 'interviewee');
   options = [];
   $('#choices-container').html('');
   sleep(1000*wait_time).then(()=>{
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
               result = result.replace(/\\n/g, "\\n")  
               .replace(/\\'/g, "\\'")
               .replace(/\\"/g, '\\"')
               .replace(/\\&/g, "\\&")
               .replace(/\\r/g, "\\r")
               .replace(/\\t/g, "\\t")
               .replace(/\\b/g, "\\b")
               .replace(/\\f/g, "\\f");
               result = result.replace(/[\u0000-\u0019]+/g,"");
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
               question_lim = 5;
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
   })
   

 }
 function get_case_data(dir){
   console.log(num_of_interviewees);
   let next_id = parseInt(current_interviewee.id)+parseInt(dir);
   if (next_id > num_of_interviewees){
      next_id = 1;
   }else if(next_id <= 0){
      next_id = num_of_interviewees;
   }
   console.log(next_id);
   switch_interviewee(next_id);
 }
 print_dialogue();