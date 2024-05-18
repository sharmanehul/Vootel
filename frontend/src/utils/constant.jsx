export function CaptalizeFirstLetter(string){
    return string?.charAt(0).toUpperCase() + string?.slice(1);
}

export function extractTime(dateString) {
	const date = new Date(dateString);
	const hours = padZero(date.getHours());
	const minutes = padZero(date.getMinutes());
	return `${hours}:${minutes}`;
}

export function getUser(userId,allUsers){
	const user = allUsers.find(user => user._id === userId);
	return user ? user : null;
}

// Helper function to pad single-digit numbers with a leading zero
function padZero(number) {
	return number.toString().padStart(2, "0");
}


// export const BASEURL = 'http://localhost:3000'
export const BASEURL = 'https://budping.onrender.com'