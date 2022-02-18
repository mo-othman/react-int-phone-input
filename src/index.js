import "./intel-phone.css";
import { useState, useRef, useEffect } from "react";
import React from "react";
import {
  parsePhoneNumber,
  isValidPhoneNumber,
  parseIncompletePhoneNumber,
  getCountries,
  getCountryCallingCode,
} from "libphonenumber-js";
import labels from "./en.json";

import examples from "libphonenumber-js/examples.mobile.json";
import { getExampleNumber } from "libphonenumber-js";
import ReactCountryFlag from "react-country-flag";
import MaskedInput from "./MaskedInput";

const countries = getCountries();
const CountriesComponent = ({ onClick, className, filter }) =>
  countries
    .filter((el) => {
      return (
        el.toLowerCase().includes(filter.trim()) ||
        labels[el].toLowerCase().includes(filter.trim()) ||
        getCountryCallingCode(el).toLowerCase().includes(filter.trim())
      );
    })
    .map((country, index) => {
      return (
        <div key={index} onClick={() => onClick(country)} className={className}>
          <ReactCountryFlag
            countryCode={country}
            className="countries_list__country--flag"
            title={country}
          />
          <span className="countries_list__country--label">
            {labels[country]}
          </span>
          <span className="countries_list__country--code">
            +{getCountryCallingCode(country)}
          </span>
        </div>
      );
    });

const PhoneNumberInput = (props) => {
  const [exampleNumber, setExampleNumber] = useState(
    getExampleNumber("US", examples).formatNational({ nationalPrefix: false })
  );

  const [selectedCountry, setSelectedCountry] = useState("US");

  const [mask2, setMask2] = useState("(XXX) XXX-XXXX");
  const [showCountries, setShowCountries] = useState(false);

  const handleChange = (e) => {
    const number = e.target.value;
    let isValid = isValidPhoneNumber(number, selectedCountry);
    let phoneNumber;

    if (!isValid) {
      phoneNumber = {
        countryCode: selectedCountry,
        number: parseIncompletePhoneNumber(
          "+" + getCountryCallingCode(selectedCountry) + number
        ),
        nationalNumber: number,
        isValid: false,
      };
    } else {
      phoneNumber = {
        ...parsePhoneNumber(number, selectedCountry),
        isValid: true,
      };

      delete phoneNumber.metadata;
    }
    props.onChange(phoneNumber);
  };

  const generateMask = (countryCode) => {
    const phoneNumber = getExampleNumber(countryCode, examples);
    setExampleNumber(phoneNumber.formatNational({ nationalPrefix: false }));
    const number = phoneNumber.formatNational({ nationalPrefix: false });
    const masker2 = number.replace(/[0-9]/g, "X");
    setMask2(masker2);
  };

  const onChangeCountry = (countryCode) => {
    generateMask(countryCode);
    setShowCountries(!showCountries);
    setSelectedCountry(countryCode);
  };

  const [countriesFilter, setCountriesFilter] = useState("");
  const onChangeFilterHandler = (event) => {
    setCountriesFilter(event.target.value.trimStart());
  };

  const ref = useRef();

  useOnClickOutside(ref, () => setShowCountries(false));

  return (
    <div className="phone-input-container" ref={ref}>
      <div onClick={() => setShowCountries(!showCountries)}>
        {selectedCountry ? (
          <div className="center-flex">
            <ReactCountryFlag
              countryCode={selectedCountry}
              className="countries_list__country--flag"
              title={selectedCountry}
            />
            <span>+{getCountryCallingCode(selectedCountry)}</span>
          </div>
        ) : (
          "select country"
        )}
      </div>
      {showCountries ? (
        <ul className="countries_list">
          <input
            className="countries_list__filter"
            onChange={onChangeFilterHandler}
            value={countriesFilter}
            placeholder="Filter by country name or code"
          />
          <div className="countries_list__container">
            <CountriesComponent
              onClick={onChangeCountry}
              className="countries_list__country"
              filter={countriesFilter}
            />
          </div>
        </ul>
      ) : null}

      <div
        className="masked-input-container"
        onClick={() => setShowCountries(false)}
      >
        <MaskedInput
          type="tel"
          placeholder={mask2}
          placeholderM={exampleNumber}
          className="masked"
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default PhoneNumberInput;

// Hook
function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}
