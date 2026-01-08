const email = document.getElementById("email");
const form = document.querySelector("form");
const countrySelect = document.getElementById("country");
const postalCodeField = document.getElementById("postal-code");
const passwd = document.getElementById("passwd");
const passwdConfirm = document.getElementById("passwd-confirm");
const fieldset = document.querySelector("fieldset");

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

function removeInvalidErrorOutline(el) {
  if (!el.classList.contains("input")) {
    el.classList.add("input");
  }
}

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
passwd.addEventListener("input", () => {
  passwd.setCustomValidity("");
  removeInvalidErrorOutline(passwd);
});

passwd.addEventListener("blur", () => {
  resetInvalidErrorOutline(passwd);

  if (passwd.validity.tooShort) {
    passwd.setCustomValidity("Password too short (8 characters min.).");
    passwd.reportValidity();
  } else {
    passwd.setCustomValidity("");
  }

  if (!(passwd.value.trim() && passwdConfirm.value.trim())) return;

  if (checkPassMatch()) {
    passwd.setCustomValidity("");
  } else {
    passwd.setCustomValidity("Passwords must be matching.")
    passwd.reportValidity();
  }
});

// Pwd Confirmation
passwdConfirm.addEventListener("input", () => {
  passwdConfirm.setCustomValidity("");
  removeInvalidErrorOutline(passwdConfirm);
});

passwdConfirm.addEventListener("blur", () => {
  resetInvalidErrorOutline(passwdConfirm);

  if (!passwd.value.trim()) return;
  if (!passwdConfirm.value.trim()) return;

  if (checkPassMatch()) {
    passwdConfirm.setCustomValidity("");
  } else {
    passwdConfirm.setCustomValidity("Passwords must be matching.");
    passwdConfirm.reportValidity();
  }
});

function checkPassMatch() {
  const passwdVal = passwd.value.trim();
  const passwdConfirmVal = passwdConfirm.value.trim();

  if (passwdVal && passwdConfirmVal) {
    return passwdVal === passwdConfirmVal ? true : false;
  }
}

function validate(el) {
  if (!el.value.trim()) {
    el.setCustomValidity("Some fields are still empty.");
  } else {
    el.setCustomValidity("");
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  validate(email);
  validate(postalCodeField);
  validate(passwd);
  validate(passwdConfirm);
  
  const isFormValid = form.reportValidity();

  if (isFormValid) {
    fieldset.replaceChildren();
    const span = document.createElement("span");
    span.textContent = "High five, man!!! 🖐️";
    fieldset.style.textAlign = "center";
    fieldset.appendChild(span);
  }
});