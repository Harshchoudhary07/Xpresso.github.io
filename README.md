# CampusRide - Student Vehicle Rental Platform 
link :  https://xpressooo.netlify.app/

A comprehensive student-focused vehicle rental platform built with vanilla HTML, CSS, and JavaScript.

## Features

### For Renters
- Browse available bikes and scooters
- Advanced filtering (location, type, gear, brand, price)
- Real-time vehicle availability
- Secure booking system
- KYC verification process
- Dashboard to manage rentals
- Dispute resolution system

### For Owners
- List vehicles with detailed information
- Multi-step listing form with photo upload
- Set custom pricing and rules
- Manage bookings and earnings
- Track active and completed rentals

### Platform Features
- Complete design system with CampusRide branding
- Responsive design (mobile, tablet, desktop)
- Hash-based routing (SPA)
- LocalStorage for data persistence
- Comprehensive policies and fine structure
- Zero-tolerance safety policies

## Getting Started

### Option 1: Using Python
```bash
cd ride
python -m http.server 8000
```

Then open: http://localhost:8000

### Option 2: Using Node.js
```bash
cd ride
npx http-server -p 8000
```

Then open: http://localhost:8000

### Option 3: Using VS Code Live Server
1. Install "Live Server" extension
2. Right-click on `index.html`
3. Select "Open with Live Server"

## Project Structure

```
ride/
├── index.html              # Main entry point
├── css/
│   ├── global.css          # Design system & variables
│   ├── components.css      # Reusable component styles
│   └── pages.css           # Page-specific styles
├── js/
│   ├── app.js              # Main app logic & routing
│   ├── auth.js             # Authentication logic
│   ├── components.js       # Reusable component templates
│   ├── data.js             # Mock data
│   ├── utils.js            # Helpers & validation
│   └── pages/
│       ├── home.js
│       ├── browse.js
│       ├── vehicle-details.js
│       ├── list-vehicle.js
│       ├── verification.js
│       ├── dashboard.js
│       └── policies.js
└── README.md
```

## Pages

1. **Home** - Hero section, features, how it works
2. **Browse** - Vehicle listing with filters
3. **Vehicle Details** - Full vehicle info and booking
4. **List Vehicle** - 6-step form to list a vehicle
5. **Verification** - 4-step KYC process
6. **Dashboard** - Manage rentals and listings
7. **Policies** - Complete policies and fine structure
8. **Login/Signup** - Authentication pages



✅ Complete design system
✅ Responsive navigation
✅ Hash-based routing
✅ Browse with real-time filtering
✅ Vehicle details with image gallery
✅ Multi-step vehicle listing form
✅ Photo upload with compression
✅ 4-step KYC verification
✅ Role-based dashboard
✅ Booking management
✅ Comprehensive policies page
✅ Toast notifications
✅ Modal system
✅ Form validation
✅ LocalStorage persistence

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Notes

- This is a frontend-only implementation
- No real backend or database
- Data is stored in LocalStorage
- Images are stored as base64
- Payment gateway is UI only

## Future Enhancements

- Backend API integration
- Real payment processing
- Admin panel
- Real-time notifications
- Chat system
- Rating and reviews
- Map integration
- Mobile app

---

Built with ❤️ for students by student


