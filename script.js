const email = document.getElementById("email");
const form = document.querySelector("form");
const countrySelect = document.getElementById("country");
const postalCodeField = document.getElementById("postal-code");

// Email
email.addEventListener("input", () => {
  email.setCustomValidity("");
  removeInvalidErrorOutline(email);
});

email.addEventListener("blur", (e) => {
  resetInvalidErrorOutline(email);
  const input = e.target;
  const emailValidity = input.validity;

  if (emailValidity.typeMismatch) {
    input.setCustomValidity("Email is in incorrect format.");
    input.reportValidity();
  } else {
    input.setCustomValidity("");
  }
});


function removeInvalidErrorOutline(el) {
  if (!el.classList.contains("input")) {
    el.classList.add("input");
  }
}

// Country and Postal Code
countrySelect.addEventListener("change", checkPostalCode);

postalCodeField.addEventListener("blur", () => {
  resetInvalidErrorOutline(postalCodeField);
  if (postalCodeField.value.trim()) {
    checkPostalCode();
  }
});

postalCodeField.addEventListener("input", () => {
  postalCodeField.setCustomValidity("");
  removeInvalidErrorOutline(postalCodeField);
});

function resetInvalidErrorOutline(el) {
   el.classList.remove("input");
}

function checkPostalCode() {
  const constraints = {
    ch: [
      "^(CH-)?\\d{4}$",
      "Swiss postal codes must have exactly 4 digits: e.g. CH-1950 or 1950",
    ],
    fr: [
      "^(F-)?\\d{5}$",
      "French postal codes must have exactly 5 digits: e.g. F-75012 or 75012",
    ],
    de: [
      "^(D-)?\\d{5}$",
      "German postal codes must have exactly 5 digits: e.g. D-12345 or 12345",
    ],
  };

  const country = countrySelect.value;
  const constraint = new RegExp(constraints[country][0], "");

  if (constraint.test(postalCodeField.value)) {
    postalCodeField.setCustomValidity("");
  } else {
    postalCodeField.setCustomValidity(constraints[country][1]);
    postalCodeField.reportValidity();
  }
}

// Pwd

// Pwd confirmation


form.addEventListener("submit", (e) => {
  e.preventDefault();
  // if anything, empty, error, check all form at once
  if (!email.value.trim()) {
    email.setCustomValidity("Email is required");
    email.reportValidity();
  }

  // if (!form.checkValidity()) {
  //   form.reportValidity();
  //   const firstInvalid = form.querySelector(':invalid');
  //   firstInvalid.setCustomValidity('Please correct this field');
  //   firstInvalid.reportValidity();
  // }

  // check postal at exit

  // if all is well, high five!
});
