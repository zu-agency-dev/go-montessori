"use strict";
(() => {
  // bin/live-reload.js
  new EventSource(`${"http://localhost:3000"}/esbuild`).addEventListener("change", () => location.reload());

  // src/scripts/form-opendays.ts
  var FORM_SELECTORS = {
    NAME: "[data-form-name]",
    DESCRIPTION: "[data-form-description]",
    VENUE: "[data-form-venue]",
    START_DATE: "[data-form-startdate]",
    END_DATE: "[data-form-enddate]",
    SLUG: "[data-form-slug]"
  };
  var INPUT_SELECT = "[data-form-select]";
  var INPUT_HIDDEN_SLUG = "[data-form-hidden]";
  var INPUT_HIDDEN_VENUE = "[form-hidden-venue]";
  var selectElement = document.querySelector(INPUT_SELECT);
  var nameElements = document.querySelectorAll(FORM_SELECTORS.NAME);
  var slugElements = document.querySelectorAll(FORM_SELECTORS.SLUG);
  var venueElements = document.querySelectorAll(FORM_SELECTORS.VENUE);
  var hiddenInputSlug = document.querySelector(INPUT_HIDDEN_SLUG);
  var hiddenInputVenue = document.querySelector(INPUT_HIDDEN_VENUE);
  var getVenueValue = (venueText) => {
    switch (venueText.trim()) {
      case "Go Montessori \u2013 Przedszkole Babice":
        return "gomontressori-babice";
      case "Go Montessori \u2013 Przedszkole S\u0142omin":
        return "gomontressori-slomin";
      case "Go Montessori \u2013 \u017B\u0142obek S\u0142omin":
        return "gomontressori-zlobek-slomin";
      default:
        return "";
    }
  };
  var updateHiddenInputs = () => {
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    if (!selectedOption) return;
    if (hiddenInputSlug) {
      hiddenInputSlug.value = selectedOption.dataset.slug || "";
    }
    if (hiddenInputVenue) {
      const venueText = selectedOption.dataset.venue || "";
      hiddenInputVenue.value = getVenueValue(venueText);
    }
  };
  function formOpenDays() {
    if (!selectElement) return;
    nameElements.forEach((element, index) => {
      const option = document.createElement("option");
      const name = element.textContent || "";
      const slug = slugElements[index]?.textContent || "";
      const venue = venueElements[index]?.textContent || "";
      option.value = name;
      option.text = name;
      option.dataset.slug = slug;
      option.dataset.venue = venue;
      selectElement.appendChild(option);
    });
    selectElement.addEventListener("change", updateHiddenInputs);
    updateHiddenInputs();
  }
  window.Webflow ||= [];
  window.Webflow.push(() => {
    formOpenDays();
  });
})();
//# sourceMappingURL=form-opendays.js.map
