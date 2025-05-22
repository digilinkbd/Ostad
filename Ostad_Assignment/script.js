// Mobile menu toggle
document.addEventListener("DOMContentLoaded", () => {
  const mobileMenuButton = document.getElementById("mobile-menu-button")
  const mobileMenu = document.getElementById("mobile-menu")
  const menuIcon = document.getElementById("menu-icon")
  const closeIcon = document.getElementById("close-icon")

  if (mobileMenuButton) {
    mobileMenuButton.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden")
      menuIcon.classList.toggle("hidden")
      closeIcon.classList.toggle("hidden")
    })
  }

  // Form validation and localStorage
  const contactForm = document.getElementById("contact-form")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form fields
      const nameInput = document.getElementById("name")
      const emailInput = document.getElementById("email")
      const messageInput = document.getElementById("message")

      // Get error elements
      const nameError = document.getElementById("name-error")
      const emailError = document.getElementById("email-error")
      const messageError = document.getElementById("message-error")

      // Reset errors
      nameError.classList.add("hidden")
      emailError.classList.add("hidden")
      messageError.classList.add("hidden")

      nameInput.classList.remove("border-red-500")
      emailInput.classList.remove("border-red-500")
      messageInput.classList.remove("border-red-500")

      // Validate form
      let isValid = true

      // Name validation
      if (!nameInput.value.trim()) {
        nameError.textContent = "Name is required"
        nameError.classList.remove("hidden")
        nameInput.classList.add("border-red-500")
        isValid = false
      }

      // Email validation
      if (!emailInput.value.trim()) {
        emailError.textContent = "Email is required"
        emailError.classList.remove("hidden")
        emailInput.classList.add("border-red-500")
        isValid = false
      } else if (!/\S+@\S+\.\S+/.test(emailInput.value)) {
        emailError.textContent = "Email is invalid"
        emailError.classList.remove("hidden")
        emailInput.classList.add("border-red-500")
        isValid = false
      }

      // Message validation
      if (!messageInput.value.trim()) {
        messageError.textContent = "Message is required"
        messageError.classList.remove("hidden")
        messageInput.classList.add("border-red-500")
        isValid = false
      }

      // If form is valid, save to localStorage and show success message
      if (isValid) {
        const formData = {
          name: nameInput.value.trim(),
          email: emailInput.value.trim(),
          message: messageInput.value.trim(),
        }

        // Save to localStorage
        localStorage.setItem("contactFormData", JSON.stringify(formData))

        // Show success message
        const successMessage = document.getElementById("success-message")
        const savedDataDisplay = document.getElementById("saved-data-display")

        savedDataDisplay.innerHTML = `
          <p><span class="font-semibold">Name:</span> ${formData.name}</p>
          <p><span class="font-semibold">Email:</span> ${formData.email}</p>
          <p><span class="font-semibold">Message:</span> ${formData.message}</p>
        `

        successMessage.classList.remove("hidden")

        // Reset form
        contactForm.reset()

        // Scroll to success message
        successMessage.scrollIntoView({ behavior: "smooth" })
      }
    })

    // Clear error on input
    const formInputs = contactForm.querySelectorAll("input, textarea")
    formInputs.forEach((input) => {
      input.addEventListener("input", () => {
        const errorElement = document.getElementById(`${input.id}-error`)
        if (errorElement) {
          errorElement.classList.add("hidden")
          input.classList.remove("border-red-500")
        }
      })
    })
  }
})
