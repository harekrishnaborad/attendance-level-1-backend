const scanner = new Html5QrcodeScanner('reader', { 
    // Scanner will be initialized in DOM inside element with id of 'reader'
    qrbox: {
        width: 250,
        height: 250,
    },  // Sets dimensions of scanning box (set relative to reader element width)
    fps: 20, // Frames per second to attempt a scan
  });
  
  
  scanner.render(success, error);
  // Starts scanner
  
  function success(result) {
  
    document.getElementById('result').innerHTML = `
    <h2>Success!</h2>
    <p>${result}</p>
    `;
    // Prints result inside the result element
  
    
    // Clears scanning instance
  
    // document.getElementById('reader').remove();
    // document.getElementById('footer').remove();
    // Removes reader and footer elements from DOM since they are no longer needed
    
    let subject_name = document.querySelector("#subject_name")
    let subject_name_value =  subject_name.value


    async function post_enrollment_no(){
      try{
          const response = await fetch('addEnrollmentNo', {
              method: 'post',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                'enrollment_no': result,
                'subject_name_value': subject_name_value
              })
            })
          const data = await response.json()
          console.log(data)
          location.reload()
  
      }catch(err){
          console.log(err)
      }
    }
    post_enrollment_no()
  }
  
  function error(err) {
    console.error(err);
    // Prints any errors to the console
  }
  
  
  
  
  // Enter enrollment no manually
  let submit_button = document.querySelector("#submit_button")
  submit_button.addEventListener("click", function(){
    let input_value = document.querySelector("#input_field").value
    success(input_value)
  })

let stop_scanning = document.querySelector("#stop_scanning")
stop_scanning.addEventListener("click", function(){
  scanner.clear();
  console.log("stop scanning")
})