'use strict'

let allowed_words = []
let valid_words = []
let current_word = ""
let entered = []
let game_over = false

const win_messages = ["congrats", "brilliant", "well done", "you got it", "awesome"]
const lost_messages = ["welp... better luck next time", "you missed it...", "well you can try again next time"]

// fetch initial data from .json
const fetch_data = async () => {
    await fetch("data/words.json").then(res => res.json()).then(json => {
        allowed_words = json.allowed
        valid_words = json.valid
    })
}

const set_random_word = () => {
    let randomIndex = Math.floor( Math.random() * allowed_words.length )
    current_word = allowed_words[randomIndex]
}

// word checking

const check_word = (word) => {
    if (word == current_word) { return 1 }
    else if (allowed_words.includes(word)) { return 0 }
    else if (valid_words.includes(word)) { return 0 }
    else { return -1 }
}

const check_hints = (word) => {
    let hints = {"correct": [], "included": []}
    for (let [i, v] of word.entries()) {
        if (current_word[i] == v) {
            hints["correct"].push(i)
        }
        else if (current_word.includes(v)) {
            hints["included"].push(i)
        }
    }
    return hints
}

// key press event listener

const key_pressed = (key) => {
    if (game_over == true) { 
        return
     }

    if (key == "enter") {
        if (entered.length < 5) { 
            show_message("5 letter words only")
        }
        // if all 5 letters are in place, then check the word
        else {
            let included = check_word(entered.join(""))
            console.log(included)
            if (included == 1) {
                let hints = check_hints(entered)
                enter_word(entered, hints)
                entered = []
                
                round_over(1) // game won
                return // returns so it doesn't trigger the round_over(0) at the end of this method

            }
            else if (included == 0) {
                let hints = check_hints(entered)
                enter_word(entered, hints)
                entered = []
            }
            else if (included == -1) {
                show_message("invalid word")
            }
        }
    }
    else if (key == "backspace") {
        entered.pop()
        hide_letter()
    }
    else if (entered.length < 5) {
        entered.push(key)
        show_letter(key)
    }

    if (current_row > 5 && game_over == false) {
        // check if after pressing enter, game is over
        round_over(0)
        return
    }

}

this.addEventListener('keydown', e => {
    let check = /^[a-z]{1}$|enter|backspace/i 
    if (check.test(e.key)) {
        key_pressed(e.key.toLowerCase()) 
    }
})

// game manager

const reset_ui= () => {
    current_row = 0
    current_letter = 0
    let rows = document.getElementsByClassName("grid-row")
    for (let row of rows) {
        let squares = row.getElementsByClassName("grid-square")
        for (let square of squares) {
            let span = square.getElementsByTagName("span")[0]
            if (span.textContent != "") {
                document.getElementById(`kb-key-${span.textContent}`).classList.remove("g-1", "g-2", "g-3")
                span.textContent = ""
            }
            square.classList.remove("g-1", "g-2", "g-3")
        }
    }
}

const round_over = (condition) => {
    game_over = true
    // setTimeout so user can see the results for a few seconds ;)
    setTimeout(() => {
        if (condition == 1) {
            let main_msg = win_messages[Math.floor( Math.random() * win_messages.length )]
            show_message(main_msg, `you guessed "${current_word}" correctly!`)
        }
        else {
            let main_msg = lost_messages[Math.floor( Math.random() * lost_messages.length )]
            show_message(main_msg, `the correct word was "${current_word}"`)
        }
        setTimeout(restart, 3600)
    }, 1000)
}

const restart = () => {
    entered = []
    reset_ui()
    set_random_word()
    game_over = false
}

const init = async () => {
    await fetch_data()
    set_random_word()
}

init()



