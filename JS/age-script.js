function calculateAge() {
    const dobValue = document.getElementById('dob-input').value;
    if (!dobValue) {
        alert("Please select a birth date.");
        return;
    }

    const dob = new Date(dobValue);
    const today = new Date();

    let d1 = dob.getDate();
    let m1 = dob.getMonth() + 1;
    let y1 = dob.getFullYear();

    let d2 = today.getDate();
    let m2 = today.getMonth() + 1;
    let y2 = today.getFullYear();

    let d3, m3, y3;

    y3 = y2 - y1;

    if (m2 >= m1) {
        m3 = m2 - m1;
    } else {
        y3--;
        m3 = 12 + m2 - m1;
    }

    if (d2 >= d1) {
        d3 = d2 - d1;
    } else {
        m3--;
        d3 = getDaysInMonth(y1, m1) + d2 - d1;
    }

    if (m3 < 0) {
        m3 = 11;
        y3--;
    }

    // Display results
    document.getElementById('years-res').innerText = y3;
    document.getElementById('months-res').innerText = m3;
    document.getElementById('days-res').innerText = d3;

    
    console.log(`Age: ${y3} Years, ${m3} Months, ${d3} Days`);
}

function getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
}