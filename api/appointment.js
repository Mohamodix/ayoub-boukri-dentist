export default async function handler(req, res) {

    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Method not allowed."
        });
    }

    const {
        name,
        email,
        phone,
        date,
        time,
        reason
    } = req.body;

    if (
        !name ||
        !email ||
        !phone ||
        !date ||
        !time ||
        !reason
    ) {
        return res.status(400).json({
            error: "Please fill in all fields."
        });
    }

    const webhook = "https://discord.com/api/webhooks/1519874217821077564/V51EJfllLz-X7aM47PvcukkaKC2OTk-l5xoJaGpBH4CSFwTfwr63DmYAQvzHNRb5IJtu";

    if (!webhook) {
        return res.status(500).json({
            error: "Discord webhook not configured."
        });
    }

    const message = {
        embeds: [
            {
                title: "🦷 New Dentist Appointment",
                color: 3447003,
                fields: [
                    {
                        name: "👤 Full Name",
                        value: name,
                        inline: false
                    },
                    {
                        name: "📧 Email",
                        value: email,
                        inline: false
                    },
                    {
                        name: "📱 Phone",
                        value: phone,
                        inline: false
                    },
                    {
                        name: "📅 Date",
                        value: date,
                        inline: true
                    },
                    {
                        name: "🕒 Time",
                        value: time,
                        inline: true
                    },
                    {
                        name: "📝 Reason",
                        value: reason,
                        inline: false
                    }
                ],
                footer: {
                    text: "Ayoub Boukri Dental Clinic"
                },
                timestamp: new Date().toISOString()
            }
        ]
    };

    try {

        const response = await fetch(webhook, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(message)
        });

        if (!response.ok) {
            throw new Error("Discord webhook failed.");
        }

        return res.status(200).json({
            success: true
        });

    } catch (error) {

        return res.status(500).json({
            error: "Failed to send appointment."
        });

    }

}
