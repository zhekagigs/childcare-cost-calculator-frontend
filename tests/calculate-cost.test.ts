import { CalculateCost, Child } from "../src/api/costAPI";
import { describe } from "node:test";
import 'isomorphic-fetch';


describe('testing calculate cost API', () => {
    test('post dummy data', () => {
        const freya: Child = {
            name: "Freya",
            pricePerDay: 75.5,
            dateOfBirth: new Date(2020, 3, 3),
            daysAttending: [1, 1, 1, 1, 1, 0, 0],
            taxBenefit: false,
            thirtyHoursFree: false,
            schoolYear: 2024
        }
        CalculateCost.get(freya).then((result) => console.log(result))
    })
})
