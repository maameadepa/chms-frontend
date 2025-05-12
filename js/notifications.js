if (typeof API_URL === 'undefined') {
    const API_URL = 'https://chms-backend-aqow.onrender.com';
}

async function fetchNotifications() {
    const res = await fetch(`${API_URL}/notifications`, { credentials: 'include' });
    if (!res.ok) return [];
    return await res.json();
}

function renderNotifications(notifications) {
    const list = document.getElementById('notificationsList');
    if (!notifications.length) {
        list.innerHTML = '<div class="no-results">No notifications yet.</div>';
        return;
    }
    list.innerHTML = notifications.map(n => `
        <div class="notification-card${n.is_read ? '' : ' unread'}">
            <div class="notification-message">${n.message}</div>
            <div class="notification-meta">
                <span>${new Date(n.created_at).toLocaleString()}</span>
                ${!n.is_read ? '<span class="unread-badge">New</span>' : ''}
            </div>
        </div>
    `).join('');
}

document.addEventListener('DOMContentLoaded', async () => {
    const notifications = await fetchNotifications();
    renderNotifications(notifications);
});
