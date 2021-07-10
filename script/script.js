const textArea = document.querySelector('.content__textArea') // input do wpisywania wartości
const addBtn = document.querySelector('.btn-primary--add') //przyciks do dodawania frazy
const generate = document.querySelector('#generate') //przycisk do generwania
const form = document.querySelector('.content')
const added = document.querySelector('#test') //przycisk testowy


const draggableArea = document.querySelector('.step2__phrases') // wrapper otaczający przesuwane frazy
const draggableItems = document.getElementsByClassName('draggable') // każda fraza 
const colorWrappers = document.getElementsByClassName('colorPicker') // wszystkie color Wrappery
const arrows = document.getElementsByClassName('step2__button') // wszystkie strzałki do pokazywania zmiany koloru
const editArea = document.querySelector('.step2__editsWrapper') // obszar na którym pojawiają sie elementy z mozliwościa edytowania koloru



let pharsesQuantity = 3 // ilość fraz które można wpisać

//funkcja do zmiany kolory elementów na koszulce
const changeColor = (element, picker, random) => {
    picker.addEventListener('input', function (e) {
        let hue = ((this.value / 100) * 360).toFixed(0)
        let hsl = "hsl(" + hue + ", 100%, 50%)"       
        picker.style.color = hsl
        element.style.color = `${hsl}`
    });
    element.value = random;
    var event = new Event('input');
    element.dispatchEvent(event);

}




// funkcja do przeciągania elementów na koszulce 

const letDrag = (el, sendItem) => {
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
                sendItem.position_x = position.x
                sendItem.position_y = position.y
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

    //template itemu który dołączamy do tablicy wysyłanej na server
    let sendItem = {
        text: '',
        position_x: 0,
        position_y: 0,
        color: '',
    }
    e.preventDefault()

    addBtn.classList.remove('btn-primary--active')
    $(generate).fadeIn(200)
    //obsługa ilości wpisanych fraz 
    if (phrasesArr.length === pharsesQuantity) {
        alert(`You added ${pharsesQuantity} phrases already!`)
    } else {
        let item = document.createElement("p")
        item.classList = "step2__phrase draggable"
        item.textContent = textArea.value

        item.addEventListener('mousedown', () => {
            for (const item of draggableItems) {
                item.style.border = '1px dashed transparent'
            };
            item.style.border = '1px dashed grey'
        })

        //add edit item on right section
        let editItem = document.createElement("div")
        editItem.classList = "step2__edits"
        editItem.innerHTML = `
            <div class="step2__edits__up">
            <img class="step2__edits__A" src="./assets/icon-text.png" alt="">
            <p class="step2__edits__title3">${textArea.value}</p>
            </div>
            `;

        let upSection = editItem.querySelector('.step2__edits__up')

        //tworzenie strzałki w danym editItemie
        let arrow = document.createElement('button')
        arrow.classList = "step2__button"
        arrow.innerHTML = `<img class="step2__edits__arrow arrow3" src="./assets/icon-arrow.png" alt="">`
        upSection.append(arrow)

        // COLOR PICKER

        let colorPicker = document.createElement('input')
        $(colorPicker).attr('type', 'range').attr('min', '0').attr('max', '100')
        colorPicker.classList = 'color-range'
        let colorWrapper = document.createElement('div')
        colorWrapper.classList = "colorPicker"
        colorWrapper.innerHTML = '<p>Pick color</p>'


        $(editItem).append(colorWrapper)
        $(colorWrapper).append(colorPicker)
        let randomRange = Math.floor(100 * Math.random())
        item.style.color = "hsl(" + ((randomRange / 100) * 360).toFixed(0) + ", 100%, 50%)"
        $(colorPicker).attr('value', randomRange)
        changeColor(item, colorPicker, randomRange)


        editItem.addEventListener('click', () => {
            //reset stylu zaznaczania
            for (const item of draggableItems) {
                item.style.border = '1px dashed transparent'
            }
            item.style.border = '1px dashed grey'
        })
        editArea.prepend(editItem)
        $(arrow).click(() => {
            //usuwanie odwrócenia strzałek
            for (const item of arrows) {
                item.classList.remove('rotate')
            }
            // jeżeli nie kliknąłeś 2 razy w te samą strzałkę
            if (clickedBtn !== colorWrapper) {
                arrow.classList.add('rotate')
                $(clickedBtn).slideUp(400)
                $(colorWrapper).slideDown(400)


            } else {
                if (colorWrapper.style.display === 'none') {
                    $(colorWrapper).slideDown(400)
                    arrow.classList.add('rotate')
                } else {
                    $(colorWrapper).slideUp(400)
                    arrow.classList.remove('rotate')
                }
                item.style.border = '1px solid transparent'
            }
            clickedBtn = colorWrapper
        })
        draggableArea.prepend(item)

        //Wywołanie funkcji przeciągania
        letDrag(item, sendItem)


        //Tworzenie i dodawanie elemenów do tablicy, którą wysyła się na serwer
        sendItem.text = textArea.value
        textArea.value = ''
        sendItem.color = item.style.color
        phrasesArr.push(sendItem)




        console.log(phrasesArr)

        if (phrasesArr.length === pharsesQuantity) {
            addBtn.setAttribute('disabled', '')
            textArea.setAttribute('disabled', '')
        }
    }
}

form.addEventListener('submit', (e) => addItem(e))


const colorPicker = document.querySelector('.color-slider-wrap')
const edits = document.querySelector('.step2__edits')













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

    let json = JSON.stringify(phrasesArr)
    phrasesArr.length > 0 ?
        ($.ajax('https://jsonplaceholder.typicode.com/posts', {
            type: 'POST', // http method
            data: json, // data to submit
            dataType: "json",
            success: function (data, status, xhr) {
                console.log('status: ' + status + ', data: ' + data)
                $(sendBtn).attr('disabled', '').text('Done')
                ;
            },
            error: function (jqXhr, textStatus, errorMessage) {
                console.log('Error' + errorMessage);
            }
        })) : alert(`Let's add some phrase first! :)`)



})
$('.step2').fadeOut(0)