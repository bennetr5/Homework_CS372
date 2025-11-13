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

function feelingLucky() {
    const field = document.getElementById("search_field")
    const search = field.value.trim()

    if (!search) { return }

    fetch('/lucky', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify({ search })
    })
        .then(res => res.json())
        .then(data => {
            document.getElementById("message").innerText = data.message
        })
        .catch(err => console.error(err));
}

function getTemp(event) {
    const input = document.getElementById("search_field").value

    if (input.substring(0, 5).toUpperCase() === "TEMP:") {
        event.preventDefault()

        $.ajax({
            type: 'GET',
            url: `index.js?q=${input}`,
            success: function (response) {
                try {
                    temp = ((response.main.temp - 273.15) * 1.8 + 32).toFixed(2)
                    document.getElementById("message").innerText = `Current temperature at ${input.substring(5).trim()} is ${temp}`
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
    else {
        event.preventDefault();     // make sure this is inside the function and `event` is defined
        const input = document.getElementById("search_field").value.trim();

        let url = '/search';
        if (input) {
            url = `/search?q=${encodeURIComponent(input)}`;
        }

        $.ajax({
            type: 'GET',
            url: url,
            success: function (response) {
                console.log("AJAX response: ", response)
                if (response && Array.isArray(response.message)) {
                    const list = response.message.join(", ")
                    document.getElementById("message").innerText = list
                }
                else {
                    document.getElementById("message").innerText = "No previous searches found."
                }
            },
            error: function () {
                document.getElementById("message").innerText = "Error fetching previous searches."
            }
        })
    }

}