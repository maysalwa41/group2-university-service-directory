
// ============================================================
// MUNI UNIVERSITY SERVICE DIRECTORY
// Sample service data (all invented).
// Days: 0 = Sunday, 1 = Monday ... 6 = Saturday
// ============================================================

const services = [
  {
    id: 1,
    name: "Registry",
    need: "Academic and records",
    zone: "A",
    building: "Administration Block",
    room: "Room 4, ground floor",
    phone: "+256 700 000 101",
    email: "registry@sample.ac.ug",
    days: [1, 2, 3, 4, 5],
    open: 8,
    close: 17,
    hours: "Mon-Fri, 8:00-17:00",
    purpose: "Transcripts, academic records and registration queries.",
    directions: "Enter at the Main Gate and walk past the security booth. The Administration Block is the first building on your left. Registry is Room 4 on the ground floor."
  },
  {
    id: 2,
    name: "Admissions Office",
    need: "Academic and records",
    zone: "A",
    building: "Administration Block",
    room: "Room 7, ground floor",
    phone: "+256 700 000 102",
    email: "admissions@sample.ac.ug",
    days: [1, 2, 3, 4, 5],
    open: 8,
    close: 16,
    hours: "Mon-Fri, 8:00-16:00",
    purpose: "Applications, admission letters and new student enquiries.",
    directions: "From the Main Gate go to the Administration Block on your left. Admissions is Room 7, next to the Registry."
  },
  {
    id: 3,
    name: "Finance and Fees Office",
    need: "Fees and payments",
    zone: "A",
    building: "Administration Block",
    room: "Room 12, first floor",
    phone: "+256 700 000 103",
    email: "finance@sample.ac.ug",
    days: [1, 2, 3, 4, 5],
    open: 8,
    close: 16,
    hours: "Mon-Fri, 8:00-16:00",
    purpose: "Tuition balances, payment confirmation and fee statements.",
    directions: "Enter the Administration Block, take the stairs on the right to the first floor, and Room 12 is at the end of the corridor."
  },
  {
    id: 4,
    name: "University Library",
    need: "Academic and records",
    zone: "C",
    building: "Library Building",
    room: "Main hall",
    phone: "+256 700 000 104",
    email: "library@sample.ac.ug",
    days: [1, 2, 3, 4, 5, 6],
    open: 8,
    close: 21,
    hours: "Mon-Sat, 8:00-21:00",
    purpose: "Books, study space, past papers and borrowing.",
    directions: "From the Administration Block walk straight along the main road for about 200 metres. The Library is the large building on your right, before the ICT centre."
  },
  {
    id: 5,
    name: "ICT Helpdesk",
    need: "Technology",
    zone: "C",
    building: "ICT Centre",
    room: "Room 2, ground floor",
    phone: "+256 700 000 105",
    email: "ict@sample.ac.ug",
    days: [1, 2, 3, 4, 5],
    open: 8,
    close: 17,
    hours: "Mon-Fri, 8:00-17:00",
    purpose: "Student email, Wi-Fi access and portal login problems.",
    directions: "Walk past the Library and turn right. The ICT Centre is the glass-fronted building and the Helpdesk is Room 2 on the ground floor."
  },
  {
    id: 6,
    name: "Health Unit",
    need: "Health and welfare",
    zone: "D",
    building: "Health Centre",
    room: "Reception",
    phone: "+256 700 000 106",
    email: "health@sample.ac.ug",
    days: [0, 1, 2, 3, 4, 5, 6],
    open: 8,
    close: 20,
    hours: "Every day, 8:00-20:00",
    purpose: "First aid, basic treatment and referrals for students and staff.",
    directions: "From the Main Gate follow the road to the student hostels. The Health Centre is the white building opposite the Student Guild office."
  },
  {
    id: 7,
    name: "Student Guild Office",
    need: "Student life",
    zone: "D",
    building: "Student Centre",
    room: "Room 1",
    phone: "+256 700 000 107",
    email: "guild@sample.ac.ug",
    days: [1, 2, 3, 4, 5],
    open: 9,
    close: 17,
    hours: "Mon-Fri, 9:00-17:00",
    purpose: "Student representation, clubs, events and welfare concerns.",
    directions: "Follow the road towards the hostels. The Student Centre is on your left and the Guild is Room 1 at the entrance."
  },
  {
    id: 8,
    name: "Security Office",
    need: "Safety and security",
    zone: "A",
    building: "Main Gate",
    room: "Security booth",
    phone: "+256 700 000 108",
    email: "security@sample.ac.ug",
    days: [0, 1, 2, 3, 4, 5, 6],
    open: 0,
    close: 24,
    hours: "Every day, 24 hours",
    purpose: "Emergencies, lost property and visitor access.",
    directions: "The Security Office is the booth right at the Main Gate, on the left side as you enter."
  }
];


// ============================================================
// HELPER FUNCTION
// ============================================================

const $ = id => document.getElementById(id);


// ============================================================
// FUNCTION 1: CHECK WHETHER A SERVICE IS OPEN
// ============================================================

function isOpenNow(service, now = new Date()) {
  const currentHour = now.getHours() + now.getMinutes() / 60;

  return (
    service.days.includes(now.getDay()) &&
    currentHour >= service.open &&
    currentHour < service.close
  );
}


// ============================================================
// FUNCTION 2: DISPLAY SERVICE CARDS
// ============================================================

function renderServices(list) {
  const serviceList = $("service-list");
  const emptyMessage = $("empty");

  if (!serviceList) return;

  serviceList.innerHTML = list.map(service => {
    const open = isOpenNow(service);

    return `
      <article class="card">

        <span class="badge ${open ? "open" : "closed"}">
          ${open ? "Open now" : "Closed now"}
        </span>

        <h3>${service.name}</h3>

        <p>${service.purpose}</p>

        <ul>
          <li>
            <strong>Location:</strong>
            ${service.building}, ${service.room}
            (Zone ${service.zone})
          </li>

          <li>
            <strong>Hours:</strong>
            ${service.hours}
          </li>

          <li>
            <strong>Phone:</strong>
            ${service.phone}
          </li>

          <li>
            <strong>Email:</strong>
            <a href="mailto:${service.email}">
              ${service.email}
            </a>
          </li>
        </ul>

        <button type="button" data-id="${service.id}">
          Get directions to ${service.name}
        </button>

      </article>
    `;
  }).join("");

  if (emptyMessage) {
    emptyMessage.hidden = list.length > 0;
  }
}


// ============================================================
// FUNCTION 3: SUMMARISE SEARCH RESULTS
// ============================================================

function summariseResults(list) {
  const summary = $("summary");

  if (!summary) return;

  const openCount = list.filter(service => isOpenNow(service)).length;

  summary.textContent =
    `${list.length} service(s) found, ${openCount} open now.`;
}


// ============================================================
// FUNCTION 4: SEARCH AND FILTER SERVICES
// ============================================================

function filterServices() {
  const searchInput = $("search");
  const needSelect = $("need");

  if (!searchInput || !needSelect) return;

  const query = searchInput.value.trim().toLowerCase();
  const selectedNeed = needSelect.value;

  const results = services.filter(service => {
    const matchesCategory =
      selectedNeed === "all" || service.need === selectedNeed;

    const searchableText = `
      ${service.name}
      ${service.purpose}
      ${service.building}
      ${service.room}
      ${service.need}
      ${service.zone}
    `.toLowerCase();

    const matchesSearch = searchableText.includes(query);

    return matchesCategory && matchesSearch;
  });

  renderServices(results);
  summariseResults(results);
}


// ============================================================
// FUNCTION 5: DISPLAY DIRECTIONS FOR A SELECTED SERVICE
// ============================================================

function showDirections(id) {
  const service = services.find(item => item.id === Number(id));

  const route = $("route");
  const destination = $("dest");

  // Remove previous zone highlights
  document.querySelectorAll(".zone").forEach(zone => {
    zone.classList.remove("active");
  });

  if (!service) {
    if (route) {
      route.textContent =
        "Choose a service to see step-by-step directions.";
    }

    if (destination) {
      destination.value = "";
    }

    return;
  }

  // Highlight the correct zone
  document.querySelectorAll(".zone").forEach(zone => {
    if (zone.dataset.zone === service.zone) {
      zone.classList.add("active");
    }
  });

  // Display directions
  if (route) {
    route.innerHTML = `
      <h3>${service.name}</h3>

      <p>${service.directions}</p>

      <p>
        <strong>Zone ${service.zone}:</strong>
        ${service.building}, ${service.room}.
      </p>
    `;
  }

  if (destination) {
    destination.value = String(service.id);
  }
}


// ============================================================
// FUNCTION 6: VALIDATE FEEDBACK FORM FIELDS
// ============================================================

function validateField(field) {
  const valid = field.checkValidity();
  const errorMessage = $(`${field.id}-error`);

  if (errorMessage) {
    errorMessage.textContent = valid ? "" : field.dataset.error || "Please check this field.";
  }

  field.setAttribute("aria-invalid", String(!valid));

  return valid;
}


// ============================================================
// FUNCTION 7: SUBMIT FEEDBACK
// ============================================================

function submitFeedback(event) {
  event.preventDefault();

  const form = event.target;
  const requiredFields = [...form.querySelectorAll("[required]")];

  const allValid = requiredFields
    .map(field => validateField(field))
    .every(Boolean);

  const message = $("form-msg");

  if (!allValid) {
    if (message) {
      message.className = "msg error-msg";
      message.textContent =
        "Please fix the highlighted fields and try again.";
    }

    return;
  }

  if (message) {
    message.className = "msg success";
    message.textContent =
      "Thank you. Your report has been recorded (sample only, nothing is sent).";
  }

  form.reset();

  // Clear validation messages after successful submission
  form.querySelectorAll("[required]").forEach(field => {
    field.setAttribute("aria-invalid", "false");

    const errorMessage = $(`${field.id}-error`);
    if (errorMessage) errorMessage.textContent = "";
  });
}


// ============================================================
// FUNCTION 8: INITIALISE THE APPLICATION
// ============================================================

function initializeApp() {
  const searchInput = $("search");
  const needSelect = $("need");
  const serviceList = $("service-list");
  const destinationSelect = $("dest");
  const feedbackService = $("fb-service");
  const feedbackForm = $("feedback-form");

  // Check that the main directory elements exist
  if (!searchInput || !needSelect || !serviceList) {
    console.error(
      "Service Directory: one or more required HTML elements are missing. Check the IDs in your HTML."
    );
    return;
  }

  // ----------------------------------------------------------
  // Populate the category dropdown
  // ----------------------------------------------------------

  const needs = [...new Set(services.map(service => service.need))];

  needSelect.innerHTML =
    '<option value="all">All needs</option>' +
    needs.map(need => `
      <option value="${need}">${need}</option>
    `).join("");


  // ----------------------------------------------------------
  // Prepare service dropdown options
  // ----------------------------------------------------------

  const serviceOptions =
    '<option value="">Choose a service</option>' +
    services.map(service => `
      <option value="${service.id}">${service.name}</option>
    `).join("");

  if (destinationSelect) {
    destinationSelect.innerHTML = serviceOptions;
  }

  if (feedbackService) {
    feedbackService.innerHTML = serviceOptions;
  }


  // ----------------------------------------------------------
  // SEARCH: update results while the user types
  // ----------------------------------------------------------

  searchInput.addEventListener("input", filterServices);


  // ----------------------------------------------------------
  // CATEGORY FILTER: update results when category changes
  // ----------------------------------------------------------

  needSelect.addEventListener("change", filterServices);


  // ----------------------------------------------------------
  // FIND SERVICES BUTTON
  // Supports a button with id="find-services"
  // or data-action="find-services"
  // ----------------------------------------------------------

  const findButton =
    $("find-services") ||
    document.querySelector('[data-action="find-services"]');

  if (findButton) {
    findButton.addEventListener("click", event => {
      event.preventDefault();
      filterServices();
    });
  }


  // ----------------------------------------------------------
  // SEARCH FORM: also supports pressing Enter
  // ----------------------------------------------------------

  const searchForm = $("search-form");

  if (searchForm) {
    searchForm.addEventListener("submit", event => {
      event.preventDefault();
      filterServices();
    });
  }


  // ----------------------------------------------------------
  // DESTINATION DROPDOWN: show directions
  // ----------------------------------------------------------

  if (destinationSelect) {
    destinationSelect.addEventListener("change", event => {
      showDirections(event.target.value);
    });
  }


  // ----------------------------------------------------------
  // SERVICE CARD BUTTONS
  // Event delegation keeps buttons working after re-rendering
  // ----------------------------------------------------------

  serviceList.addEventListener("click", event => {
    const button = event.target.closest("button[data-id]");

    if (!button || !serviceList.contains(button)) return;

    showDirections(button.dataset.id);

    const directionsSection = $("directions");

    if (directionsSection) {
      directionsSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });


  // ----------------------------------------------------------
  // FEEDBACK FORM
  // ----------------------------------------------------------

  if (feedbackForm) {
    feedbackForm.addEventListener("submit", submitFeedback);

    feedbackForm.addEventListener("focusout", event => {
      if (event.target.matches("[required]")) {
        validateField(event.target);
      }
    });
  }


  // ----------------------------------------------------------
  // DISPLAY ALL SERVICES WHEN THE PAGE FIRST LOADS
  // ----------------------------------------------------------

  filterServices();

  console.log("Muni University Service Directory is ready.");
}


// ============================================================
// START THE APPLICATION AFTER THE HTML HAS LOADED
// ============================================================

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeApp);
} else {
  initializeApp();
}
