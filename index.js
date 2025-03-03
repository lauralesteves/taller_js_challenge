// License Key Formatting
//
// Given a string S that consists of only alphanumeric characters and dashes.
// The string is separated into N + 1 groups by N dashes.
// Also given an integer K.
// We want to reformat the string S, such that each group contains exactly K characters,
// except for the first group, which could be shorter than K but still must contain at least one character.
// Furthermore, a dash must be inserted between two groups, and you should convert all lowercase letters to
// uppercase.

// Input: S = “5F3Z-2e-9-w”, K = 4
// Output: “5F3Z-2E9W”
// Explanation: The string S has been split into two parts, each part has 4 characters.
// Note that two extra dashes are not needed and can be removed.
//
// Input: S = “2-5g-3-J”, K = 2
// Output: “2-5G-3J”
//
// Explanation: The string s has been split into three parts,
// each part has 2 characters except the first part, as it could be shorter as mentioned above

function licenseKeyFormatting1(license, groupSize) {
    const splitByDash = license.split('-')
    let result = [splitByDash[0]]

    let current = ''
    for (let i = 1; i < splitByDash.length; i++) {
        let piece = (current ? current + splitByDash[i] : splitByDash[i]).toUpperCase()

        if (piece.length !== groupSize) {
            if (piece.length < groupSize) {
                current = piece
            } else {
                result = result.concat(piece.substring(0, groupSize))
                let leftover = piece.substring(groupSize)

                while (leftover.length > groupSize) {
                    result = result.concat(piece.substring(0, groupSize))
                    leftover = piece.substring(groupSize)
                }

                current = leftover
            }
        } else {
            result = result.concat(piece)
        }
    }

    return result.join('-')
}

function licenseKeyFormatting2(license, groupSize) {
    const cleaned = license.replace(/-/g, '').toUpperCase()
    const firstGroupLength = cleaned.length % groupSize || groupSize

    const regex = new RegExp(`.{1,${groupSize}}`, 'g')

    return cleaned.slice(0, firstGroupLength) +
        (cleaned.length > firstGroupLength ? '-' : '') +
        cleaned.slice(firstGroupLength).match(regex)?.join('-') || ''
}

console.log(`Example 1: "5F3Z-2e-9-w" | Expected: "5F3Z-2E9W" | Result: ${licenseKeyFormatting1("5F3Z-2e-9-w", 4)}`)
console.log(`Example 2: "2-5g-3-J" | Expected: "2-5G-3J" | Result: ${licenseKeyFormatting1("2-5g-3-J", 2)}`)

console.log(`Example 1: "5F3Z-2e-9-w" | Expected: "5F3Z-2E9W" | Result: ${licenseKeyFormatting2("5F3Z-2e-9-w", 4)}`)
console.log(`Example 2: "2-5g-3-J" | Expected: "2-5G-3J" | Result: ${licenseKeyFormatting2("2-5g-3-J", 2)}`)