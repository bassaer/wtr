import { wtr } from "../src/wtr";

describe("wtr", (): void => {
    test('should return wtr!', (): void => {
        expect(wtr()).toBe("wtr!");
    });
});