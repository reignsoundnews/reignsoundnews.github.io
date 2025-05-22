// ARTICLE DETAILS TOGGLE SCRIPT
      
    function toggleDetails(el) {
        el.classList.toggle("open");
    }


// ARTICLE LOADER SCRIPT
          
    const articles = [

    { id: "article-slot-1", file: "news/articles/2022-11-16/ataah-king-wrongful-arrest/index.html" },
    
    { id: "article-slot-3", file: "news/articles/2024-10-25-NY-weekly/index.html" },
    
    { id: "article-slot-2", file: "news/articles/2024-10-03-TBWST/index.html" }

    ];


    articles.forEach(article => {

        fetch(article.file)

        .then(res => res.text())

        .then(html => {

            // Create a temporary container

            const temp = document.createElement("div");

            temp.innerHTML = html;

            console.log("🔎 Checking for dark-mode-toggle in:", article.file);

            
            // Try to find and remove dark-mode-toggle

            const toggle = temp.querySelector(".dark-mode-toggle");

            if (toggle) {

            toggle.remove();

            console.log("✅ Removed dark-mode-toggle");

            } else {
            console.warn("⚠️ .dark-mode-toggle not found");
            }


            // Remove entire <footer> if found

            const footer = temp.querySelector("footer");

            if (footer) {

            footer.remove();

            console.log("✅ Removed footer");

            } else {
            console.warn("⚠️ Footer not found");
            }
            

            // Insert cleaned HTML

            document.getElementById(article.id).innerHTML = temp.innerHTML;

        })

        .catch(err => {
            console.error("❌ Error loading article", article.file, err);
        });
        
    });


// ARTICLE LAST MODIFIED / PUBLISHED DATE SCRIPTS
        
    document.addEventListener("DOMContentLoaded", function() {
        
        // Defining options for date formatting
        const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };

        /* 
        DOCUMENT'S LAST MODIFIED DATE:
            — Getting the HTML document's last modified date
            — Formatting the HTML document's last modified date
        */
        const documentLastModifiedDate = new Date(document.lastModified);
        const formattedDocumentDate = documentLastModifiedDate.toLocaleDateString('en-US', options);

        // Getting all the <article> elements
        const articles = document.querySelectorAll("article");

        // Looping through each article
        articles.forEach(
        
        (article) => {

            // Getting the published date
            let publishedDateString = article.getAttribute("data-published-date");

            // Using the document's last modified date if publishedDateString is not set
            if (!publishedDateString) {

            publishedDateString = documentLastModifiedDate;
            
            }

            /*
            ARTICLE PUBLISHED DATE:
                — Setting the article's published date
                — Formatting the article's published date
            */
            const publishedDate = new Date(publishedDateString);
            const publishedDateFormatted = publishedDate.toLocaleDateString('en-US', options);

            /*
            INSERTING PUBLISHED DATE:
                — Gathering/selecting published-date elements
                — Inserting published date text into published-date elements
            */
            const publishedDateElements = article.querySelectorAll(".published-date");

            // Looping through each published-date element
            publishedDateElements.forEach(
            
            (element) => {

                // Setting the text content for each element to the formatted published date
                element.textContent = publishedDateFormatted;

            }
            
            );

            /*
            ARTICLE'S LAST MODIFIED DATE:
                — Getting the article's last modified date
                — Setting the document's last modified date as default
                — Setting the article's last modified date
                — Formatting the article's last modified date
            */
            let lastModifiedDateString = article.getAttribute("data-last-modified");

            // Using the document's last modified date if lastModifiedDateString is not set
            if (!lastModifiedDateString) {

            lastModifiedDateString = documentLastModifiedDate;
            
            }

            // Setting the article's last modified date
            const lastModifiedDate = new Date(lastModifiedDateString);

            // Formatting the article's last modified date
            const lastModifiedDateFormatted = lastModifiedDate.toLocaleDateString('en-US', options);

            /*
            INSERTING ARTICLE'S LAST MODIFIED DATE
                — Gathering/selecting all updated-date elements within the article element
                — Inserting updated date text into published-date elements
            */
            const updatedDateElements = article.querySelectorAll(".updated-date");

            // Looping through each updated-date element
            updatedDateElements.forEach(
            
            (element) => {

                // Setting the text content for each element to the formatted published date
                element.textContent = "Updated " + lastModifiedDateFormatted;

            }
            
            );

        }
        
        );

    });


// CLOCK SCRIPT

function updateClock() {
  const now = new Date();

  // Get time string without seconds, 24-hour format (hour12: false)
  const timeString = now.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  // Get AM/PM separately (using 12-hour format)
  const ampm = now.toLocaleTimeString(undefined, {
    hour: '2-digit',
    hour12: true,
  }).split(' ')[1];

  // Get abbreviated timezone name (e.g., EDT)
  const timeZoneAbbr = now.toLocaleTimeString(undefined, {
    timeZoneName: 'short',
  }).split(' ').pop();

  document.getElementById("clock-time").textContent = timeString;
  document.getElementById("clock-ampm").textContent = ampm;

  // Create stacked timezone (E on top of D on top of T)
  document.getElementById("clock-zone").textContent = timeZoneAbbr;

}

updateClock();
setInterval(updateClock, 1000);



// COPYRIGHT CURRENT YEAR SCRIPT

  // Set the current year for copyright

    document.getElementById('current-year').textContent = new Date().getFullYear();
        

// DARK MODE TOGGLE SCRIPT

    const toggleBtn = document.getElementById('theme-toggle');
    let theme = localStorage.getItem('theme');

    if (!theme) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    theme = prefersDark ? 'dark' : 'light';
    }

    if (theme === 'dark') {
    document.body.classList.add('dark-mode');
    toggleBtn.textContent = '🌓 Toggle Light Mode';
    } else {
    toggleBtn.textContent = '🌓 Toggle Dark Mode';
    }

    toggleBtn.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    toggleBtn.textContent = isDark ? '🌓 Toggle Light Mode' : '🌓 Toggle Dark Mode';
    });


// NEWS BANNER LOAD SCRIPT

    function loadTemplate(templateId, selector) {

        const template = document.getElementById(templateId);

        document.querySelectorAll(selector).forEach(slot => {slot.appendChild(template.content.cloneNode(true));

        });

    }

    loadTemplate("news-banner-template", ".news-banner-slot");

    loadTemplate("news-banner-ALT-template", ".news-banner-slot-2");


// NEWS BANNER SCROLL SCRIPT

    const breakingTrack = document.querySelector('.breaking-track');

    // Clone the content once on load
    const originalContent = breakingTrack.innerHTML;
    breakingTrack.innerHTML += originalContent; // Duplicate the content for continuous loop

    // Function to handle the page scroll effect (parallax effect)
    window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    document.querySelectorAll('.breaking-track').forEach(track => {
        // Adjust the multiplier to control how fast each banner scrolls
        track.style.transform = `translateX(-${scrollY * 0.2}px)`;
    });
    });

    // Infinite scroll logic
    const contentWidth = breakingTrack.scrollWidth;

    // Loop content logic
    function loopContent() {
    if (breakingTrack.scrollLeft >= contentWidth) {
        breakingTrack.scrollLeft = 0; // Reset scroll position once content has been fully scrolled
    }
    }

    // Start the loop effect
    let isInView = false;

    // Using IntersectionObserver to start the scroll when the banner is in view
    const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
        isInView = true;
        } else {
        isInView = false;
        }
    });
    }, { threshold: 0.1 }); // Trigger when 10% of the element is in view

    // Observe the breaking-track element
    observer.observe(breakingTrack);

    // Start the loop only when the banner is in view
    setInterval(() => {
    if (isInView) {
        loopContent(); // Only loop if the banner is visible
    }
    }, 10); // Check every 10ms to reset scroll

    // Optional: Adjust the scroll speed when manually dragging
    breakingTrack.addEventListener("scroll", () => {
    const currentScroll = breakingTrack.scrollLeft;

    // Prevent going beyond content limits
    if (currentScroll < contentWidth) {
        breakingTrack.scrollLeft += 1;  // Adjust speed of loop
    }
    });


// SAVE BUTTON SCRIPT

    document.getElementById("save-button").addEventListener("click", () => {
    const element = document.body; // or change this to a specific section like document.getElementById("article-content")

    const opt = {
        margin:       0.5,
        filename:     'article.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
    });


// SHARE BUTTON SCRIPT -->

    const shareBtn = document.getElementById('share-button');

    shareBtn.addEventListener('click', () => {
    if (navigator.share) {
        navigator.share({
        title: document.title,
        text: 'Check out this site!',
        url: window.location.href,
        })
        .then(() => console.log('Shared successfully'))
        .catch((err) => console.error('Error sharing:', err));
    } else {
        alert('Sharing not supported on this device/browser.');
    }
    });