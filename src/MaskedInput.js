import React, { useEffect, useRef } from "react";
import "./intel-phone.css";
const MaskedInput = (props) => {
  const handleChange = (e) => {
    e.target.value = handleCurrentValue(e);
    props.onChange(e);
    document.getElementById(props.id + "Mask").innerHTML = setValueOfMask(e);
  };

  const handleCurrentValue = (e) => {
    var isCharsetPresent = e.target.getAttribute("data-charset"),
        maskedNumber = "XMDY",
        maskedLetter = "_",
        placeholder =
            isCharsetPresent || e.target.getAttribute("data-placeholder"),
        value = e.target.value,
        l = placeholder? placeholder.length : 0,
        newValue = "",
        i,
        j,
        isInt,
        isLetter,
        strippedValue,
        matchesNumber,
        matchesLetter;

    // strip special characters
    strippedValue = isCharsetPresent
        ? value.replace(/\W/g, "")
        : value.replace(/\D/g, "");

    for (i = 0, j = 0; i < l; i++) {
      isInt = !isNaN(parseInt(strippedValue[j]));
      isLetter = strippedValue[j] ? strippedValue[j].match(/[A-Z]/i) : false;
      matchesNumber = maskedNumber.indexOf(placeholder[i]) >= 0;
      matchesLetter = maskedLetter.indexOf(placeholder[i]) >= 0;
      if (
          (matchesNumber && isInt) ||
          (isCharsetPresent && matchesLetter && isLetter)
      ) {
        newValue += strippedValue[j++];
      } else if (
          (!isCharsetPresent && !isInt && matchesNumber) ||
          (isCharsetPresent &&
              ((matchesLetter && !isLetter) || (matchesNumber && !isInt)))
      ) {
        return newValue;
      } else {
        if (strippedValue === "") {
          newValue = "";
          return null;
        }
        newValue += placeholder[i];
      }

      // break if no characters left and the pattern is non-special character
      if (strippedValue[j] === undefined) {
        break;
      }
    }

    return newValue;
  };

  const setValueOfMask = (e) => {
    var value = e.target.value,
        placeholder = e.target.getAttribute("data-placeholder");

    if (value === "") {
      return props.placeholderM;
    }
    return "<i>" + value + "</i>" + `<div class='placeholder-mask'>${placeholder.substr(value? value.length : 0)}</div>`
  };

  const value = props.value || "";

  const inputEl = useRef(null);
  const mounted = useRef();

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      handleChange({ target: inputEl.current });
    }
  }, [props.placeholder]);

  return (
      <span className="shell">
      <span aria-hidden="true" id={props.id + "Mask"}>
        <i>{value}</i>
        {props.placeholderM}
      </span>
      <input
          ref={inputEl}
          id={props.id}
          onChange={handleChange}
          name={props.id}
          type={props.type}
          className={props.className}
          data-placeholder={props.placeholder}
          aria-required={props.required}
          data-charset={props.dataCharset}
          required={props.required}
          title={props.title}
      />
    </span>
  );
};

export default MaskedInput;
