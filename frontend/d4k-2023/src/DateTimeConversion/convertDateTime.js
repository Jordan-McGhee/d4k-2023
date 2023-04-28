const convertDate = (date) => {

    const newDate = new Date(date)

    // grabs month and day from split array
    const dateStringSplit = newDate.toDateString().split(" ")

    const dateString = dateStringSplit[1] + " " + dateStringSplit[2]

    const militaryTime = newDate.toTimeString()

    const toRegularTime = (givenTime) => {
        let [ hours, minutes, seconds ] = givenTime.split(":")
        let amTime = true

        if (hours === 0) {
            hours = 12
        } else if (hours > 12) {
            hours = hours - 12
            amTime = false
        }

        return (`${hours}:${minutes} ${amTime ? 'AM' : 'PM'}`)
    }

    return (`${toRegularTime(militaryTime)} - ${dateString}`)
}

export default convertDate