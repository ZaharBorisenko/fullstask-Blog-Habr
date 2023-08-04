export const formatDate = (date) => {
    const createdAt = date;
    const createdDate = new Date(createdAt);
    const currentTime = new Date();
    const timeDifferenceInMilliseconds = currentTime - createdDate;

    const millisecondsInMinute = 1000 * 60;
    const millisecondsInHour = millisecondsInMinute * 60;
    const millisecondsInDay = millisecondsInHour * 24;

    const daysDifference = Math.floor(timeDifferenceInMilliseconds / millisecondsInDay);
    const hoursDifference = Math.floor((timeDifferenceInMilliseconds % millisecondsInDay) / millisecondsInHour);
    const minutesDifference = Math.floor((timeDifferenceInMilliseconds % millisecondsInHour) / millisecondsInMinute);

    let timeAgoString = "";

    if (daysDifference > 1) {
        timeAgoString = `${createdDate.getDate()} ${createdDate.toLocaleString('default', { month: 'short' })} в ${createdDate.getHours()}:${createdDate.getMinutes().toString().padStart(2, '0')}`;
    } else {
        if (daysDifference > 0) {
            timeAgoString += `${daysDifference} дней `;
        }
        if (hoursDifference > 0) {
            timeAgoString += `${hoursDifference} часов `;
        }
        if (minutesDifference > 0 || (daysDifference === 0 && hoursDifference === 0)) {
            timeAgoString += `${minutesDifference} минут назад`;
        }
    }

    return timeAgoString
}