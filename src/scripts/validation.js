
const showInputError = (formElement, inputElement, errorMessage, data) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(data.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(data.errorClass);
}

const hideInputError = (formElement, inputElement,data) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(data.inputErrorClass);
  errorElement.classList.remove(data.errorClass);
  errorElement.textContent ='';
}
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};


const toggleButtonState = (inputList, button, data) => {
  if (hasInvalidInput(inputList)){
    button.classList.add(data.inactiveButtonClass);
    button.disabled = true;
  }else{
    button.classList.remove(data.inactiveButtonClass)
    button.disabled = false;
  }
};


const checkVallidity = (formElement, inputElement, data) => {
  if (inputElement.validity.patternMismatch){
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, data);
  } else {
    hideInputError(formElement, inputElement,data);
  }
};


const setEventListeners = (formElement, data) => {
  const inputList = Array.from(formElement.querySelectorAll(data.inputSelector));
  const button = formElement.querySelector(data.submitButtonSelector)

  toggleButtonState(inputList, button, data)

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input',function(){
      checkVallidity(formElement,inputElement,data);
      toggleButtonState(inputList,button, data)
    });
  });
};

export const enableValidation = (data) => {
  const formList = Array.from(document.querySelectorAll(data.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, data);
  });
};
export const clearValidation = (formElement, data) => {
  const inputElementList = Array.from(formElement.querySelectorAll(data.inputSelector));
  const buttonElement = formElement.querySelector(data.submitButtonSelector)

  inputElementList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, data);
  });
    toggleButtonState(inputElementList, buttonElement, data)};