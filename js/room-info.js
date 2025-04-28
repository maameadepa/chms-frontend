// Ensure API_URL is defined
if (typeof API_URL === 'undefined') {
    var API_URL = 'http://localhost:5000/api';
}

// Utility: Get roomId from URL
function getRoomIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('roomId');
}

// Fetch and display room info
async function loadRoomInfo() {
    const roomId = getRoomIdFromUrl();
    const detailsContainer = document.getElementById('roomInfoDetails');
    if (!roomId) {
        detailsContainer.innerHTML = '<p>No room selected.</p>';
        return;
    }
    try {
        const res = await fetch(`${API_URL}/rooms/${roomId}`, { credentials: 'include' });
        if (!res.ok) {
            detailsContainer.innerHTML = '<p>Could not load room details.</p>';
            return;
        }
        const room = await res.json();
        detailsContainer.innerHTML = `
            <h3>Room ${room.room_number}</h3>
            <p><strong>Type:</strong> ${room.room_type}</p>
            <p><strong>Price per Semester:</strong> $${room.price_per_semester}</p>
            <p><strong>Description:</strong> ${room.description || '-'}</p>
        `;
    } catch (error) {
        detailsContainer.innerHTML = '<p>Error loading room details.</p>';
        console.error('Error fetching room details:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadRoomInfo);