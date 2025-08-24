// AutoElite Car Dealership JavaScript
window.adobeDataLayer = window.adobeDataLayer || [];
let testDriveFormSubmitted = false;
let getQuoteFormSubmitted = false;
const supabaseUrl = 'https://vxmrcfyhqcjwxiptidrk.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ4bXJjZnlocWNqd3hpcHRpZHJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTExODc1MzIsImV4cCI6MjA2Njc2MzUzMn0.9eY00nEH4plUnLc9V_HXZiMwsX_OuhDD9sa8_MJvOW0'
const client = supabase.createClient(supabaseUrl, supabaseKey)

function setDefaultText() {
    const textarea = document.getElementById('testDriveRequirements');
    if (!textarea.value.trim()) {
        textarea.value = 'No special requirements';
    }
}
function setDefaultText1() {
    const textarea = document.getElementById('quoteComments');
    if (!textarea.value.trim()) {
        textarea.value = 'No special requirements';
    }
}

function mergeDateTime(preferredDate,preferredTime) {
        
    const mergedDateTime = new Date(`${preferredDate}T${preferredTime}`);
    console.log(mergedDateTime);
    return mergedDateTime.toISOString();
}
// Car data
const cars = [
    {
        id: "1",
        name: "Elite Sedan S-Class",
        description: "Premium luxury sedan with advanced safety features and unmatched comfort",
        price: 89900,
        year: "2024",
        category: "Luxury Sedan",
        imageUrl: "./car 1.avif",
        features: [
            "Premium Nappa leather seats",
            "Adaptive cruise control",
            "Panoramic sunroof",
            "Premium sound system",
            "Advanced safety suite",
            "Climate controlled seats"
        ],
        specifications: {
            engine: "3.0L Twin-Turbo V6",
            power: "429 HP",
            transmission: "9-Speed Automatic",
            fuelEconomy: "22/30 MPG",
            seating: "5 Passengers"
        },
        badge: "Featured"
    },
    {
        id: "2",
        name: "Thunder Coupe GT",
        description: "High-performance sports coupe with racing-inspired design and cutting-edge technology",
        price: 125500,
        year: "2024",
        category: "Sports Coupe",
        imageUrl: "./car 2.avif",
        features: [
            "Carbon fiber aerodynamics",
            "Performance braking system",
            "Sport-tuned suspension",
            "Launch control system",
            "Track-ready tires",
            "Performance exhaust"
        ],
        specifications: {
            engine: "4.0L Twin-Turbo V8",
            power: "630 HP",
            transmission: "8-Speed DCT",
            fuelEconomy: "15/22 MPG",
            acceleration: "0-60 mph: 3.2 seconds"
        },
        badge: "Performance"
    },
    {
        id: "3",
        name: "Prestige SUV X7",
        description: "Spacious luxury SUV perfect for families with premium amenities and safety features",
        price: 95900,
        year: "2024",
        category: "Luxury SUV",
        imageUrl: "./car 3.avif",
        features: [
            "Third-row seating",
            "All-wheel drive",
            "Premium interior materials",
            "Advanced infotainment",
            "Cargo management system",
            "Towing capability"
        ],
        specifications: {
            engine: "3.0L Turbo I6",
            power: "375 HP",
            transmission: "8-Speed Automatic",
            fuelEconomy: "20/26 MPG",
            seating: "Up to 7 Passengers"
        },
        badge: "Family"
    },
    {
        id: "4",
        name: "Volt Premium EV",
        description: "Cutting-edge electric vehicle with zero emissions and advanced autonomous features",
        price: 115900,
        year: "2024",
        category: "Electric",
        imageUrl: "./car 4.avif",
        features: [
            "500-mile electric range",
            "Fast charging capability",
            "Autonomous driving features",
            "Premium EV technology",
            "Silent operation",
            "Regenerative braking"
        ],
        specifications: {
            motor: "Dual Electric Motors",
            power: "516 HP",
            range: "500 miles",
            charging: "20-80% in 18 minutes",
            seating: "5 Passengers"
        },
        badge: "Electric"
    },
    {
        id: "5",
        name: "Breeze Convertible",
        description: "Open-air luxury convertible with premium materials and exhilarating performance",
        price: 138900,
        year: "2024",
        category: "Convertible",
        imageUrl: "./car 5.avif",
        features: [
            "Power soft-top",
            "Wind deflector system",
            "Premium interior trim",
            "Performance suspension",
            "All-season convertible",
            "Luxury comfort features"
        ],
        specifications: {
            engine: "3.0L Twin-Turbo V6",
            power: "382 HP",
            transmission: "8-Speed Automatic",
            fuelEconomy: "20/28 MPG",
            topSpeed: "155 mph"
        },
        badge: "Luxury"
    },
    {
        id: "6",
        name: "City Elite Compact",
        description: "Agile and efficient luxury compact car designed for urban sophistication",
        price: 65900,
        year: "2024",
        category: "Compact Luxury",
        imageUrl: "./car 6.avif",
        features: [
            "Compact luxury design",
            "Efficient performance",
            "Advanced connectivity",
            "Premium materials",
            "Urban-focused features",
            "Excellent fuel economy"
        ],
        specifications: {
            engine: "2.0L Turbo I4",
            power: "241 HP",
            transmission: "7-Speed DCT",
            fuelEconomy: "28/36 MPG",
            seating: "5 Passengers"
        },
        badge: "Urban"
    }
];

// Utility functions
function formatPrice(price) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(price);
}

function getBadgeClass(badge) {
    const badgeClasses = {
        "Featured": "badge-featured",
        "Performance": "badge-performance",
        "Family": "badge-family",
        "Electric": "badge-electric",
        "Luxury": "badge-luxury",
        "Urban": "badge-urban"
    };
    return badgeClasses[badge] || "badge-featured";
}

function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

function showToast(message, type = 'success') {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `alert alert-${type === 'success' ? 'success' : 'danger'}-custom alert-custom position-fixed`;
    toast.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Load cars into the grid
function loadCars() {
    //const carsGrid = document.getElementById('carsGrid');
    
    const carsGrid = document.getElementById('carsGrid');

    carsGrid.innerHTML = '';
    
    cars.forEach(car => {
        const carCard = document.createElement('div');
        carCard.className = 'col-lg-4 col-md-6 mb-4';
        carCard.innerHTML = `
            <div class="card car-card h-100" id="${car.id}"  onclick="showCarDetails(${car.id})">
                <div class="position-relative">
                    <img src="${car.imageUrl}" class="card-img-top" alt="${car.name}">
                    <span class="badge ${getBadgeClass(car.badge)}">${car.badge}</span>
                </div>
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title fw-bold text-primary">${car.name}</h5>
                    <p class="card-text text-muted flex-grow-1">${car.description}</p>
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <span class="price-tag">${formatPrice(car.price)}</span>
                        <span class="text-muted small">${car.year} Model</span>
                     </div>
                     <div class="d-flex gap-2">
                        <button class="btn btn-outline-primary flex-fill"
    onclick="event.stopPropagation(); trackInteraction('Get Quote', ${car.id}); showQuoteModal(${car.id})">
    Get Quote
</button>
<button class="btn btn-primary flex-fill"
    onclick="event.stopPropagation(); trackInteraction('Test Drive', ${car.id}); showTestDriveModal(${car.id})">
    Test Drive
</button>


                        
                    </div>
                </div>
            </div>
        `;
      carsGrid.appendChild(carCard);

      
// Attach tracking to each card
    handlePageLoad(`${car.id}`, "Car Page", car.name);

    
    });
}

// Load car options into select dropdowns
function loadCarOptions() {
    const testDriveSelect = document.getElementById('testDriveCar');
    const quoteSelect = document.getElementById('quoteCar');
    
    // Clear existing options
    testDriveSelect.innerHTML = '<option value="">Select a vehicle</option>';
    quoteSelect.innerHTML = '<option value="">Select a vehicle</option>';
    
    cars.forEach(car => {
        const testDriveOption = document.createElement('option');
        testDriveOption.value = car.id;
        testDriveOption.textContent = car.name;
        testDriveSelect.appendChild(testDriveOption);
        
        const quoteOption = document.createElement('option');
        quoteOption.value = car.id;
        quoteOption.textContent = `${car.name} - ${formatPrice(car.price)}`;
        quoteSelect.appendChild(quoteOption);
    });
}

// Show car details modal
function showCarDetails(carId) {
    const car = cars.find(c => c.id === carId);
    if (!car) return;
    
    const modal = document.getElementById('carDetailsModal');
    const title = document.getElementById('carDetailsTitle');
    const body = document.getElementById('carDetailsBody');
    
    title.textContent = car.name;
    
    body.innerHTML = `
        <div class="row">
            <div class="col-lg-6">
                <img src="${car.imageUrl}" class="img-fluid rounded-3 mb-4" alt="${car.name}">
            </div>
            <div class="col-lg-6">
                <p class="lead mb-4">${car.description}</p>
                
                <div class="mb-4">
                    <h5 class="fw-bold text-primary mb-3">Key Features</h5>
                    <ul class="feature-list">
                        ${car.features.map(feature => `
                            <li><i class="fas fa-check"></i> ${feature}</li>
                        `).join('')}
                    </ul>
                </div>
                
                <div class="bg-light rounded-3 p-4 mb-4">
                    <div class="text-center mb-3">
                        <div class="price-tag">${formatPrice(car.price)}</div>
                        <div class="text-muted">Starting MSRP</div>
                    </div>
                    
                    <h6 class="fw-bold mb-3">Specifications</h6>
                    <div class="specs-list">
                        ${Object.entries(car.specifications).map(([key, value]) => `
                            <div class="spec-item">
                                <span class="spec-label">${key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                                <span class="spec-value">${value}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="d-flex gap-3">
                    <button class="btn btn-primary flex-fill" onclick="showTestDriveModal(${car.id}); trackInteraction('Test Drive', ${car.id}); bootstrap.Modal.getInstance(document.getElementById('carDetailsModal')).hide();">
                        <i class="fas fa-calendar me-2"></i> Test Drive
                    </button>
                    <button class="btn btn-outline-primary flex-fill" onclick="showQuoteModal(${car.id}); trackInteraction('Get Quote', ${car.id}); bootstrap.Modal.getInstance(document.getElementById('carDetailsModal')).hide();">
                        <i class="fas fa-file-alt me-2"></i> Get Quote
                    </button>
                </div>
            </div>
        </div>
    `;
    
    new bootstrap.Modal(modal).show();
}

// Show test drive modal with pre-selected car
function showTestDriveModal(carId = null) {
    if (carId) {
        document.getElementById('testDriveCar').value = carId;
    }
    new bootstrap.Modal(document.getElementById('testDriveModal')).show();
}

// Show quote modal with pre-selected car
function showQuoteModal(carId = null) {
    if (carId) {
        document.getElementById('quoteCar').value = carId;
    }
    new bootstrap.Modal(document.getElementById('quoteModal')).show();
}

// Set minimum date for test drive booking
function setMinimumDate() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('testDriveDate').min = today;
}

// Form validation and submission
function validateForm(formId) {
    const form = document.getElementById(formId);
    const inputs = form.querySelectorAll('input[required], select[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('is-invalid');
            isValid = false;
        } else {
            input.classList.remove('is-invalid');
        }
    });
    
    return isValid;
}

// Form submission handlers
function handleFormSubmission(formId, successMessage) {
    if (validateForm(formId)) {
        // Simulate form submission
        showToast(successMessage, 'success');
        
        // Reset form and close modal
        document.getElementById(formId).reset();
        const modal = bootstrap.Modal.getInstance(document.querySelector(`#${formId}`).closest('.modal'));
        if (modal) {
            modal.hide();
        }
        
        return true;
    } else {
        showToast('Please fill in all required fields.', 'error');
        return false;
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Load cars and set up page
    loadCars();
    loadCarOptions();
    setMinimumDate();
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    document.getElementById('loginForm').addEventListener('submit', async function(e) {
        e.preventDefault();
    
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
    
        const { data: signInData, error: signInError } = await client.auth.signInWithPassword({ email, password });
    
        if (signInError) {
            showToast('Please enter your email and password.', 'error');
        } else {
            const Email = signInData.user.email;
            window.gmail=Email;
           

            window.adobeDataLayer.push({
                event:"Signin",user:{
                    email:Email
                }
            })
    
            // Query the 'profiles' table for first_name using the user ID
            const { data,error } = await client
                .from('users')
                .select('first_name')
                .eq('email', Email)
                .single();

                console.log(Email);
    
            if (error) {
                showToast('Login succeeded, but failed to fetch user profile.', 'error');
                return;
            }
    
            const firstName = data.first_name;
            
    
            showToast(`Successfully signed in! Welcome back, ${firstName}.`, 'success');
            bootstrap.Modal.getInstance(document.getElementById('loginModal')).hide();
            this.reset();
            updateUIForLoggedInUser(firstName);
        }
    });


    // Signup form submission
    document.getElementById('signupForm').addEventListener('submit', async function signUp(e) {
        e.preventDefault();
        
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('signupEmail').value;
        const phone = document.getElementById('signupPhone').value;
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const agreeTerms = document.getElementById('agreeTerms').checked;


        window.adobeDataLayer.push({
            event:"Signup",user:{
                email:email
            }
        })

        const { data, error } = await client.auth.signUp({ email, password });
        // const { data, error } = await client.auth.signUp({ phone, password });

        if (error) {
            showToast(error.message, 'error');
            return;
          }

        // Insert additional data into the `users` table
 const { error: insertError } = await client
 .from('users')
 .insert([
   {
     email,
     phone_number:phone,
     first_name: firstName,
     last_name: lastName,
     agree_terms: agreeTerms
   },
 ]);
if (insertError) {
 showToast('Error saving user data: ' + insertError.message, 'error');
 return;
}
showToast('Signup successful!', 'success');
         
        
        if (!firstName || !lastName || !email || !password || !confirmPassword || !phone) {
            showToast('Please fill in all required fields.', 'error');
            return;
        }
        
        if (password !== confirmPassword) {
            showToast('Passwords do not match.', 'error');
            return;
        }
        
        if (!agreeTerms) {
            showToast('Please agree to the Terms and Conditions.', 'error');
            return;
        }
        
        showToast('Account created successfully! Welcome to AutoElite.', 'success');
        bootstrap.Modal.getInstance(document.getElementById('signupModal')).hide();
        this.reset();
        
        // Update UI to show logged in state
        updateUIForLoggedInUser(email);
    });
    
    // Test drive form submission
    

    document.getElementById('testDriveForm').addEventListener('submit', function(e) {
        e.preventDefault();
        testDriveFormSubmitted = true;
    const firstName = document.getElementById('testDriveFirstName').value;
    const lastName = document.getElementById('testDriveLastName').value;
    const email = document.getElementById('testDriveEmail').value;
    const phone = document.getElementById('testDrivePhone').value;
    const preferredVehicle = document.getElementById('testDriveCar').value;
    const preferredDate = document.getElementById('testDriveDate').value;
    const preferredTime = document.getElementById('testDriveTime').value;
    const specialRequirements = document.getElementById('testDriveRequirements').value;

    console.log(firstName);

    const mergedDateTime = mergeDateTime(preferredDate,preferredTime).toString();
    //const car = cars.find(c => c.id === preferredVehicle);
       

      window.adobeDataLayer.push({
           event:"Schedule Test Drive",
           Details:{
               preferredVehicle:preferredVehicle,
               preferredDate:mergedDateTime,
               specialRequirements:specialRequirements
            },
            user: {
                email:email,
                firstName: firstName,
                lastName:lastName,
                phone:phone
            },
            car: cars[preferredVehicle - 1]
        })
        handleFormSubmission('testDriveForm', 'Test drive scheduled successfully! We will contact you soon to confirm your appointment.');
    });
    
    // Quote form submission
    document.getElementById('quoteForm').addEventListener('submit', function(e) {
        e.preventDefault();
        getQuoteFormSubmitted = true;
    const firstName = document.getElementById('quoteFirstName').value;
    const lastName = document.getElementById('quoteLastName').value;
    const email = document.getElementById('quoteEmail').value;
    const phone = document.getElementById('quotePhone').value;
    const preferredVehicle = document.getElementById('quoteCar').value;
    const financingOption = document.getElementById('quoteFinancing').value;
    const specialRequirements = document.getElementById('quoteComments').value;

    console.log(firstName);
       

      window.adobeDataLayer.push({
           event:"Request Quote",Details:{
               preferredVehicle:preferredVehicle,
               financingOption:financingOption,
               specialRequirements:specialRequirements
            },
            user: {
                email:email,
                firstName: firstName,
                lastName:lastName,
                phone:phone
            },
            car: cars[preferredVehicle - 1]
        })
        handleFormSubmission('quoteForm', 'Quote request submitted successfully! We will contact you soon with a personalized quote.');
    });
    
    // Real-time form validation
    document.querySelectorAll('input, select').forEach(input => {
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required')) {
                if (!this.value.trim()) {
                    this.classList.add('is-invalid');
                } else {
                    this.classList.remove('is-invalid');
                }
            }
        });
    });
    
    // Password confirmation validation
    document.getElementById('confirmPassword').addEventListener('input', function() {
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = this.value;
        
        if (confirmPassword && password !== confirmPassword) {
            this.classList.add('is-invalid');
        } else {
            this.classList.remove('is-invalid');
        }
    });
});

// Update UI for logged in user
function updateUIForLoggedInUser(email) {
    const authButtons = document.querySelector('.d-flex.gap-2');
    if (authButtons) {
        authButtons.innerHTML = `
            <span class="navbar-text me-3">Welcome, ${email.split('@')[0]}</span>
            <button class="btn btn-outline-primary" onclick="logout()">Sign Out</button>
        `;
    }
  
}

// Logout function
async function logout() {
    showToast('Successfully signed out. See you soon!', 'success');
    
    // Reset UI to logged out state
    const authButtons = document.querySelector('.d-flex.gap-2');
    if (authButtons) {
        authButtons.innerHTML = `
            <button class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#loginModal">Sign In</button>
            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#signupModal">Sign Up</button>
        `;
    }


   // Get current session and extract the email

    const {
      data: { user },
      error
    } = await client.auth.getUser()
    if (error) {
      console.error('Error fetching user:', error.message)
      return null
    }
    const email = user?.email
    console.log('User email:', email)
    // return email

    


    
    window.adobeDataLayer.push({
        event:"logout",
        user:{
            email:email
        }
    })

          
  
}

// Add some animations on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('bg-white');
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    } else {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    }
});

// Export functions for global access
window.scrollToSection = scrollToSection;
window.showCarDetails = showCarDetails;
window.showTestDriveModal = showTestDriveModal;
window.showQuoteModal = showQuoteModal;
window.logout = logout;



function handlePageLoad(buttonId, pageTitle, pageName) {
    const button = document.getElementById(buttonId);
    if (!button) {
        console.warn(`Element with ID '${buttonId}' not found.`);
        return;
    }

    button.addEventListener('click', function(e) {
        e.preventDefault();
        console.log(pageTitle);
        window.adobeDataLayer.push({
            event: "viewChange",
            Page: {
                pageTitle: pageTitle,
                pageName: pageName,
                pageUrl: window.location.href
            }
        });
    });
}

handlePageLoad("siginpage", "Signin", "signin Page");
handlePageLoad("signup", "Signup", "signupPage");
handlePageLoad("schedule_test_drive", "Schedule Test Drive", "Schedule Test Drive");
  // Call after appending to DOM
 // handlePageLoad(cardId, "Car Page", cardId);


 function trackInteraction(actionType, carId) {
    const car = cars.find(c => c.id === carId);
    if (!car) {
        console.warn(`Car with ID ${carId} not found.`);
        return;
    }

    window.adobeDataLayer.push({
        event: "viewChange",
        Page: {
            pageTitle: actionType,
            pageName: actionType,
            pageUrl: window.location.href
        }
    });

    console.log(`Tracked ${actionType} for ${car.name}`);
}





// document.getElementById('closing-modal-btn').addEventListener('click', function(e) {
//     e.preventDefault();
// const firstName = document.getElementById('quoteFirstName').value;
// // const lastName = document.getElementById('quoteLastName').value;
// // const email = document.getElementById('quoteEmail').value;
// // const phone = document.getElementById('quotePhone').value;
// // const preferedVehicle = document.getElementById('quoteCar').value;
// // const financingOption = document.getElementById('quoteFinancing').value;
// // const specialRequirements = document.getElementById('quoteComments').value;

// console.log(firstName);
// })


// const modal = document.getElementById('carDetailsModal');

// modal.addEventListener('hidden.bs.modal', function () {

//   const firstName = document.getElementById('quoteFirstName').value;

//   console.log("Modal closed. First Name:", firstName);

// });
 


// const modal = document.getElementById('signupModal');

// modal.addEventListener('hidden.bs.modal', function () {

//    const firstName = document.getElementById('firstName').value;
//    const lastName = document.getElementById('lastName').value;
//     const email = document.getElementById('signupEmail').value;

//   console.log("Signup page abonded");

// //   window.adobeDataLayer.push({
// //     event: "signupAbandad",
// //     user: {
// //         email:email
// //     }
// // });

// });


const testDriveModal = document.getElementById('testDriveModal');

testDriveModal.addEventListener('hidden.bs.modal', function () {
    console.log("Test Drive Submitted:",testDriveFormSubmitted);

    if (!testDriveFormSubmitted)
    {
    const firstName = document.getElementById('testDriveFirstName').value;
    const lastName = document.getElementById('testDriveLastName').value;
    const email = document.getElementById('testDriveEmail').value;
    const phone = document.getElementById('testDrivePhone').value;
    const preferredVehicle = document.getElementById('testDriveCar').value;
    //const preferredDate = document.getElementById('testDriveDate').value;
    //const preferredTime = document.getElementById('testDriveTime').value;
    //const specialRequirements = document.getElementById('testDriveRequirements').value;
  console.log("Test Drive Abandoned");

  window.adobeDataLayer.push({
    event: "Test Drive Abandoned",
    Details: {
        preferredVehicle:preferredVehicle
    },
    user: {
        email:email,
        firstName: firstName,
        lastName:lastName,
        phone:phone
    },
    car: cars[preferredVehicle - 1]
});
    }

});
 

const quoteModal = document.getElementById('quoteModal');

quoteModal.addEventListener('hidden.bs.modal', function () {

    console.log("Get Qoute Form Submitted:",getQuoteFormSubmitted);

    if(!getQuoteFormSubmitted){

    const firstName = document.getElementById('quoteFirstName').value;
    const lastName = document.getElementById('quoteLastName').value;
    const email = document.getElementById('quoteEmail').value;
    const phone = document.getElementById('quotePhone').value;
    const preferredVehicle = document.getElementById('quoteCar').value;
    const financingOption = document.getElementById('quoteFinancing').value;
    const specialRequirements = document.getElementById('quoteComments').value;

  console.log("Request Quotation Abandoned");

  window.adobeDataLayer.push({
    event: "Request Quotation Abandoned",
    Details: {
        preferredVehicle:preferredVehicle
    },  
    user: {
        email:email,
        firstName: firstName,
        lastName:lastName,
        phone:phone
    },
    car: cars[preferredVehicle - 1]
});
    }
});








