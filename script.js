fetch('data.json')
  .then(res => res.json())
  .then(data => {

    const dropdown = document.getElementById("variant");
    const variants = data.Sheet1.filter(item => item && item.Variants); // ✅ FILTER

    variants.forEach((item, index) => {
      const option = document.createElement("option");
      option.value = index;
      option.text = item.Variants; // ✅ SHOW REAL NAME
      dropdown.add(option);
    });

    dropdown.addEventListener("change", function () {
      const output = document.getElementById("result");

      if (this.value === "") {
        output.innerHTML = "";
        return;
      }

      const selected = variants[this.value];

      let html = `<h3>${selected.Variants}</h3><ul>`;

      for (let key in selected) {
        if (key !== "Variants") {
          html += `<li>${key}: ₹${selected[key]}</li>`;
        }
      }

      html += "</ul>";
      output.innerHTML = html;
    });

  })
  .catch(error => {
    console.error("Error loading JSON:", error);
  });