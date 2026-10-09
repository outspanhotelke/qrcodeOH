
/* =====================================================
   HOTEL GUEST GUIDE QR GENERATOR
   app.js
   Editing, local saving, QR generation and data backup
   ===================================================== */

"use strict";

const STORAGE_KEY = "hotelGuestGuide_v1";

const demoData = {
  name: "Your Hotel Name",
  tagline: "Hospitality • Comfort • Memorable Experiences",
  address: "Enter your hotel address",
  phone: "+254 700 000 000",
  email: "info@example.com",
  website: "https://example.com",
  description:
    "Welcome to our hotel. Discover our accommodation, dining, conferences and recreational facilities. Please contact our team to confirm availability and current rates.",
  facilities: [
    "Accommodation",
    "Restaurant & Bar",
    "Conference Facilities",
    "Swimming Pool",
    "Gym & Wellness",
    "Wi-Fi Internet",
    "Parking",
    "Room Service"
  ],
  rooms: [
    {
      name: "Standard Room",
      price: "KSh 8,000",
      description: "A comfortable room for a relaxing stay.",
      extra: "Confirm meal plan with reservations."
    },
    {
      name: "Deluxe Room",
      price: "KSh 12,000",
      description: "Extra comfort and space for your stay.",
      extra: "Confirm meal plan with reservations."
    },
    {
      name: "Suite",
      price: "KSh 18,000",
      description: "A spacious option for guests seeking added comfort.",
      extra: "Confirm meal plan with reservations."
    }
  ],
  conferences: [
    {
      name: "Full-Day Conference",
      price: "KSh 3,500 per person",
      description: "Meeting facilities and catering package.",
      extra: "Confirm hall availability and inclusions."
    },
    {
      name: "Half-Day Conference",
      price: "KSh 2,500 per person",
      description: "A flexible package for shorter meetings.",
      extra: "Confirm hall availability and inclusions."
    }
  ],
  recreation: [
    {
      name: "Swimming Pool",
      price: "Confirm rate",
      description: "Enjoy a refreshing swim.",
      extra: "Ask reception for opening hours."
    },
    {
      name: "Gym",
      price: "Confirm rate",
      description: "Fitness facilities for your wellness routine.",
      extra: "Ask reception for opening hours."
    },
    {
      name: "Snooker & Racket Sports",
      price: "Confirm rate",
      description: "Recreational activities for guests.",
      extra: "Availability subject to confirmation."
    }
  ],
  dining: [
    {
      name: "Main Restaurant",
      price: "Menu prices apply",
      description: "Enjoy meals, refreshments and daily specials.",
      extra: "Ask the restaurant for service hours."
    },
    {
      name: "Bar & Lounge",
      price: "Menu prices apply",
      description: "A relaxed space for drinks and socialising.",
      extra: "Ask the team for opening hours."
    },
    {
      name: "Room Service",
      price: "Menu prices apply",
      description: "Ask about food and beverages available to your room.",
      extra: "Contact reception for availability."
    }
  ],
  information: [
    {
      name: "Check-in & Check-out",
      extra: "Confirm the applicable times with reception."
    },
    {
      name: "Wi-Fi",
      extra: "Ask reception for the guest network name and access details."
    },
    {
      name: "Payments",
      extra: "Confirm accepted payment methods with reception."
    },
    {
      name: "Safety & Security",
      extra: "Follow posted safety guidance and contact reception if needed."
    },
    {
      name: "Bookings & Reservations",
      extra: "Contact the hotel directly to confirm availability and current rates."
    }
  ]
};

let guide = loadStoredGuide();

/* ---------------------------
   General helpers
--------------------------- */

function deepCopy(value) {
  return JSON.parse(JSON.stringify(value));
}

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

function getElement(id) {
  return document.getElementById(id);
}

function setText(id, value) {
  const element = getElement(id);
  if (element) element.textContent = value ?? "";
}

function setValue(id, value) {
  const element = getElement(id);
  if (element) element.value = value ?? "";
}

function getValue(id) {
  const element = getElement(id);
  return element ? element.value.trim() : "";
}

function showStatus(id, message) {
  setText(id, message);
}

/* ---------------------------
   Load and save data
--------------------------- */

function loadStoredGuide() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      const parsed = JSON.parse(saved);

      if (parsed && typeof parsed === "object") {
        return { ...deepCopy(demoData), ...parsed };
      }
    }
  } catch (error) {
    console.warn("Unable to load saved guide:", error);
  }

  return deepCopy(demoData);
}

function persistGuide() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(guide));
    return true;
  } catch (error) {
    console.error("Unable to save guide:", error);
    alert(
      "The guide could not be saved in this browser. " +
      "Try exporting a backup and check your browser storage settings."
    );
    return false;
  }
}

/* ---------------------------
   Render guest-facing guide
--------------------------- */

function renderCards(containerId, items, type) {
  const container = getElement(containerId);
  if (!container) return;

  container.replaceChildren();

  if (!Array.isArray(items) || items.length === 0) {
    const empty = document.createElement("p");
    empty.className = "muted";
    empty.textContent = "Information will be added soon.";
    container.appendChild(empty);
    return;
  }

  items.forEach(item => {
    const card = document.createElement("article");
    card.className = "item";

    if (type === "facility") {
      card.innerHTML = `<h3>${escapeHTML(item)}</h3>`;
    } else if (type === "information") {
      card.innerHTML = `
        <h3>${escapeHTML(item.name)}</h3>
        <p>${escapeHTML(item.extra)}</p>
      `;
    } else {
      card.innerHTML = `
        <h3>${escapeHTML(item.name)}</h3>
        <p class="price">${escapeHTML(item.price)}</p>
        <p>${escapeHTML(item.description)}</p>
        <small>${escapeHTML(item.extra)}</small>
      `;
    }

    container.appendChild(card);
  });
}

function renderGuide() {
  document.title = `${guide.name || "Hotel"} | Guest Guide`;

  setText("headerHotelName", guide.name);
  setText("headerTagline", guide.tagline);
  setText("welcomeTitle", `Welcome to ${guide.name || "Our Hotel"}`);
  setText("hotelDescription", guide.description);
  setText("hotelAddress", guide.address);
  setText("hotelPhone", guide.phone);
  setText("hotelEmail", guide.email);
  setText("hotelWebsite", guide.website);

  setText("contactPhone", guide.phone);
  setText("contactEmail", guide.email);
  setText("contactAddress", guide.address);
  setText("footerHotelName", guide.name);

  renderCards("facilities", guide.facilities, "facility");
  renderCards("roomsList", guide.rooms, "listing");
  renderCards("conferencesList", guide.conferences, "listing");
  renderCards("recreationList", guide.recreation, "listing");
  renderCards("diningList", guide.dining, "listing");
  renderCards("informationList", guide.information, "information");
}

/* ---------------------------
   Convert editor text
--------------------------- */

function parseLines(text, type) {
  return String(text || "")
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(Boolean)
    .map(line => {
      const parts = line.split("|").map(part => part.trim());

      if (type === "information") {
        return {
          name: parts[0] || "",
          extra: parts.slice(1).join(" | ") || ""
        };
      }

      return {
        name: parts[0] || "",
        price: parts[1] || "",
        description: parts[2] || "",
        extra: parts[3] || ""
      };
    });
}

function formatLines(items, type) {
  if (!Array.isArray(items)) return "";

  return items.map(item => {
    if (type === "information") {
      return `${item.name || ""} | ${item.extra || ""}`;
    }

    return [
      item.name || "",
      item.price || "",
      item.description || "",
      item.extra || ""
    ].join(" | ");
  }).join("\n");
}

/* ---------------------------
   Editing interface
--------------------------- */

function toggleEditor() {
  const editor = getElement("editor");
  if (!editor) return;

  const opening = getComputedStyle(editor).display === "none";

  editor.style.display = opening ? "block" : "none";

  if (opening) {
    loadEditor();
    editor.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function loadEditor() {
  setValue("fName", guide.name);
  setValue("fTagline", guide.tagline);
  setValue("fAddress", guide.address);
  setValue("fPhone", guide.phone);
  setValue("fEmail", guide.email);
  setValue("fWebsite", guide.website);
  setValue("fDescription", guide.description);

  setValue(
    "fFacilities",
    (guide.facilities || []).join("\n")
  );

  setValue("fRooms", formatLines(guide.rooms, "listing"));
  setValue("fConferences", formatLines(guide.conferences, "listing"));
  setValue("fRecreation", formatLines(guide.recreation, "listing"));
  setValue("fDining", formatLines(guide.dining, "listing"));
  setValue("fInformation", formatLines(guide.information, "information"));

  showStatus("saveStatus", "");
}

function saveGuide() {
  const email = getValue("fEmail");

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert("Please enter a valid email address.");
    getElement("fEmail")?.focus();
    return;
  }

  guide = {
    name: getValue("fName") || "Hotel Guest Guide",
    tagline: getValue("fTagline"),
    address: getValue("fAddress"),
    phone: getValue("fPhone"),
    email,
    website: getValue("fWebsite"),
    description: getValue("fDescription"),
    facilities: getValue("fFacilities")
      .split(/\r?\n/)
      .map(value => value.trim())
      .filter(Boolean),
    rooms: parseLines(getValue("fRooms"), "listing"),
    conferences: parseLines(getValue("fConferences"), "listing"),
    recreation: parseLines(getValue("fRecreation"), "listing"),
    dining: parseLines(getValue("fDining"), "listing"),
    information: parseLines(getValue("fInformation"), "information")
  };

  if (!persistGuide()) return;

  renderGuide();

  showStatus(
    "saveStatus",
    "Changes saved in this browser. To update the public guest guide, publish the updated data or website online."
  );
}

function resetGuide() {
  const confirmed = confirm(
    "Restore the sample hotel information? Your current guide in this browser will be replaced."
  );

  if (!confirmed) return;

  guide = deepCopy(demoData);

  if (!persistGuide()) return;

  renderGuide();
  loadEditor();

  showStatus("saveStatus", "Demo information restored.");
}

/* ---------------------------
   JSON backup and restore
--------------------------- */

function exportData() {
  const backup = {
    format: "hotel-guest-guide",
    version: 1,
    exportedAt: new Date().toISOString(),
    data: guide
  };

  const blob = new Blob(
    [JSON.stringify(backup, null, 2)],
    { type: "application/json" }
  );

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "hotel-guest-guide-backup.json";
  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(url);
}

function isValidGuide(data) {
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return false;
  }

  if (typeof data.name !== "string") return false;

  const arrayFields = [
    "facilities",
    "rooms",
    "conferences",
    "recreation",
    "dining",
    "information"
  ];

  return arrayFields.every(field =>
    data[field] === undefined || Array.isArray(data[field])
  );
}

function importData(event) {
  const file = event.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = () => {
    try {
      const parsed = JSON.parse(reader.result);
      const imported = parsed.data || parsed;

      if (!isValidGuide(imported)) {
        throw new Error("The selected file is not a valid hotel guide backup.");
      }

      guide = {
        ...deepCopy(demoData),
        ...imported
      };

      if (!persistGuide()) return;

      renderGuide();
      loadEditor();

      showStatus("saveStatus", "Hotel guide backup imported successfully.");
    } catch (error) {
      alert(
        "Import failed. Please choose a valid JSON backup exported by this guide."
      );
      console.error(error);
    } finally {
      event.target.value = "";
    }
  };

  reader.onerror = () => {
    alert("The backup file could not be read.");
    event.target.value = "";
  };

  reader.readAsText(file);
}

/* ---------------------------
   QR code generation
--------------------------- */

function generateQR() {
  const input = getElement("qrDestination");
  const output = getElement("qrcode");
  const status = getElement("qrStatus");

  if (!input || !output || !status) {
    console.error("QR generator elements are missing from index.html.");
    return;
  }

  const destination = input.value.trim();

  if (!destination) {
    status.textContent =
      "Enter the public HTTPS address of your published guest guide.";
    return;
  }

  let url;

  try {
    url = new URL(destination);
  } catch {
    status.textContent = "Enter a valid public web address.";
    return;
  }

  if (url.protocol !== "https:") {
    status.textContent =
      "Use a public HTTPS address beginning with https://";
    return;
  }

  if (url.username || url.password) {
    status.textContent = "The URL must not contain embedded login credentials.";
    return;
  }

  if (typeof window.QRCode === "undefined") {
    status.textContent =
      "The QR library could not load. Check your internet connection and reload the page.";
    return;
  }

  output.replaceChildren();

  try {
    new QRCode(output, {
      text: url.href,
      width: 280,
      height: 280,
      colorDark: "#382519",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H
    });

    status.textContent =
      "QR code generated. Scan it with a phone to verify the public guest guide opens correctly.";
  } catch (error) {
    console.error("QR generation failed:", error);
    status.textContent = "Could not generate the QR code. Please try again.";
  }
}

function downloadQR() {
  const output = getElement("qrcode");

  if (!output || !output.querySelector("canvas, img")) {
    alert("Generate the QR code before downloading it.");
    return;
  }

  const canvas = output.querySelector("canvas");

  if (canvas) {
    canvas.toBlob(blob => {
      if (!blob) {
        alert("Could not prepare the QR image for download.");
        return;
      }

      downloadBlob(blob, "hotel-guest-guide-qr.png");
    }, "image/png");

    return;
  }

  const image = output.querySelector("img");

  if (image && image.src) {
    const link = document.createElement("a");
    link.href = image.src;
    link.download = "hotel-guest-guide-qr.png";
    link.click();
  }
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();

  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/* ---------------------------
   Connect HTML controls
--------------------------- */

function initializeApp() {
  renderGuide();

  // Support existing inline onclick attributes in index.html.
  window.toggleEditor = toggleEditor;
  window.loadEditor = loadEditor;
  window.saveGuide = saveGuide;
  window.resetGuide = resetGuide;
  window.exportData = exportData;
  window.importData = importData;
  window.generateQR = generateQR;
  window.downloadQR = downloadQR;

  const importInput = getElement("importFile");

  if (importInput) {
    importInput.addEventListener("change", importData);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeApp);
} else {
  initializeApp();
}