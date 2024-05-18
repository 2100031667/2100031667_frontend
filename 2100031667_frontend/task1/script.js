const formContainer = document.getElementById('form-container');
const addFieldButton = document.getElementById('add-field');
const removeFieldButton = document.getElementById('remove-field');
const fieldTypeSelect = document.getElementById('field-type');
const fieldLabelInput = document.getElementById('field-label');
const radioValueInput = document.getElementById('radio-value');
const radioOptions = document.getElementById('radio-options');
let radioGroupName = 1;

function createFormField(fieldType, labelText, radioValue = '') {
  const fieldWrapper = document.createElement('div');
  fieldWrapper.classList.add('form-field');

  const label = document.createElement('label');
  label.textContent = labelText;
  fieldWrapper.appendChild(label);

  let inputElement;
  if (fieldType === 'text') {
    inputElement = document.createElement('input');
    inputElement.type = 'text';
  } else if (fieldType === 'checkbox') {
    inputElement = document.createElement('input');
    inputElement.type = 'checkbox';
  } else if (fieldType === 'radio') {
    inputElement = document.createElement('input');
    inputElement.type = 'radio';
    const groupName = `radio-group-${radioGroupName++}`;
    inputElement.name = groupName;

    const radioValueLabel = document.createElement('span');
    radioValueLabel.textContent = radioValue;
    fieldWrapper.appendChild(radioValueLabel);
  }

  fieldWrapper.appendChild(inputElement);
  return fieldWrapper;
}

fieldTypeSelect.addEventListener('change', () => {
  const selectedType = fieldTypeSelect.value;
  radioOptions.classList.add('hidden'); // Hide radio options by default
  if (selectedType === 'radio') {
    radioOptions.classList.remove('hidden'); // Show radio options for radio buttons
  }
});

addFieldButton.addEventListener('click', () => {
  const fieldType = fieldTypeSelect.value;
  const labelText = fieldLabelInput.value.trim();
  let radioValue = '';
  if (fieldType === 'radio') {
    radioValue = radioValueInput.value.trim();
  }

  if (labelText) {
    const newField = createFormField(fieldType, labelText, radioValue);
    formContainer.appendChild(newField);
    fieldLabelInput.value = ''; // Clear label input after adding a field
    radioValueInput.value = ''; // Clear radio value input after adding a radio button
  } else {
    alert('Please enter a label for the field.');
  }
});

removeFieldButton.addEventListener('click', () => {
  // Check if there are any fields in the container
  const fields = formContainer.querySelectorAll('.form-field');
  if (fields.length > 0) {
    // Remove the last added field
    const lastField = fields[fields.length - 1];
    formContainer.removeChild(lastField);
  } else {
    alert('There are no fields to remove.');
  }
});
