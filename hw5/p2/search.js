// Search is Empty
function isEmpty() {
    const value = document.getElementById("search_field").value
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