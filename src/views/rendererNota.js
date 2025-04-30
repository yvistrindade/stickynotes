const foco = document.getElementById('inputNote')

document.addEventListener('DOMContentLoaded', () => {
    foco.focus()
})

let frmNote = document.getElementById('frmNote')
let note = document.getElementById('inputNote')
let color = document.getElementById('selectColor')

frmNote.addEventListener('submit', (event) => {
    event.preventDefault()
    console.log(note.value, color.value)
    const stickyNote = {
        textNote: note.value,
        colorNote: color.value
    }
    api.createNote(stickyNote)
})

api.resetForm((args) => {

    location.reload()
    api.updateList()
})