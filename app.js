function flashCopied(btn, label) {
  const original = btn.textContent;
  btn.textContent = "Copied!";
  btn.classList.add("copied");
  setTimeout(() => {
    btn.textContent = label || original;
    btn.classList.remove("copied");
  }, 1500);
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    const area = document.createElement("textarea");
    area.value = text;
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.focus();
    area.select();
    document.execCommand("copy");
    document.body.removeChild(area);
    return true;
  }
}

document.querySelectorAll(".copy-btn").forEach((btn) => {
  btn.addEventListener("click", async () => {
    const field = btn.closest(".field-row").querySelector(".value");
    await copyText(field.dataset.copy);
    flashCopied(btn, "Copy");
  });
});

const copyAllBtn = document.getElementById("copyAllBtn");
if (copyAllBtn) {
  copyAllBtn.addEventListener("click", async () => {
    const lines = [];
    document.querySelectorAll(".bank-field").forEach((field) => {
      const label = field.querySelector("label").textContent;
      const value = field.querySelector(".value").dataset.copy;
      lines.push(`${label}: ${value}`);
    });
    await copyText(lines.join("\n"));
    flashCopied(copyAllBtn, "📋 Copy All Details");
  });
}
