// front-end code
let current_row = 0
let current_letter = 0

const show_letter = (letter) => {
    if (current_row > 5) { return }
    let element = document.getElementsByClassName("grid-row")[current_row].getElementsByClassName("grid-square")[current_letter]
    let span = element.getElementsByTagName("span")[0]
    span.textContent = letter

    animate_element(element, "beat-in-out")
    
    current_letter += 1
} 

const hide_letter = () => {
    if (current_letter <= 0) { return }
    let element = document.getElementsByClassName("grid-row")[current_row].getElementsByClassName("grid-square")[current_letter-1]
    let span = element.getElementsByTagName("span")[0]
    span.textContent = ""

    animate_element(element, "beat-out-in")
    

    current_letter -= 1
}

const enter_word = (word, hints) => {
    let element_list = document.getElementsByClassName("grid-row")[current_row].getElementsByClassName("grid-square")
    let i = 0
    for (let element of element_list) {
        let kb_key = document.getElementById(`kb-key-${word[i]}`)

        if (hints["correct"].includes(i)) {
            element.classList.add("g-3")
            kb_key.classList.add("g-3")
        }
        else if (hints["included"].includes(i)) {
            element.classList.add("g-2")
            kb_key.classList.add("g-2")
        }
        else {
            element.classList.add("g-1")
            kb_key.classList.add("g-1")
        }

        animate_element(element, "beat-in-out")
        animate_element(kb_key, "beat-in-out")
        
        i++
    }
    current_row += 1
    current_letter = 0
}

const animate_element = (element, animation) => {
    element.classList.add(`animate-${animation}`)
        setTimeout(() => {
            element.classList.remove(`animate-${animation}`)
        }, 200)
}