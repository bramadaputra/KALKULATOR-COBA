let display = document.getElementById("display");
let currentInput = "";
let operator = null;
let shouldResetDisplay = false;

// Fungsi untuk menambah angka
function appendNumber(number) {
    // Reset display jika harus direset atau angka 0 pertama
    if (display.textContent === "0" || shouldResetDisplay) {
        resetDisplay();
    }
    // Tambahkan angka ke layar
    display.textContent += number;
}

// Fungsi untuk menambahkan operator
function appendOperator(op) {
    // Jika ada operator yang sudah dipilih sebelumnya, lakukan perhitungan
    if (operator !== null) calculate();
    currentInput = display.textContent;
    operator = op;
    shouldResetDisplay = true;  // Reset layar untuk angka baru
}

// Fungsi untuk menambahkan titik desimal
function appendDot() {
    // Reset layar jika harus direset
    if (shouldResetDisplay) resetDisplay();
    // Tambahkan titik desimal hanya jika belum ada
    if (!display.textContent.includes('.')) {
        display.textContent += '.';
    }
}

// Reset tampilan layar kalkulator
function resetDisplay() {
    display.textContent = "";
    shouldResetDisplay = false;
}

// Fungsi untuk menghapus semua input
function clearDisplay() {
    display.textContent = "0";
    currentInput = "";
    operator = null;
    shouldResetDisplay = false;
}

// Fungsi untuk menghapus angka terakhir
function deleteLast() {
    display.textContent = display.textContent.toString().slice(0, -1);
    // Jika layar kosong, set kembali ke 0
    if (display.textContent === "") {
        display.textContent = "0";
    }
}

// Fungsi untuk melakukan perhitungan
function calculate() {
    // Jika tidak ada operator, langsung kembali
    if (operator === null || shouldResetDisplay) return;
    
    let result;
    const previous = parseFloat(currentInput);
    const current = parseFloat(display.textContent);

    // Cek jika angka valid
    if (isNaN(previous) || isNaN(current)) return;

    // Lakukan operasi sesuai dengan operator
    switch (operator) {
        case '+':
            result = previous + current;
            break;
        case '-':
            result = previous - current;
            break;
        case '*':
            result = previous * current;
            break;
        case '/':
            if (current === 0) {
                alert("Tidak bisa dibagi dengan nol!");
                clearDisplay();
                return;
            }
            result = previous / current;
            break;
        case '%':
            result = previous % current;
            break;
        default:
            return;
    }

    // Tampilkan hasil dan atur ulang operator
    display.textContent = result;
    operator = null;
    shouldResetDisplay = true;
}
