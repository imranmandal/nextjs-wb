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
  if (!valueInString) {
    return;
  }
  const convertedVal = valueInString.allReplace({
    DASH: "-",
    _dot_: ".",
    slash: "/",
    _TO: " -",
    _or: " /",
    ONE_: "1 ",
    TWO: "2",
    SEVENTY_FIVE: "75",
    THIRTY_FIVE: "35",
    FIVE: "5",
    TEN: "10",
    TWENTY: "20",
    THIRTY: "30",
    FIFTY: "50",
  });

  return replaceUnderScore(convertedVal);
};
