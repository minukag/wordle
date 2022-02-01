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

const show_message = (main, sub = null) => {
    const popup = document.getElementById("msg-alert")
    const subtext = document.getElementById("msg-alert-sub")
    document.getElementById("msg-alert-main").textContent = main
    if (sub) {
        subtext.classList.remove("popup-sub-hidden")
        subtext.textContent = sub
    }
    else { subtext.classList.add("popup-sub-hidden") }
    
    // toggle the popup animation to fade away in 2500+600 ms (3100)
    animate_element(popup, "zoom-down-in", 3000)
}

const hide_instructions = () => {
    const modal = document.getElementById("help-modal")
    modal.classList.remove("animate-zoom-down-in-center")
    help_modal = false
}

const animate_element = (element, animation, timing = 200) => {
    element.classList.add(`animate-${animation}`)
        setTimeout(() => {
            element.classList.remove(`animate-${animation}`)
        }, timing)
}