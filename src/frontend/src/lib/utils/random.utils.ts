export const generateRandomId = () => {
	const currentDate = new Date();
	const timestamp = currentDate.getTime();
	const randomNum = Math.floor(Math.random() * 1000);
	return `${randomNum}-${timestamp}`;
};
