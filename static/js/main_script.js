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