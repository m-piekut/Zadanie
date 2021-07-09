const textArea = document.querySelector('.content__textArea')
const addBtn = document.querySelector('.content__button--add')
const generate = document.querySelector('#generate')
const generateBtn = document.querySelector('.content__button--generate')
const form = document.querySelector('.content')
const title1 = document.querySelector('.step2__edits__title1')
const title2 = document.querySelector('.step2__edits__title2')
const title3 = document.querySelector('.step2__edits__title3')
const edit1 = document.querySelector('.step2__edits1')
const edit2 = document.querySelector('.step2__edits2')
const edit3 = document.querySelector('.step2__edits3')




let phrasesArr= []



const addPhrase = (e)=>{
    e.preventDefault()
    if(phrasesArr.length ===3 ){
        alert('You added 3 phrases already!')
    }else{
        phrasesArr.push(textArea.value)
        textArea.value = ''
        console.log(phrasesArr)
        p1.textContent = phrasesArr[0]
        p2.textContent = phrasesArr[1]
        p3.textContent = phrasesArr[2]
        title1.textContent = phrasesArr[0]
        title2.textContent = phrasesArr[1]
        title3.textContent = phrasesArr[2]
        phrasesArr.length ===3 ? (textArea.setAttribute('disabled',''), addBtn.setAttribute('disabled', '')) : false
        phrasesArr.length > 0 ?( generate.style.display = "block", addBtn.classList.remove('btn-primary')) : false
        phrasesArr.length >= 1 ? edit1.style.display ="block":  edit1.style.display ="none"
        phrasesArr.length >= 2 ? edit2.style.display ="block":  edit2.style.display ="none"
        phrasesArr.length >= 3 ? edit3.style.display ="block":  edit3.style.display ="none"



    }
    
    
    
    
    
}
const p1 = document.querySelector('.step2__phrase--1')
const p2 = document.querySelector('.step2__phrase--2')
const p3 = document.querySelector('.step2__phrase--3')
const colorpick1 = document.querySelector('#colorpick1')
const colorpick2 = document.querySelector('#colorpick2')
const colorpick3 = document.querySelector('#colorpick3')

colorpick1.addEventListener('change', (e)=>{
    p1.style.color = e.target.value
})
colorpick2.addEventListener('change', (e)=>{
    p2.style.color = e.target.value
})
colorpick3.addEventListener('change', (e)=>{
    p3.style.color = e.target.value
})







const colorGenerator= ()=>{
    const randomColor1 = Math.floor(Math.random()*16777215).toString(16);
    const randomColor2 = Math.floor(Math.random()*16777215).toString(16);
    const randomColor3 = Math.floor(Math.random()*16777215).toString(16);
    p1.style.color = '#' + randomColor1
    colorpick1.value = '#' + randomColor1
    
    
    p2.style.color = '#' + randomColor2
    colorpick2.value = '#' + randomColor2
    p3.style.color = '#' + randomColor3
    colorpick3.value = '#' + randomColor3
}

colorGenerator()
form.addEventListener('submit', addPhrase)

const letDrag = (el , obj)=>{
    const position = { x: 0, y: 0 }
    interact(el).draggable({
        listeners: {
            start (event) {
                console.log(event.type, event.target)
            },
            move (event) {
                position.x += event.dx
                position.y += event.dy
                obj.position_x = position.x
                obj.position_y = position.y
                event.target.style.transform =
                `translate(${position.x}px, ${position.y}px)`
                
            },
        },
        modifiers: [
            interact.modifiers.restrict({
                restriction: 'parent',
                endOnly: true
            })
        ]
    })
    
}
const colorPicker = document.querySelector('.color-slider-wrap')
const edits = document.querySelector('.step2__edits')

let send = [
        pharse1 = {
            text: p1.textContent,
            position_x : 0,
            position_y : 0,
            color: ''

        },
        pharse2 = {
            text: p1.textContent,
            position_x : 0,
            position_y : 0,
            color: ''

        },
        pharse3 = {
            text: p1.textContent,
            position_x : 0,
            position_y : 0,
            color: ''

        },
   ]


letDrag(p1, send[0])
letDrag(p2, send[1])
letDrag(p3, send[2])

const slideUpAll = () =>{
    $('.colorPicker1').slideUp(500)
    $('.colorPicker2').slideUp(500)
    $('.colorPicker3').slideUp(500)
    
}


$('.arrow1').click(()=>{slideUpAll(); $('.colorPicker1').slideDown(500)})
$('.arrow2').click(()=>{slideUpAll(); $('.colorPicker2').slideDown(500)})
$('.arrow3').click(()=>{slideUpAll(); $('.colorPicker3').slideDown(500)})
$('#step1').click(()=>{$('.step1').fadeIn(500); $('.step2').fadeOut(500)})
$('#generate').click(()=>{$('.step2').fadeIn(500); $('.step1').fadeOut(500)})
   const sendBtn = document.querySelector('#send')

   sendBtn.addEventListener('click',()=>{
        send[0].color = colorpick1.value
        send[0].text = phrasesArr[0]
        send[1].color = colorpick2.value
        send[1].text =phrasesArr[1]
        send[2].color = colorpick3.value
        send[2].text = phrasesArr[2]
    

        $.ajax({
            type: 'POST',
            url : 'http://dummy.restapiexample.com/api/v1/create',
            data: send,
            success: function(){console.log('udało się');},
            error: function(){console.log('nie udało się');},
        })



   })
   $('.step2').fadeOut(0)