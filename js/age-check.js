"use strict";

function checkAge() {
    // Check if user has already been granted access
    if (localStorage.getItem("accessGranted") === "true") {
        return; // Stop the function, user is already verified
    }

    let birthdate = prompt("Indtast din fødselsdato i følgende format: (YYYY-MM-DD):");

    // Validate format
    if (!birthdate || !/^\d{4}-\d{2}-\d{2}$/.test(birthdate)) {
        alert("Forkert format! Indtast din fødselsdato i følgende format: (YYYY-MM-DD)");
        return checkAge(); // Ask again
    }

    // Calculate age
    let birthDateObj = new Date(birthdate);
    let today = new Date();
    let age = today.getFullYear() - birthDateObj.getFullYear();
    
    // Adjust for cases where birthday hasn't occurred yet this year
    let monthDiff = today.getMonth() - birthDateObj.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
        age--;
    }

    // Check if user is 18 or older
    if (age >= 18) {
        alert("Velkommen til ZeroBuzz Brew!");
        localStorage.setItem("accessGranted", "true"); // Store access granted flag
    } else {
        alert("Du skal være minimum 18 år for at besøge denne side.");
        window.location.href = "https://www.google.com"; // Redirect underage users
    }
}

// Run the function when the page loads
checkAge();