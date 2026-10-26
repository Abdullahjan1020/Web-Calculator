# 🧮 Calculator f-900x (HTML, CSS & JavaScript)

A simple calculator that runs right in your web browser. Besides normal math, it also has a scientific mode, a unit converter, and a currency converter — all tucked away in a small menu.

## What it does

- **Basic math** — add, subtract, multiply, divide, and remainder (%)
- **Easy controls** — clear everything with `C`, or delete the last digit with `⌫`
- **Live display** — shows the full calculation as you type, like `12 + 5`
- **Safe division** — shows a message instead of breaking if you divide by 0
- **Menu (`...` button)** with three extra modes:
  - **Scientific Mode** — square root (√x), square (x²), sin, cos, and tan (angles in degrees)
  - **Unit Conversion** — length, weight, and temperature
  - **Currency Conversion** — USD, EUR, GBP, PKR, and JPY

## How to use it

1. Click the number and operator buttons to calculate, then press `=`
2. Click the `...` button at the top right to open the menu
3. Pick a mode to open its panel under the calculator
4. For conversions, enter a value, choose the "from" and "to" options, and click **Convert**

## Files in this project

| File | What it does |
|------|---------------|
| `index.html` | The page structure — calculator buttons, menu, and mode panels |
| `style.css` | The look and layout of the calculator |
| `script.js` | The brains — calculations, menu, and conversions |

## How to run it

1. Download or clone this repository
2. Open `index.html` in any web browser (just double-click it)

That's it — no installation needed!

## Good to know

- Currency rates are **built-in fixed values**, not live rates, so they won't match today's market. You can update them in the `currencyRates` line inside `script.js`.

## Built with

- HTML
- CSS
- JavaScript (no extra libraries)

## About

This project was built to practice web development basics — building a page with HTML, styling it with CSS, and making it interactive with JavaScript.
