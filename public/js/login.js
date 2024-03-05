let success = "no";
let form = document.querySelector("#container")
let user_name = document.querySelector("#Username")
let password = document.querySelector("#password")

form.addEventListener("submit", (event) => {
    formValidation();
    if (isFormValid()) {
        // event.preventDefault();
        // check_user_validity()
        form.submit()
    }
    else{
        event.preventDefault();
    }
})

// async function check_user_validity(){
//     try{
//         const response = await fetch('checkUsers', {
//             method: 'post',
//             headers: {'Content-Type': 'application/json'},
//             body: JSON.stringify({
//               'user_name': user_name,
//               'password' : password,
//             })
//           })
//         const data = await response.json()

//     }catch(err){
//         console.log(err)
//     }
// }


user_name.addEventListener("change", (event) => {
    username_validation()
    
})

password.addEventListener("change", (event) => {
    password_validation()
    
})

function isFormValid(){
    let input_box = document.querySelectorAll(".input_box")
    let result = true
    input_box.forEach((box) => {
        if (box.classList.contains("error")) {
            result = false
        }
    });
    return result
}

function formValidation(){
    get_data_form_db()
}

function setError(element, message){
    const parent = element.parentElement;
    if (parent.classList.contains("success")) {
        parent.classList.remove("success")
    }
    parent.classList.add("error")
    const para = parent.querySelector("p")
    para.textContent = message
}

function setSuccess(element, message) {
    const parent = element.parentElement;
    if (parent.classList.contains("error")) {
        parent.classList.remove("error")
    }
    parent.classList.add("success")
    const para = parent.querySelector("p")
    para.textContent = message
}
