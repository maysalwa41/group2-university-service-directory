// Trevor's code ===== Sample data (all invented). days: 0 = Sunday ... 6 = Saturday =====
const services = [
  { id: 1, name: "Registry", need: "Academic and records", zone: "A", building: "Administration Block", room: "Room 4, ground floor", phone: "+256 700 000 101", email: "registry@sample.ac.ug", days: [1, 2, 3, 4, 5], open: 8, close: 17, hours: "Mon-Fri, 8:00-17:00", purpose: "Transcripts, academic records and registration queries.", directions: "Enter at the Main Gate and walk past the security booth. The Administration Block is the first building on your left. Registry is Room 4 on the ground floor." },
  { id: 2, name: "Admissions Office", need: "Academic and records", zone: "A", building: "Administration Block", room: "Room 7, ground floor", phone: "+256 700 000 102", email: "admissions@sample.ac.ug", days: [1, 2, 3, 4, 5], open: 8, close: 16, hours: "Mon-Fri, 8:00-16:00", purpose: "Applications, admission letters and new student enquiries.", directions: "From the Main Gate go to the Administration Block on your left. Admissions is Room 7, next to the Registry." },
  { id: 3, name: "Finance and Fees Office", need: "Fees and payments", zone: "A", building: "Administration Block", room: "Room 12, first floor", phone: "+256 700 000 103", email: "finance@sample.ac.ug", days: [1, 2, 3, 4, 5], open: 8, close: 16, hours: "Mon-Fri, 8:00-16:00", purpose: "Tuition balances, payment confirmation and fee statements.", directions: "Enter the Administration Block, take the stairs on the right to the first floor, and Room 12 is at the end of the corridor." },
  { id: 4, name: "University Library", need: "Academic and records", zone: "C", building: "Library Building", room: "Main hall", phone: "+256 700 000 104", email: "library@sample.ac.ug", days: [1, 2, 3, 4, 5, 6], open: 8, close: 21, hours: "Mon-Sat, 8:00-21:00", purpose: "Books, study space, past papers and borrowing.", directions: "From the Administration Block walk straight along the main road for about 200 metres. The Library is the large building on your right, before the ICT centre." },
  { id: 5, name: "ICT Helpdesk", need: "Technology", zone: "C", building: "ICT Centre", room: "Room 2, ground floor", phone: "+256 700 000 105", email: "ict@sample.ac.ug", days: [1, 2, 3, 4, 5], open: 8, close: 17, hours: "Mon-Fri, 8:00-17:00", purpose: "Student email, Wi-Fi access and portal login problems.", directions: "Walk past the Library and turn right. The ICT Centre is the glass-fronted building and the Helpdesk is Room 2 on the ground floor." },
  { id: 6, name: "Health Unit", need: "Health and welfare", zone: "D", building: "Health Centre", room: "Reception", phone: "+256 700 000 106", email: "health@sample.ac.ug", days: [0, 1, 2, 3, 4, 5, 6], open: 8, close: 20, hours: "Every day, 8:00-20:00", purpose: "First aid, basic treatment and referrals for students and staff.", directions: "From the Main Gate follow the road to the student hostels. The Health Centre is the white building opposite the Student Guild office." },
  { id: 7, name: "Student Guild Office", need: "Student life", zone: "D", building: "Student Centre", room: "Room 1", phone: "+256 700 000 107", email: "guild@sample.ac.ug", days: [1, 2, 3, 4, 5], open: 9, close: 17, hours: "Mon-Fri, 9:00-17:00", purpose: "Student representation, clubs, events and welfare concerns.", directions: "Follow the road towards the hostels. The Student Centre is on your left and the Guild is Room 1 at the entrance." },
  { id: 8, name: "Security Office", need: "Safety and security", zone: "A", building: "Main Gate", room: "Security booth", phone: "+256 700 000 108", email: "security@sample.ac.ug", days: [0, 1, 2, 3, 4, 5, 6], open: 0, close: 24, hours: "Every day, 24 hours", purpose: "Emergencies, lost property and visitor access.", directions: "The Security Office is the booth right at the Main Gate, on the left side as you enter." }
];

const $ = id => document.getElementById(id);

// ===== Function 1 (status summarisation): is a service open right now? =====
function isOpenNow(service, now = new Date()) {
  const hour = now.getHours() + now.getMinutes() / 60;
  return service.days.includes(now.getDay()) && hour >= service.open && hour < service.close;
}

// Draws the cards, or shows the empty state when nothing matches
function renderServices(list) {
  $("service-list").innerHTML = list.map(s => `
    <article class="card">
      <span class="badge ${isOpenNow(s) ? "open" : "closed"}">${isOpenNow(s) ? "Open now" : "Closed now"}</span>
      <h3>${s.name}</h3>
      <p>${s.purpose}</p>
      <ul>
        <li><strong>Location:</strong> ${s.building}, ${s.room} (Zone ${s.zone})</li>
        <li><strong>Hours:</strong> ${s.hours}</li>
        <li><strong>Phone:</strong> ${s.phone}</li>
        <li><strong>Email:</strong> <a href="mailto:${s.email}">${s.email}</a></li>
      </ul>
      <button type="button" data-id="${s.id}">Get directions to ${s.name}</button>
    </article>`).join("");
  $("empty").hidden = list.length > 0;
}

// Counts results and how many are open, shown above the cards
function summariseResults(list) {
  const openCount = list.filter(s => isOpenNow(s)).length;
  $("summary").textContent = `${list.length} service(s) found, ${openCount} open now.`;
}

// ===== Function 2 (search and filter): runs on every keystroke or filter change =====
function filterServices() {
  const query = $("search").value.trim().toLowerCase();
  const need = $("need").value;
  const result = services.filter(s =>
    (need === "all" || s.need === need) &&
    `${s.name} ${s.purpose} ${s.building} ${s.need}`.toLowerCase().includes(query)
  );
  renderServices(result);
  summariseResults(result);
}

// ===== Function 3 (user action): show text directions and highlight the zone =====
function showDirections(id) {
  const s = services.find(item => item.id === Number(id));
  document.querySelectorAll(".zone").forEach(z => z.classList.toggle("active", Boolean(s) && z.dataset.zone === s.zone));
  $("route").innerHTML = s
    ? `<h3>${s.name}</h3><p>${s.directions}</p><p><strong>Zone ${s.zone}:</strong> ${s.building}, ${s.room}.</p>`
    : "Choose a service to see step-by-step directions.";
  if (s) $("dest").value = s.id;
}

// ===== Form validation with visible feedback =====
function validateField(field) {
  const valid = field.checkValidity();
  $(`${field.id}-error`).textContent = valid ? "" : field.dataset.error;
  field.setAttribute("aria-invalid", String(!valid));
  return valid;
}

function submitFeedback(event) {
  event.preventDefault();
  const fields = [...event.target.querySelectorAll("[required]")];
  const allValid = fields.map(validateField).every(Boolean);
  const msg = $("form-msg");
  if (!allValid) {
    msg.className = "msg error-msg";
    msg.textContent = "Please fix the highlighted fields and try again.";
    return;
  }
  msg.className = "msg success";
  msg.textContent = "Thank you. Your report has been recorded (sample only, nothing is sent).";
  event.target.reset();
}

// ===== Start-up: fill dropdowns and attach events =====
const needs = [...new Set(services.map(s => s.need))];
$("need").innerHTML = '<option value="all">All needs</option>' + needs.map(n => `<option>${n}</option>`).join("");
const serviceOptions = '<option value="">Choose a service</option>' + services.map(s => `<option value="${s.id}">${s.name}</option>`).join("");
$("dest").innerHTML = serviceOptions;
$("fb-service").innerHTML = serviceOptions;

$("search").addEventListener("input", filterServices);
$("need").addEventListener("change", filterServices);
$("dest").addEventListener("change", e => showDirections(e.target.value));
$("service-list").addEventListener("click", e => {
  const button = e.target.closest("button[data-id]");
  if (button) { showDirections(button.dataset.id); location.hash = "directions"; }
});
$("feedback-form").addEventListener("submit", submitFeedback);
$("feedback-form").addEventListener("focusout", e => { if (e.target.required) validateField(e.target); });

filterServices();
