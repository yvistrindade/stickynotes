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

<<<<<<< HEAD
// == Fim - CRUD Create ============================
// =================================================


// =================================================
// == Resetar o formulário =========================

api.resetForm((args) => {
    // recarregar a página notas
    location.reload()
    // recarregar a página principal(atualizar notas)
    api.updateList()
})
=======
api.resetForm((args) => {
>>>>>>> b7d79323e04ad183ca2cde4fb4e0f7b058fab6f3

    location.reload()
    api.updateList()
})