const modeElement = document.getElementById('mode');
const ctcValueContainer = document.getElementById('ctcValueContainer');
const ctcValueElement = document.getElementById('ctcValue');
const form = document.getElementById('calculatorForm');
const result = document.getElementById('result');
const resultText = document.getElementById('resultText');

// Show or hide CTC value input based on mode
modeElement.addEventListener('change', () => {
    ctcValueContainer.style.display = modeElement.value === 'ctc' ? 'block' : 'none';
});

// Handle form submission
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const mode = modeElement.value;
    const prescaler = parseInt(document.getElementById('prescaler').value);
    const clockRate = parseFloat(document.getElementById('clockRate').value) * 1e6; // Convert MHz to Hz
    const delay = parseFloat(document.getElementById('delay').value) / 1000; // Convert ms to seconds
    
    let maxCount = 255; // Default for Normal mode
    if (mode === 'ctc') {
        const ctcValue = parseInt(ctcValueElement.value);
        if (isNaN(ctcValue) || ctcValue < 0 || ctcValue > 255) {
            alert('Please enter a valid CTC value between 0 and 255.');
            return;
        }
        maxCount = ctcValue;
    }

    const overflowTime = (prescaler * (maxCount + 1)) / clockRate;
    const overflowCount = delay / overflowTime;

    resultText.textContent = `The timer needs to overflow approximately ${Math.ceil(overflowCount)} times.`;
    result.style.display = 'block';
});