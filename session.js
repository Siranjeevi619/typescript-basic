sessionStorage.setItem("Hello", "Steve");
var userId = sessionStorage.getItem("Hello");
if (userId) {
    console.log("Stored value:", userId);
}
else {
    console.log("No value found");
}
