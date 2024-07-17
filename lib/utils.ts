interface calculateAge {
    dob_day: string
    dob_month: string
    dob_year: string
}

export function calculateAge({dob_day, dob_month, dob_year}: calculateAge) {
    const day = parseInt(dob_day)
    const month = parseInt(dob_month) - 1
    const year = parseInt(dob_year)

    const birthDate = new Date(year, month, day)
    const today = new Date()

    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDifference = today.getMonth() - birthDate.getMonth()

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--
    }

    return age
  }