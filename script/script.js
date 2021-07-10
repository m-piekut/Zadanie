const textArea = document.querySelector('.content__textArea')
const addBtn = document.querySelector('.btn-primary--add')
const generate = document.querySelector('#generate')
const generateBtn = document.querySelector('.content__button--generate')
const form = document.querySelector('.content')
const added = document.querySelector('#test')


const draggableArea = document.querySelector('.step2__phrases')
const draggableItems = document.getElementsByClassName('draggable')
const colorWrappers = document.getElementsByClassName('colorPicker')
const editArea = document.querySelector('.step2__editsWrapper')



let pharsesQuantity = 20

const letDrag = (el) => {
    const position = {
        x: 0,
        y: 0
    }
    interact(el).draggable({
        listeners: {
            start(event) {
                console.log(event.type, event.target)
            },
            move(event) {
                position.x += event.dx
                position.y += event.dy
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



let phrasesArr = []

let clickedBtn = ''

addItem = (e) => {
    e.preventDefault()
    addBtn.classList.remove('btn-primary--active')
    $(generate).fadeIn(200)

    if (phrasesArr.length === pharsesQuantity) {
        alert(`You added ${pharsesQuantity} phrases already!`)
    } else {
        //dragable item
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);
        let item = document.createElement("p")
        item.classList = "step2__phrase draggable"
        item.textContent = textArea.value
        item.style.color = '#' + randomColor
        item.addEventListener('mousedown', ()=>{
            for (const item of draggableItems) {
                item.style.border = '1px dashed transparent'
            };
            item.style.border ='1px dashed grey'}
            )

        //edit item

        // let editItemWrapper = document.createElement("div")
        // editItemWrapper.classList = "step2__edits"
        let editItem = document.createElement("div")
        editItem.classList = "step2__edits"
        editItem.innerHTML = `
                <div class="step2__edits__up">
                <img class="step2__edits__A" src="./assets/icon-text.png" alt="">
                <p class="step2__edits__title3">${textArea.value}</p>
                </div>
                `;

        let upSection = editItem.querySelector('.step2__edits__up')
        let arrow = document.createElement('button')
        arrow.classList = "step2__button"
        arrow.innerHTML = `<img class="step2__edits__arrow arrow3" src="./assets/icon-arrow.png" alt="">`
        upSection.append(arrow)

        // COLOR PICKER

        let colorPicker = document.createElement('INPUT')
        colorPicker.setAttribute('type', 'color')
        colorPicker.value = '#' + randomColor
        let colorWrapper = document.createElement('div')
        colorWrapper.classList = "colorPicker"
        colorWrapper.innerHTML = '<p>Pick color</p>'


        $(editItem).append(colorWrapper)
        $(colorWrapper).append(colorPicker)
        colorPicker.addEventListener('change', (e) => {
            item.style.color = e.target.value
        })

        editItem.addEventListener('click', () => {
            for (const item of draggableItems) {
                item.style.border = '1px dashed transparent'
            }
            item.style.border = '1px dashed grey'
        })

        editArea.prepend(editItem)
        $(arrow).click(() => {
            if (clickedBtn !== colorWrapper) {
                $(clickedBtn).slideUp(400)
                $(colorWrapper).slideDown(400)

            } else {
                colorWrapper.style.display === 'none' ? $(colorWrapper).slideDown(400) : $(colorWrapper).slideUp(400)
                item.style.border = '1px solid transparent'
            }
            clickedBtn = colorWrapper
        })

        phrasesArr.push(textArea.value)
        letDrag(item)
        draggableArea.prepend(item)
        textArea.value = ''

        if (phrasesArr.length === pharsesQuantity) {
            addBtn.setAttribute('disabled', '')
            textArea.setAttribute('disabled', '')
        }
    }
}

form.addEventListener('submit', (e) => addItem(e))


const colorPicker = document.querySelector('.color-slider-wrap')
const edits = document.querySelector('.step2__edits')

// let send = [
//         pharse1 = {
//             text: p1.textContent,
//             position_x : 0,
//             position_y : 0,
//             color: ''

//         },
//         pharse2 = {
//             text: p1.textContent,
//             position_x : 0,
//             position_y : 0,
//             color: ''

//         },
//         pharse3 = {
//             text: p1.textContent,
//             position_x : 0,
//             position_y : 0,
//             color: ''

//         },
//    ]










$('#step1').click(() => {
    $('.step1').fadeIn(500);
    $('.step2').fadeOut(500)
})
$('#generate').click(() => {
    $('.step2').fadeIn(500);
    $('.step1').fadeOut(500)
})
$('#step2').click(() => {
    $('.step2').fadeIn(500);
    $('.step1').fadeOut(500)
})
const sendBtn = document.querySelector('#send')

sendBtn.addEventListener('click', () => {
    // send[0].color = colorpick1.value
    // send[0].text = phrasesArr[0]
    // send[1].color = colorpick2.value
    // send[1].text =phrasesArr[1]
    // send[2].color = colorpick3.value
    // send[2].text = phrasesArr[2]


    // $.ajax({
    //     type: 'POST',
    //     url : 'http://dummy.restapiexample.com/api/v1/create',
    //     data: send,
    //     success: function(){console.log('udało się');},
    //     error: function(){console.log('nie udało się');},
    // })
    showItem('text')


})
   $('.step2').fadeOut(0)