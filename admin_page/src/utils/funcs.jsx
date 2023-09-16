export function currencyVN(
    value,
    locales = "vi",
    options = {
        style: "currency",
        currency: "VND",
    }
) {
    return value.toLocaleString(locales, options);
}

export function priceSaleVN(price, sale) {
    const thousand = 1000;
    if (sale) {
        return price - Math.round((price * sale) / thousand) * thousand;
    } else return price;
}

function padTo2Digits(num) {
    return num.toString().padStart(2, "0");
}

// '14/05/2023 15:26:22'
export function formatStringDate(string = "") {
    const array = string.split(" ");
    let arrayDate = array[0].split("/");
    [arrayDate[0], arrayDate[1]] = [arrayDate[1], arrayDate[0]];
    return [arrayDate.join("/"), array[1]].join(" ");
}

export function formatDate(date = new Date(), split = "-") {
    return [padTo2Digits(date.getDate()), padTo2Digits(date.getMonth() + 1), date.getFullYear()].join(split);
}

export function toArray(number = 1, callback = (_, index) => index + 1) {
    if (typeof number !== "number" || number < 1) {
        // throw new Error('Invalid input. Please provide a positive number.');
        return [];
    }

    return Array.from({ length: number }, callback);
}

export function getPageArray({ total = 7, length = 5, current = 3, step = 1 }) {
    const first = 1;
    const halfRange = Math.floor(length / 2);
    let start = current - halfRange;

    if (start < first) start = first;
    if (current + halfRange > total) start = total - length + step;

    return Array.from({ length }, (_, index) => start + index * step);
}

export function averageRating(totalStar, totalMember) {
    if (totalMember) {
        const shiftOne = (totalStar / totalMember) * 10;
        return Math.round(shiftOne) / 10;
    }
    return 0;
}

export const createObjectParams = (array = [], conditions = []) => {
    const params = {};

    array.forEach((value, key) => {
        if (conditions.some((condition) => key === condition)) return;
        params[key] = value;
    });

    return params;
};

export function createObjectList() {
    return {
        isLoading: false,
        items: [],
        totalPage: 0,
        message: "",
    };
}
