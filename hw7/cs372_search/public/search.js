// Search is Empty
function isEmpty() {
    const value = document.getElementById("search_field").value
    console.log(value)
    const errorMessage = document.getElementById("message")
    if (value === "") {
        errorMessage.innerHTML = "Search string cannot be empty"
        errorMessage.style.color = "red"
        return false
    }
    return true
}
// Feeling Lucky Button is Pressed Uppercase Search in Blue
function feelingLucky() {
    if (!isEmpty()) { return }
    const value = document.getElementById("search_field").value
    const lucky = document.getElementById("message");
    lucky.innerHTML = value.toUpperCase();
    lucky.style.color = "blue"
}

function getTemp(event) {
    const input = document.getElementById("search_field").value

    if (input.substring(0, 5).toUpperCase() === "TEMP:") {
        event.preventDefault()

        const location = input.substring(5).trim()
        $.ajax({
            type: 'POST',
            url: "/index.js",
            data: JSON.stringify({
                q: location
            }),
            contentType: "application/json",
            success: function (response) {
                try {
                    temp = ((response.main.temp - 273.15) * 1.8 + 32).toFixed(2)
                    document.getElementById("message").innerText = `Current temperature at ${location} is ${temp}`
                }
                catch (error) {
                    document.getElementById("message").innerText = "city not found"
                }
            },
            error: function () {
                document.getElementById("message").innerText =
                    "city not found"
            }
        })
    }
}