function member(section) {
    for (let i = 1; i < 7; i++) {
        if(i == section) {
            document.getElementById(`member${i}`).style.display = `flex`
        } else {
            document.getElementById(`member${i}`).style.display = `none`
        }    
    }
}