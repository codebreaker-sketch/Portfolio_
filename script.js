// document.addEventListener("DOMContentLoaded", () => {
//     console.log("Portfolio page loaded successfully!");
  
//     // Smooth scrolling for navigation links
//     document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//       anchor.addEventListener("click", function (event) {
//         event.preventDefault();
//         const targetId = this.getAttribute("href").substring(1);
//         const targetElement = document.getElementById(targetId);
//         if (targetElement) {
//           window.scrollTo({
//             top: targetElement.offsetTop,
//             behavior: "smooth"
//           });
//         }
//       });
//     });
  
//     // Contact button alert
//     const contactButton = document.querySelector("nav button");
//     if (contactButton) {
//       contactButton.addEventListener("click", () => {
//         alert("Redirecting to contact section...");
//       });
//     }
  
//     // Hover effects on project cards
//     document.querySelectorAll(".projects ul li").forEach(project => {
//       project.addEventListener("mouseenter", () => {
//         project.style.transform = "scale(1.05)";
//         project.style.transition = "0.3s ease-in-out";
//       });
//       project.addEventListener("mouseleave", () => {
//         project.style.transform = "scale(1)";
//       });
//     });
//   });
  

document.addEventListener("DOMContentLoaded", () => {
    console.log("Portfolio page loaded successfully!");

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (event) {
            event.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: "smooth"
                });
            }
        });
    });

    // Contact button alert
    const contactButton = document.querySelector("nav button");
    if (contactButton) {
        contactButton.addEventListener("click", () => {
            alert("Redirecting to contact section...");
        });
    }

    // Hover effects on project cards (Glowing Effect)
    document.querySelectorAll(".projects ul li").forEach(project => {
        project.addEventListener("mouseenter", () => {
            project.style.transform = "scale(1.05)";
            project.style.boxShadow = "0px 0px 20px rgba(26, 83, 255, 0.8)";
            project.style.transition = "0.3s ease-in-out";
        });
        project.addEventListener("mouseleave", () => {
            project.style.transform = "scale(1)";
            project.style.boxShadow = "none";
        });
    });

    // Typing Effect for Hero Text
    const text = "Hey, I'm Abdul Wasay 👋";
    let i = 0;
    function typeEffect() {
        if (i < text.length) {
            document.querySelector(".hero h1").textContent += text[i];
            i++;
            setTimeout(typeEffect, 100); // Adjust typing speed
        }
    }
    document.querySelector(".hero h1").textContent = ""; // Clear initial text
    typeEffect();

    // Floating Text Effect
    const floatingText = document.createElement("div");
    floatingText.textContent = "🚀 Innovate | Code | Create | Explore 🌟";
    floatingText.style.position = "fixed";
    floatingText.style.bottom = "20px";
    floatingText.style.left = "50%";
    floatingText.style.transform = "translateX(-50%)";
    floatingText.style.fontSize = "1.2rem";
    floatingText.style.opacity = "0.8";
    floatingText.style.animation = "floatText 5s infinite ease-in-out";
    document.body.appendChild(floatingText);

    // Floating Particles Effect
    function createParticle() {
        const particle = document.createElement("div");
        particle.classList.add("particle");
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.animationDuration = `${Math.random() * 3 + 2}s`; // Random float speed
        document.body.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 5000);
    }

    setInterval(createParticle, 500); // Generate floating particles every 500ms
});
