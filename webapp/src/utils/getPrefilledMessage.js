
export default function getPrefilledMessage(bookingDetails) {

    // create defaultDetails dictionary filled with XXX for each variable in the template below

    const defaultDetails = {
        message: "",
        date: "XXX",
        departingFrom: "XXX",
        arrivingAt: "XXX",
        passengerCount: "1",
        specialRequests: "XXX"
    }
    bookingDetails = {...defaultDetails, ...bookingDetails}

return `Hi JetSail Team, ${bookingDetails.message}

I'd like to enquire about chartering a luxury jet. Here are the details:

Date: ${bookingDetails.date}

Departing from: ${bookingDetails.departingFrom}

Arriving at: ${bookingDetails.arrivingAt}

Number of Passengers: ${bookingDetails.passengerCount}

Special Requests/Requirements: ${bookingDetails.specialRequests}
`
}