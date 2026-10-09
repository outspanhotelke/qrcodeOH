
# Hotel Guest Guide QR Code Generator

A responsive hotel guest guide with a professional brown theme. It allows you to display hotel information, accommodation rates, conference packages, recreation activities, dining information, and guest services through one QR code.

## 1. Features

- Professional brown, cream, and gold design.
- Responsive layout for computers, tablets, and mobile phones.
- Editable hotel profile and contact details.
- Room categories, prices, descriptions, and meal plans.
- Conference halls, packages, capacities, and rates.
- Recreation and wellness activities.
- Restaurants, bars, menus, prices, and opening hours.
- Guest information and hotel policies.
- QR code generation from a public HTTPS URL.
- QR code download as a PNG image.
- Local browser saving of hotel information.
- JSON backup export and import.
- Restore demo information.
- Print-friendly guest guide.

## 2. Project Files

Keep the following files together in one folder:

```text
hotel-guest-guide/
├── index.html
├── style.css
├── app.js
└── README.md
```

### File descriptions

- `index.html` — the guest guide structure and editing interface.
- `style.css` — responsive layout and brown theme.
- `app.js` — editing, local saving, QR generation, and backup functions.
- `README.md` — setup and publishing instructions.

## 3. Requirements

You need:

- A computer with a modern web browser, such as Chrome, Edge, or Firefox.
- A text editor, such as Notepad or Visual Studio Code.
- An internet connection to load the QR code library.
- A public HTTPS web host to make the guide accessible to hotel guests.

No local database or server is required for the basic version.

## 4. Set Up the Project

### Step 1: Create the folder

Create a folder named `hotel-guest-guide` on your computer.

### Step 2: Save the files

Save the HTML, CSS, and JavaScript code into these files:

- `index.html`
- `style.css`
- `app.js`

Save this documentation as `README.md`.

Make sure Windows has not accidentally saved the files as `index.html.txt`, `style.css.txt`, or `app.js.txt`.

### Step 3: Link the CSS file

Inside the `<head>` section of `index.html`, ensure this line is present:

```html
<link rel="stylesheet" href="style.css">
```

Remove the original internal `<style>...</style>` block if you are using the separate stylesheet.

### Step 4: Link the JavaScript file

Near the bottom of `index.html`, immediately before `</body>`, include:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>
<script src="app.js"></script>
```

Remove the old inline application JavaScript so that it does not conflict with `app.js`.

### Step 5: Open the guide

Double-click `index.html` to open it in your browser.

The sample hotel information should appear. Click **Edit Guide** to open the editing interface.

## 5. Customize Your Hotel Information

1. Click **Edit Guide**.
2. Enter your actual hotel name and tagline.
3. Update the address, telephone, email, and website.
4. Write a description of the hotel.
5. Add your facilities.
6. Enter your approved room rates.
7. Add conference packages and capacities.
8. Enter recreation activities and rates.
9. Add restaurants, menu information, and prices.
10. Update guest information, such as Wi-Fi instructions and check-in policies.
11. Click **Save Changes**.

The guest-facing guide will refresh after saving.

### Formatting items

For rooms, conferences, recreation, and dining, enter one item per line using this format:

```text
Name | Price | Description | Additional information
```

Examples:

```text
Standard Room | KSh 8,500 | Comfortable accommodation | Bed and breakfast
Deluxe Room | KSh 12,000 | Spacious room | Confirm inclusions
Swimming Pool | KSh 500 | Pool access | 8 AM to 6 PM
Full-Day Conference | KSh 3,500 per person | Conference package | Confirm capacity
```

For hotel facilities, enter one facility per line:

```text
Swimming Pool
Restaurant
Conference Facilities
Gym
Guest Wi-Fi
Parking
```

For guest information, enter:

```text
Check-in & Check-out | Confirm times with reception
Wi-Fi | Request guest access details from reception
Payments | Confirm accepted payment methods
```

Replace all sample prices and descriptions with approved hotel information before publishing.

## 6. Generate the Hotel QR Code

A QR code should contain the web address of your published guest guide, not the entire hotel guide itself.

### Step 1: Publish the guide

First, upload your files to a public web host that provides HTTPS.

Your published address might look like:

```text
https://yourhotel.example/guest-guide/
```

This is an illustrative address. Replace it with your actual published URL.

### Step 2: Enter the URL

Open the guest guide and find the **Generate Your Hotel QR Code** section.

Enter the complete public HTTPS address.

### Step 3: Generate the code

Click **Generate QR Code**.

The code will point to the address you entered.

### Step 4: Download the code

Click **Download QR PNG**.

Save the image and test it using a phone camera before printing it on room cards, menus, reception displays, conference materials, or hotel information stands.

### Step 5: Test guest access

Use a phone that is not connected to your computer. Scan the code and verify that the page opens without requiring access to your computer or local files.

## 7. Publishing Options

### Option A: Static web hosting

A static host is suitable for publishing the HTML, CSS, and JavaScript files.

General process:

1. Choose a static web hosting provider.
2. Create a site or project.
3. Upload `index.html`, `style.css`, and `app.js`, preserving their filenames and folder structure.
4. Enable HTTPS.
5. Open the public site URL.
6. Test the guide on a phone.
7. Generate the QR code using that public URL.

Examples of hosting services include GitHub Pages, Netlify, and Cloudflare Pages. Their setup procedures and account requirements may differ.

### Option B: Hotel website or hosting account

If the hotel already has a website and hosting account, the guide can be placed in a suitable directory.

For example, the public page could be:

```text
https://www.yourhotel.example/guest-guide/
```

Coordinate with the person responsible for the hotel website before uploading files.

## 8. Important: How Saving Works

The current version stores hotel information using browser `localStorage`.

This means:

- Saved changes remain in the same browser on the same device.
- Another computer or phone does not automatically receive those changes.
- Clearing browser data may remove the saved information.
- Uploading the files to a web host does not create a shared database.
- A QR code only opens the URL encoded in it; it does not publish your edits.

### How to update the public guest guide

With the current static version:

1. Make the changes in your working copy.
2. Save the changes.
3. Export a JSON backup.
4. Update the published site or the site's underlying data using a suitable publishing workflow.
5. Test the public page again.

**Important:** the current application does not automatically turn browser edits into a new hosted version. A more convenient shared editing system requires a hosted database, CMS, or backend API.

For a hotel that changes room rates, menus, and conference packages frequently, a centralized editing system is recommended.

## 9. Back Up and Restore Hotel Information

### Export a backup

1. Open **Edit Guide**.
2. Click **Export Backup**.
3. Save `hotel-guest-guide-backup.json` in a secure location.

### Import a backup

1. Open **Edit Guide**.
2. Click **Import Backup**.
3. Select a previously exported JSON file.
4. Confirm that the guide displays the expected information.

### Restore demo information

Click **Restore Demo Information** to replace the current browser copy with the sample information.

Use this option carefully because it replaces your current guide data in that browser.

Keep backup copies before restoring demo information.

## 10. Troubleshooting

### The brown theme does not appear

Check that:

- `style.css` is in the same folder as `index.html`.
- The HTML includes `<link rel="stylesheet" href="style.css">`.
- The old internal CSS has been removed.
- The browser has refreshed the page.

### The QR code does not generate

Check that:

- Your computer has an internet connection.
- The QRCode.js library has loaded.
- You entered a valid public HTTPS URL.
- You clicked **Generate QR Code** before downloading.

Open the browser developer console to check for JavaScript errors.

### The QR code scans but the page does not open

Check that:

- The page is published online.
- The URL is correct.
- HTTPS is working.
- The page is publicly accessible.
- The host has not restricted access.

A URL pointing to a local computer file will not work for ordinary hotel guests.

### Changes appear on one computer only

This is expected in the current version because it uses browser-local storage.

To share edits between hotel computers and guest devices, implement a centralized data source or CMS.

### The CSS or JavaScript is missing online

Confirm that all files were uploaded to the expected directory and that the paths in `index.html` match the actual filenames.

## 11. Security and Privacy

- Do not enter passwords, private staff records, or sensitive guest information into the public guide.
- Publish only information approved for guests.
- Use HTTPS.
- Restrict access to any future administrative editing interface.
- Keep backups in a secure location.
- Review prices and policies before publishing updates.

The basic version does not provide administrator authentication or centralized access control.

## 12. Recommended Future Improvements

For a production hotel deployment, consider adding:

- Secure administrator login.
- Centralized database and live updates.
- Image galleries for rooms and facilities.
- Separate menus for each restaurant.
- Multilingual guest information.
- Online booking and inquiry forms.
- Hotel-branded QR code with logo.
- Analytics for QR scans.
- Scheduled price and menu updates.
- Role-based editing permissions.
- Audit logs for changes to rates and policies.

## 13. Final Checklist

Before using the QR code at the hotel, confirm the following:

- [ ] Actual hotel details have replaced the sample data.
- [ ] Room rates and conference packages are approved.
- [ ] Recreation prices and opening hours are accurate.
- [ ] Restaurant menus and prices are current.
- [ ] `index.html`, `style.css`, and `app.js` are working together.
- [ ] The guide is hosted at a public HTTPS URL.
- [ ] The QR code points to the correct published page.
- [ ] The QR code has been tested using a mobile phone.
- [ ] A JSON backup has been saved.
- [ ] The hotel understands how public updates are published.

---

**Project:** Hotel Guest Guide QR Code Generator  
**Interface theme:** Brown, cream, and gold  
**Application type:** HTML, CSS, and JavaScript  
**Data storage:** Browser-local storage  
**QR destination:** Public HTTPS guest guide URL