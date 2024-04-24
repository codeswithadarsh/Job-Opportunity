document.addEventListener('DOMContentLoaded', function() {
    fetchJobs(); // Initial fetch for default listings or you can omit this to start blank
});

const defaultJobs = [
    {
        title: "Software Engineer",
        location: {
            area: ["Remote", "Anywhere"]
        },
        contract_time: "full-time",
        salary_min: 70000,
        salary_max: 120000,
        redirect_url: "https://www.example.com/job-link"
    },
    {
        title: "Content Writer",
        location: {
            area: ["Remote", "Anywhere"]
        },
        contract_time: "part-time",
        salary_min: 35000,
        salary_max: 50000,
        redirect_url: "https://www.example.com/job-link"
    },
    {
        title: "Associate Manager",
        location: {
            area: ["Remote", "Anywhere"]
        },
        contract_time: "part-time",
        salary_min: 5000,
        salary_max: 50000,
        redirect_url: "https://www.example.com/job-link"
    },
    {
        title: "Business Manager",
        location: {
            area: ["Remote", "Anywhere"]
        },
        contract_time: "part-time",
        salary_min: 15000,
        salary_max: 50000,
        redirect_url: "https://www.example.com/job-link"
    },
    {
        title: "Software Manager",
        location: {
            area: ["Remote", "Anywhere"]
        },
        contract_time: "part-time",
        salary_min: 58000,
        salary_max: 500000,
        redirect_url: "https://www.example.com/job-link"
    },
    {
        title: "BDO Manager",
        location: {
            area: ["Remote", "Anywhere"]
        },
        contract_time: "part-time",
        salary_min: 35000,
        salary_max: 850000,
        redirect_url: "https://www.example.com/job-link"
    },
    {
        title: "Content Manager",
        location: {
            area: ["Remote", "Anywhere"]
        },
        contract_time: "part-time",
        salary_min: 2000,
        salary_max: 50000,
        redirect_url: "https://www.example.com/job-link"
    },
    {
        title: "Business Manager",
        location: {
            area: ["Remote", "Anywhere"]
        },
        contract_time: "part-time",
        salary_min: 5000,
        salary_max: 50000,
        redirect_url: "https://www.example.com/job-link"
    },
    {
        title: "Business Manager",
        location: {
            area: ["Remote", "Anywhere"]
        },
        contract_time: "part-time",
        salary_min: 5000,
        salary_max: 50000,
        redirect_url: "https://www.example.com/job-link"
    }
];


async function fetchJobs() {
    let category = document.getElementById('searchCategory').value;
    let location = document.getElementById('searchLocation').value;

    // Correcting API endpoints based on location
    let countryCode = 'gb'; // Default to UK
    if (location === "India") {
        countryCode = 'in';
    } else if (location === "London") {
        countryCode = 'gb'; // Ensuring it's set correctly for London, UK
        location = "London"; // Ensuring the city name is correctly passed if necessary
    } else if (location === "US") {
        countryCode = 'us'; // Country code for the USA
        location = "New York"; // Example: Use a specific city if required
    }

    const apiEndpoint = `https://api.adzuna.com/v1/api/jobs/${countryCode}/search/1?app_id=1d32f602&app_key=e384be1f26386f184398a6824715961d&what=${encodeURIComponent(category)}&where=${encodeURIComponent(location)}`;

    try {
        console.log("Requesting URL:", apiEndpoint); // Debugging output
        const response = await fetch(apiEndpoint);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        displayJobs(data.results);
    } catch (error) {
        console.error('Error fetching jobs:', error);
        document.getElementById('jobListings').innerHTML = '<p>No jobs found. Please try different filters.</p>';
    }
}


function displayJobs(jobs) {
    const listingsElement = document.getElementById('jobListings');
    listingsElement.innerHTML = ''; // Clear existing listings

    if (jobs.length === 0) {
        console.log("No jobs found, displaying default jobs.");
        jobs = defaultJobs; // Assign default jobs if no jobs are found
    }

    jobs.forEach(job => {
        const jobElement = document.createElement('div');
        jobElement.className = 'job-item p-4 mb-4';
        jobElement.innerHTML = `
            <div class="row g-4">
                <div class="col-sm-12 col-md-8 d-flex align-items-center">
                    <div class="text-start ps-4">
                        <h5 class="mb-3">${job.title}</h5>
                        <span class="text-truncate me-3"><i class="fa fa-map-marker-alt text-primary me-2"></i>${job.location.area.join(', ')}</span>
                        <span class="text-truncate me-3"><i class="far fa-clock text-primary me-2"></i>${job.contract_time || 'Unknown'}</span>
                        <span class="text-truncate me-0"><i class="far fa-money-bill-alt text-primary me-2"></i>${job.salary_min ? `£${job.salary_min} - £${job.salary_max}` : 'Salary negotiable'}</span>
                    </div>
                </div>
                <div class="col-sm-12 col-md-4 d-flex flex-column align-items-start align-items-md-end justify-content-center">
                    <div class="d-flex mb-3">
                        <a class="btn btn-light btn-square me-3" href="#"><i class="far fa-heart text-primary"></i></a>
                        <a class="btn btn-primary" href="${job.redirect_url}" target="_blank">Apply Now</a>
                    </div>
                </div>
            </div>
        `;
        listingsElement.appendChild(jobElement);
    });
}
