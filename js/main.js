(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();


    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').css('top', '0px');
        } else {
            $('.sticky-top').css('top', '-100px');
        }
    });


    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";

    $(window).on("load resize", function () {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
                function () {
                    const $this = $(this);
                    $this.addClass(showClass);
                    $this.find($dropdownToggle).attr("aria-expanded", "true");
                    $this.find($dropdownMenu).addClass(showClass);
                },
                function () {
                    const $this = $(this);
                    $this.removeClass(showClass);
                    $this.find($dropdownToggle).attr("aria-expanded", "false");
                    $this.find($dropdownMenu).removeClass(showClass);
                }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });


    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });


    // Header carousel
    $(".header-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        items: 1,
        dots: false,
        loop: true,
        nav: true,
        navText: [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        margin: 24,
        dots: true,
        loop: true,
        nav: false,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            }
        }
    });

})(jQuery);





document.addEventListener("DOMContentLoaded", function () {
    const chatbotToggle = document.getElementById("chatbot-toggle");
    const chatbotContainer = document.getElementById("chatbot-container");
    const closeChat = document.getElementById("close-chat");
    const sendBtn = document.getElementById("send-btn");
    const chatInput = document.getElementById("chat-input");
    const chatMessages = document.getElementById("chat-messages");

    // Initially hide the chatbot
    chatbotContainer.style.display = "none";

    chatbotToggle.addEventListener("click", () => {
        chatbotContainer.style.display = "flex";
        setTimeout(() => appendMessage("Aasha Bot", "Hello! How can I assist you today?", "bot-message"), 500);
    });

    closeChat.addEventListener("click", () => {
        chatbotContainer.style.display = "none";
    });

    sendBtn.addEventListener("click", () => sendMessage());
    chatInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") sendMessage();
    });

    function sendMessage() {
        const userMessage = chatInput.value.trim();
        if (!userMessage) return;

        appendMessage("You", userMessage, "user-message");
        chatInput.value = "";

        setTimeout(() => {
            appendMessage("Aasha Bot", "Typing...", "bot-message", true);
            setTimeout(() => {
                chatMessages.lastChild.remove();
                handleUserQuery(userMessage);
            }, 1200);
        }, 600);
    }

    function appendMessage(sender, message, className, isTemporary = false) {
        const messageElement = document.createElement("div");
        messageElement.classList.add("message", className);
        messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        if (isTemporary) messageElement.classList.add("temporary");

        // Automatically add click event if the message contains a link
        messageElement.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", (event) => {
                event.preventDefault();
                window.location.href = link.href; // Open the link in the same tab
            });
        });
    }

    function correctSpelling(query, responses) {
        let keys = Object.keys(responses);
        let correctedQuery = keys.find(key => query.includes(key) || key.includes(query));
        return correctedQuery || query;
    }

    function handleUserQuery(query) {
        let lowerQuery = query.toLowerCase();
        let botReply = "";

        const responses = {
            "national certification": `Here are our **National Certifications**:<br>🔹 <a href="national.html#national-certifications">View National Certifications</a>`,
            "international certification": `Explore our **International Certifications**:<br>🌍 <a href="national.html#international-certifications">View International Certifications</a>`,
            "all courses": `Check out all our courses:<br>📚 <a href="national.html#all-courses">View Courses</a>`,
            "web development": `Interested in Web Development? Enroll here:<br>💻 <a href="national.html#web-development">Web Dev Course</a>`,
            "data science": `Learn Data Science! Course details here:<br>📊 <a href="national.html#data-science">Data Science Course</a>`,
            "artificial intelligence": `Explore AI & Machine Learning courses:<br>🤖 <a href="national.html#artificial-intelligence">AI Course</a>`,
            "machine learning": `Machine Learning courses are available here:<br>🤖 <a href="national.html#machine-learning">ML Course</a>`,
            "contact": `You can contact us at:<br>📧 Email: <a href="mailto:aadilgouri01@gmail.com">aadilgouri01@gmail.com</a><br>📞 Phone: <a href="tel:+917976659886">+91 7976659886</a>`,
            "location": `Our office is located at:<br>📍 <a href="national.html#location">View Location</a>`,
            "team": `Meet our expert instructors!<br>👨‍🏫 <a href="national.html#team">Our Team</a>`,
            "live classes": `Join our interactive live classes with expert instructors.<br>🎥 <a href="national.html#live-classes">Live Classes</a>`,
            "career guidance": `We provide career guidance to help you choose the right path.<br>🎯 <a href="national.html#career-guidance">Career Guidance</a>`,
            "cybersecurity courses": `Learn about ethical hacking and cybersecurity.<br>🔒 <a href="national.html#cybersecurity">Cybersecurity Courses</a>`,
            "full stack development": `Become a full-stack developer.<br>🌐 <a href="national.html#full-stack">Full Stack Dev Course</a>`,
            "python programming": `Our Python course covers basic to advanced topics.<br>🐍 <a href="national.html#python">Python Course</a>`,
            "java development": `Our Java course includes hands-on projects.<br>☕ <a href="national.html#java">Java Course</a>`,
            "cloud computing": `Learn AWS, Azure, and Google Cloud.<br>☁️ <a href="national.html#cloud">Cloud Computing</a>`,
            "blockchain technology": `Learn about smart contracts and decentralized applications.<br>🔗 <a href="national.html#blockchain">Blockchain Course</a>`,
            "data analytics": `Master data analytics with real datasets.<br>📊 <a href="national.html#data-analytics">Data Analytics</a>`,
            "mathematics for ai": `Learn the math needed for AI.<br>➗ <a href="national.html#math-for-ai">Math for AI</a>`,
            "business analytics": `Learn statistical modeling and data visualization.<br>📈 <a href="national.html#business-analytics">Business Analytics</a>`,
            "game development": `Learn Unity and Unreal Engine.<br>🎮 <a href="national.html#game-development">Game Development</a>`,
            "robotics": `Learn about automation and AI integration.<br>🤖 <a href="national.html#robotics">Robotics Course</a>`,
            "ui ux design": `Focus on user-centered design and prototyping.<br>🎨 <a href="national.html#ui-ux">UI/UX Course</a>`,
            "software engineering": `Learn software development methodologies.<br>🖥️ <a href="national.html#software-engineering">Software Engineering</a>`,
            "database management": `Master MySQL, PostgreSQL, and MongoDB.<br>🗄️ <a href="national.html#database-management">Database Management</a>`,
            "hello": "Hello! How can I assist you today? 😊",
            "hi": "Hi there! What can I do for you?",
            "hey": "Hey! How can I help you today?",
            "good morning": "Good morning! Hope you have a great day! ☀️",
            "good evening": "Good evening! How can I assist you? 🌙"
        };

        let correctedQuery = correctSpelling(lowerQuery, responses);
        botReply = responses[correctedQuery] || "I'm here to help! Ask about **courses, certifications, or contact details.**";
        
        setTimeout(() => appendMessage("Aasha Bot", botReply, "bot-message"), 1000);
    }
});
