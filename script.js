// console.log("Hello, World!");
document.write('Hello, World!');
// alert('Hello, World!');

function addNumbers(num1, num2) {
        return num1 + num2;
    }
    
// Example usage:
let result = addNumbers(5, 3);
console.log(result); // Output: 8
// document.write('Hello, World!');
document.write(result);
    

function calculateSum() {
        // Get the values from the input fields
        const num1 = parseFloat(document.getElementById('num1').value);
        const num2 = parseFloat(document.getElementById('num2').value);
    
        // Check if the values are numbers
        if (!isNaN(num1) && !isNaN(num2)) {
            // Calculate the sum
            const sum = num1 + num2;
            // Display the result
            document.getElementById('result').textContent = `The sum is: ${sum}`;
        } else {
            // Display an error message if inputs are not valid numbers
            document.getElementById('result').textContent = 'Please enter valid numbers in both fields.';
        }
    }
    
