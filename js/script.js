const form = document.getElementById("feedbackForm");
const successMessage = document.getElementById("successMessage");
const downloadBtn = document.getElementById("downloadBtn");
const resetBtn = document.getElementById("resetBtn");
form.addEventListener("submit", function (event) {
  if (!form.checkValidity()) {
    event.preventDefault();
    event.stopPropagation();
  } else {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    console.log(data);

    // ✅ إرسال البيانات لـ Google Sheets
    fetch(
      "https://script.google.com/macros/s/AKfycbzR0_rzHbjt9qgsARw_ONXSfCv60fewnKkksxXFtMjkKfzETemFIqo8CJ8uYvGbASnM/exec",
      {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then(() => console.log("تم إرسال البيانات بنجاح"))
      .catch((err) => console.error("حصل خطأ:", err));

    // ✅ إظهار رسالة النجاح زي ما عندك
    form.classList.add("d-none");
    successMessage.classList.remove("d-none");

    downloadBtn.onclick = () => {
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "feedback.json";
      a.click();
      URL.revokeObjectURL(url);
    };

    resetBtn.onclick = () => {
      successMessage.classList.add("d-none");
      form.reset();
      form.classList.remove("d-none");
    };
  }
  form.classList.add("was-validated");
});
