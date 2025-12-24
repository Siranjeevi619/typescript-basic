sessionStorage.setItem("Hello", "Steve");

const userId: string | null = sessionStorage.getItem("Hello");

if (userId) {
  console.log("Stored value:", userId);
} else {
  console.log("No value found");
}
