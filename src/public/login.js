const $button = document.querySelector('.form-input-btn');

const templateErr = (json)=>{
  const $section = document.querySelector('.error')
  const $template = document.querySelector('.template-error').content,
    clone = document.importNode($template, true)
  
    clone.querySelector('.message').textContent = json.errorSession
  $section.appendChild(clone)
}


document.addEventListener('click' , e =>{


  if(e.target === $button){
    e.preventDefault()
    	
      
    
    }
  
})


async function response(){
  try{

    let f = await fetch('http://localhost:3000/notfound')
    let json = await f.json();
    templateErr(json)
  }catch(error){
    console.log(error)
  }
}