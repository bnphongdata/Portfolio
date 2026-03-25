document.addEventListener("DOMContentLoaded", () => {
  // Khởi tạo AOS animation
  AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
  });

  // Contact Form Logic với EmailJS
  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      // Hiệu ứng loading trên nút gửi
      const btn = form.querySelector("button");
      const originalBtnText = btn.textContent;
      btn.textContent = "Sending...";
      btn.disabled = true;

      // Gửi email qua EmailJS
      emailjs
        .sendForm("service_ai67tqg", "template_gw6doia", form)
        .then(
          () => {
            alert(
              "✅ Cảm ơn bạn! Tin nhắn đã được gửi thành công. Mình sẽ phản hồi sớm nhất có thể!",
            );
            form.reset();
          },
          (error) => {
            console.error("EmailJS Error:", error);
            alert(
              "❌ Có lỗi xảy ra khi gửi tin nhắn. Bạn vui lòng liên hệ trực tiếp qua Email hoặc LinkedIn nhé!",
            );
          },
        )
        .finally(() => {
          btn.textContent = originalBtnText;
          btn.disabled = false;
        });
    });
  }

  const nameElement = document.getElementById("typewriter-name");
  if (!nameElement) return; // bảo vệ nếu không tìm thấy element

  const texts = [
    "NHAT PHONG",
    "DATA ANALYST",
    "Data Scientist",
    "Data Engineer",
    "Machine Learning Engineer ",
  ];
  let textIndex = 0;
  let isDeleting = false;
  let charIndex = 0;

  function typeAdvanced() {
    const currentFull = texts[textIndex];

    if (isDeleting) {
      // Xóa chữ
      nameElement.textContent = currentFull.substring(0, charIndex - 1);
      charIndex--;
    } else {
      // Gõ chữ
      nameElement.textContent = currentFull.substring(0, charIndex + 1);
      charIndex++;
    }

    let speed = isDeleting ? 60 : 120; // xóa nhanh hơn gõ

    if (!isDeleting && charIndex === currentFull.length) {
      isDeleting = true;
      speed = 5000; // pause 5 giây trước khi xóa
    } else if (isDeleting && charIndex === 0) {
      // Xóa xong → chuyển sang text tiếp theo
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      speed = 500;
    }

    setTimeout(typeAdvanced, speed);
  }

  // Bắt đầu hiệu ứng sau khi trang load xong một chút
  setTimeout(() => {
    typeAdvanced();
  }, 800);

  window.addEventListener("load", () => {
    setTimeout(() => {
      const loader = document.getElementById("loading-screen");
      const main = document.getElementById("main-content");

      loader.classList.add("fade-out");

      setTimeout(() => {
        loader.style.display = "none";
        main.classList.remove("hidden");

        // Khởi động AOS sau khi load xong
        AOS.init({
          duration: 800,
          once: true,
        });
      }, 200);
    }, 2000);
  });
  lucide.createIcons();
});
