const form = document.getElementById("appointmentForm");

if (form) {
    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const status = document.getElementById("status");

        const appointment = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            date: document.getElementById("date").value,
            time: document.getElementById("time").value,
            reason: document.getElementById("reason").value
        };

        status.style.color = "#0a84ff";
        status.textContent = "Sending appointment...";

        try {

            const response = await fetch("/api/appointment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(appointment)
            });

            const result = await response.json();

            if (response.ok) {
                status.style.color = "green";
                status.textContent = "✅ Appointment sent successfully!";

                form.reset();
            } else {
                status.style.color = "red";
                status.textContent = result.error || "Something went wrong.";
            }

        } catch (err) {
            status.style.color = "red";
            status.textContent = "Server unavailable.";
        }

    });
}