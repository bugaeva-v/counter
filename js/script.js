const maleSwitch = document.querySelector('#gender-male');
const ageForm = document.querySelector('#age');
const heightForm = document.querySelector('#height');
const weightForm = document.querySelector('#weight');
const inputFields = document.querySelectorAll('input[type="text"]');
const phisycalActivities = document.querySelector('.radios-group');
const submitButton = document.querySelector('.form__submit-button');
const resetButton = document.querySelector('.form__reset-button');
const resultBlock = document.querySelector('.counter__result');
const caloriesNorm = resultBlock.querySelector('#calories-norm');
const caloriesMinimal = resultBlock.querySelector('#calories-minimal');
const caloriesMaximal = resultBlock.querySelector('#calories-maximal');

let activityFactor = 1.2;
phisycalActivities.addEventListener('change', (evt) => {
    switch (evt.target.id) {
        case 'activity-minimal':
            activityFactor = 1.2;
            break;
        case 'activity-low':
            activityFactor = 1.375;
            break;
        case 'activity-medium':
            activityFactor = 1.55;
            break;
        case 'activity-high':
            activityFactor = 1.725;
            break;
        case 'activity-maximal':
            activityFactor = 1.9;
            break;
    }
});

const weightFormula = () =>
    Math.round(activityFactor * ((10 * weightForm.value) + (6.25 * heightForm.value) - (5 * ageForm.value) + (maleSwitch.checked ? 5 : -161)));

inputFields.forEach(input => {
    input.addEventListener('change', () => {
        resetButton.disabled = (ageForm.value !== '' || heightForm.value !== '' || weightForm.value !== '') ? false : true;
        submitButton.disabled = (ageForm.value !== '' && heightForm.value !== '' && weightForm.value !== '') ? false : true;
    })
});

submitButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    const calorieIntake = weightFormula();
    resultBlock.classList.remove('counter__result--hidden');
    caloriesNorm.textContent = calorieIntake;
    caloriesMinimal.textContent = Math.round(calorieIntake * 0.85);
    caloriesMaximal.textContent = Math.round(calorieIntake * 1.15);
});

resetButton.addEventListener('click', () => {
    activityFactor = 1.2;
    ageForm.value = '';
    heightForm.value = '';
    weightForm.value = '';
    maleSwitch.checked = true;
    submitButton.disabled = true;
    resultBlock.classList.add('counter__result--hidden');
    phisycalActivities.querySelector('#activity-minimal').checked = true;
});