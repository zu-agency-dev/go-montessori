const FORM_SELECTORS = {
  NAME: '[data-form-name]',
  DESCRIPTION: '[data-form-description]',
  VENUE: '[data-form-venue]',
  START_DATE: '[data-form-startdate]',
  END_DATE: '[data-form-enddate]',
  SLUG: '[data-form-slug]',
};

const INPUT_SELECT = '[data-form-select]';
const INPUT_HIDDEN_SLUG = '[data-form-hidden]';
const INPUT_HIDDEN_VENUE = '[form-hidden-venue]';

const selectElement = document.querySelector(INPUT_SELECT) as HTMLSelectElement;
const nameElements = document.querySelectorAll(FORM_SELECTORS.NAME);
const slugElements = document.querySelectorAll(FORM_SELECTORS.SLUG);
const venueElements = document.querySelectorAll(FORM_SELECTORS.VENUE);

const hiddenInputSlug = document.querySelector(INPUT_HIDDEN_SLUG) as HTMLInputElement;
const hiddenInputVenue = document.querySelector(INPUT_HIDDEN_VENUE) as HTMLInputElement;

const getVenueValue = (venueText: string) => {
  switch (venueText.trim()) {
    case 'Go Montessori – Przedszkole Babice':
      return 'gomontressori-babice';
    case 'Go Montessori – Przedszkole Słomin':
      return 'gomontressori-slomin';
    case 'Go Montessori – Żłobek Słomin':
      return 'gomontressori-zlobek-slomin';
    default:
      return '';
  }
};

const updateHiddenInputs = () => {
  const selectedOption = selectElement.options[selectElement.selectedIndex];
  if (!selectedOption) return;

  if (hiddenInputSlug) {
    hiddenInputSlug.value = selectedOption.dataset.slug || '';
  }

  if (hiddenInputVenue) {
    const venueText = selectedOption.dataset.venue || '';
    hiddenInputVenue.value = getVenueValue(venueText);
  }
};

function formOpenDays() {
  if (!selectElement) return;

  nameElements.forEach((element, index) => {
    const option = document.createElement('option');
    const name = element.textContent || '';
    const slug = slugElements[index]?.textContent || '';
    const venue = venueElements[index]?.textContent || '';

    option.value = name;
    option.text = name;
    option.dataset.slug = slug;
    option.dataset.venue = venue;

    selectElement.appendChild(option);
  });

  selectElement.addEventListener('change', updateHiddenInputs);

  updateHiddenInputs();
}

export default formOpenDays;
