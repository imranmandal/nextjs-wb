export const sideScroll = (element, speed, distance, step) => {
  let scrollAmount = 0;
  const slideTimer = setInterval(() => {
    element.scrollLeft += step;
    scrollAmount += Math.abs(step);
    if (scrollAmount >= distance) {
      clearInterval(slideTimer);
    }
  }, speed);
};

export const showMore = (
  visibleProfileCount,
  setVisibleSignUp,
  setVisibleProfileCount
) => {
  if (visibleProfileCount === 21) {
    setVisibleSignUp(true);
  }
  setVisibleProfileCount((prevValue) =>
    prevValue < 21 ? prevValue + 7 : prevValue
  );
};

export const handleClose = (setShowSignUp) => {
  setShowSignUp(false);
};

export const replaceUnderScore = (str) => {
  return str.replace(/_/g, " ");
};

// Converting height in INCHES
export const convertedHeight = (heightInInch) => {
  const heightInFeet = Math.floor(heightInInch / 12).toString();
  const heightRemainInches = heightInInch % 12;
  return `${heightInFeet}' ${heightRemainInches}"`;
};

// ------------

// Converting income
String.prototype.allReplace = function (obj) {
  var retStr = this;
  for (var x in obj) {
    retStr = retStr.replace(new RegExp(x, "g"), obj[x]);
  }
  return retStr;
};

export const convertedValue = (valueInString) => {
  if (!valueInString || typeof valueInString === "number") {
    return valueInString;
  }
  // console.log(valueInString);
  const convertedVal = valueInString.allReplace({
    DASH: "-",
    _dash_: " - ",
    openbr_: "(",
    _closebr: ")",
    _dot_: ".",
    slash: "/",
    _TO: " -",
    _or: " /",
    ZERO: "0",
    ONE_: "1 ",
    TWO: "2",
    THREE: "3",
    FOUR: "4",
    SEVENTY_FIVE: "75",
    THIRTY_FIVE: "35",
    FIVE: "5",
    TEN: "10",
    TWENTY: "20",
    THIRTY: "30",
    FIFTY: "50",
    ONE: "1",
    N1: "NONE",
  });

  return replaceUnderScore(convertedVal);
};

export const convertedCapitalizeValue = (str) => {
  const convertedString = convertedValue(str);
  if (convertedString) {
    if (typeof convertedString === "string") {
      var words = convertedString.split(" ");
      var CapitalizedWords = [];
      words.map((element) => {
        CapitalizedWords.push(
          element[0].toUpperCase() +
            element.slice(1, element.length).toLowerCase()
        );
      });
      return CapitalizedWords.join(" ");
    }
  }
  return str;
};

export const getMonthAndDate = (date) => {
  const dd = (date.getDate() < 10 ? "0" : "") + date.getDate();
  const MM = (date.getMonth() + 1 < 10 ? "0" : "") + (date.getMonth() + 1);
  return {
    dd,
    MM,
  };
};

export const getFullDate = (date, maxAge) => {
  if (!date) {
    return "";
  }
  const dateFormat = new Date(date);
  const age = maxAge || 0;

  const monthAndDate = getMonthAndDate(dateFormat);
  const fullDate =
    dateFormat.getFullYear() -
    age +
    "-" +
    monthAndDate.MM +
    "-" +
    monthAndDate.dd;

  return fullDate;
};
