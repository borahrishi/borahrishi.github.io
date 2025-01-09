// Obfuscated Web App URL
const scriptURL = atob("aHR0cHM6Ly9zY3JpcHQuZ29vZ2xlLmNvbS9tYWNyb3Mvcy9BS2Z5Y2J5eWd2Tzd4MFNMWGRqWjNwLUNnNWRYSkxTMko0RDZITVZON0F5TEJCZDFMUldLX1pxWlJvSUpkQkx6VVJCMzV6N3FYZy9leGVj");

// Form submission handler
document.getElementById("contactForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value.trim();
    });

    const responseMessage = document.getElementById("formResponse");

    // Client-side validation
    const errorMessage = validateForm(data);
    if (errorMessage) {
        responseMessage.textContent = errorMessage;
        return;
    }

    try {
        const response = await fetch(scriptURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorDetails = await response.text();
            throw new Error("Network response was not ok");
        }

        const result = await response.json();
        if (result.success) {
            responseMessage.textContent = "Your message has been sent successfully!";
            form.reset();
        } else {
            responseMessage.textContent = "Something went wrong. Please try again.";
        }
    } catch (error) {
        console.error("Error submitting form:", error);
        responseMessage.textContent = "An error occurred. Please try again.";
    }
});

// Validate form inputs
function validateForm(data) {
    if (!data.name || data.name.length < 3) {
        return "Name must be at least 3 characters.";
    }
    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        return "Enter a valid email address.";
    }
    if (!data.message || data.message.length < 10) {
        return "Message must be at least 10 characters.";
    }
    return null; // No errors
}
