let form = document.querySelector("#form")
let user_name = document.querySelector("#Username")
let email = document.querySelector("#email")
let password = document.querySelector("#password")
let confirm_password = document.querySelector("#confirm_password")
let role = document.querySelector("#role")

form.addEventListener("submit", (event) => {
    // event.preventDefault();
    formValidation();
    if (isFormValid()) {
        form.submit()
        // add_user()
    }else{
        event.preventDefault()
    }
})


// async function add_user(){
//     try{
//         console.log("working")
//         const response = await fetch('add_User', {
//             method: 'post',
//             headers: {'Content-Type': 'application/json'},
//             body: JSON.stringify({
//               'user_name': user_name,
//               'email': email,
//               'password' : password,
//               'role': role
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

email.addEventListener("change", (event) => {
    email_validation()
})

password.addEventListener("change", (event) => {
    password_validation()
})

confirm_password.addEventListener("change", (event) => {
    confirm_password_validation()
})

role.addEventListener("change", (event) => {
    role_validation()
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


function username_validation() {
    if (user_name.value.trim() == "") {
        setError(user_name, "username cannot be empty")
    }
    else if(user_name.value.trim().length < 5 || user_name.value.trim().length > 20){
        setError(user_name, "username must be between 5 to 20 characters")
    }
    else{
        setSuccess(user_name, "success")
    }
}


function email_validation() {
    if(email.value.trim()==''){
        setError(email, 'Provide email address');
    }else if(isEmailValid(email.value)){
        setSuccess(email, "success");
    }else{
        setError(email, 'Provide valid email address');
    }
}


function password_validation() {
    if(password.value.trim()==''){
        setError(password, 'Password can not be empty');
    }else if(password.value.trim().length <6 || password.value.trim().length >20){
        setError(password, 'Password min 6 max 20 charecters');
    }else {
        setSuccess(password, "success");
    }
}


function confirm_password_validation() {
    if(confirm_password.value.trim().length <6 || confirm_password.value.trim().length >20){
        setError(confirm_password, 'Password min 6 max 20 charecters');
    }else if(password.value.trim()==confirm_password.value.trim()){
        setSuccess(confirm_password, "success");
    }else if(password.value.trim()!==confirm_password.value.trim()){
        setError(confirm_password, 'password and confirm password not same');
    }
}

// function role_validation() {
//     if(role.value.trim()=='hod'){
//         setSuccess(role, "success");
//     }else if(role.value.trim()=='faculty'){
//         setSuccess(role, "success");
        
//     }else {
//         setError(role, 'please enter hod or faculty');
//     }
// }


function formValidation(){
    username_validation()    

    email_validation()

    password_validation()

    // role_validation()

    confirm_password_validation()
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

function isEmailValid(email){
    const reg =/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    return reg.test(email);
}


function push_to_firebase(){
    let input_value = {
        userName: `${user_name.value}`,
        email: `${email.value}`,
        password: `${password.value}`,
        role: `${role.value}`
    }
    push(users_in_db, input_value)
}