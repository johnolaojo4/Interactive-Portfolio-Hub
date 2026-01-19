function calculateBMI() {
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value) / 100; // convert from cm to meters

    if (weight > 0 && height > 0) {
        const bmi = (weight / (height * height)).toFixed(1);
        document.getElementById('bmi-score').innerText = bmi;
        const resultText = `BMI: ${bmi} (${category})`;
    saveToGlobalHistory("BMI", resultText);
        
        let category = "";
        let color = "";

        if (bmi < 18.5) {
            category = "Underweight";
            color = "#ffcc00";
        } else if (bmi < 25) {
            category = "Normal Weight";
            color = "#2ecc71";
        } else if (bmi < 30) {
            category = "Overweight";
            color = "#e67e22";
        } else {
            category = "Obese";
            color = "#e74c3c";
        }

        const categoryDiv = document.getElementById('bmi-category');
        categoryDiv.innerText = category;
        categoryDiv.style.color = color;

        // history
        saveToHistory(`BMI Calculation: ${bmi} (${category})`);
    } else {
        alert("Please enter valid positive numbers");
    }
   
    const resultText = `BMI: ${bmi} (${category})`;
    
    // Push to Hub History
    saveToGlobalHistory("BMI", resultText);
}
