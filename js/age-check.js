"use strict";

function checkAge() {
    // Check if user has already been granted access
    if (localStorage.getItem("accessGranted") === "true") {
        return; // Stop the function, user is already verified
    }

    let birthdate = prompt("Indtast din fødselsdato i følgende format: (DDMMÅÅÅÅ):");

    // Validate format
    if (!birthdate || !/^\d{2}\d{2}\d{4}$/.test(birthdate)) {
        alert("Forkert format! Indtast din fødselsdato i følgende format: (DDMMÅÅÅÅ)");
        return checkAge(); // Ask again
    }

    // Convert from DDMMYYYY to a date object
    const day = parseInt(birthdate.substring(0, 2));
    const month = parseInt(birthdate.substring(2, 4)) - 1; // JavaScript months are 0-indexed
    const year = parseInt(birthdate.substring(4, 8));
    
    // Create date object
    let birthDateObj = new Date(year, month, day);
    
    // Check if the date is valid
    if (birthDateObj.getDate() !== day || birthDateObj.getMonth() !== month || birthDateObj.getFullYear() !== year) {
        alert("Ugyldig dato! Indtast venligst en gyldig dato.");
        return checkAge(); // Ask again
    }

    // Calculate age
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
    }
    let previousPage = document.referrer;
    if (previousPage) {
        window.location.href = previousPage; // Redirect to the previous page
    } else {
        window.location.href = "/"; // If no referrer, go to the homepage
    }
}

// Run the function when the page loads
checkAge();