# React-Int-Phone-Input

A lightweight React international phone number input with taking UX in consideration
![Alt text](./sample.png?raw=true "Screenshot of an example")

## Live Demo

<a href="https://codesandbox.io/s/react-int-phone-input-uftxrg" target="_blank">Demo</a>

## Installation

```shell-script
npm install react-int-phone-input --save
```

## Usage

```jsx
import React, {useState} from 'react';
import PhoneNumberInput from 'react-int-phone-input';

const App = () => {
    const [value, setValue] = useState();

    return (
        <PhoneInput
            value={value}
            onChange={setValue}
        />
    )
}
```

### - Default country

You can set the default selected country by using <strong>defaultCountry
</strong>
```jsx
import React, {useState} from 'react';
import PhoneNumberInput from 'react-int-phone-input';

const App = () => {
    const [value, setValue] = useState();

    return (
        <PhoneInput
            value={value}
            onChange={setValue}
            defaultCountry={'GB'}
        />
    )
}
```

## Props

| Name            | Type    | Description                          | Default | Example |
|-----------------|---------|--------------------------------------|---------|---------|
| showCountryCode | Boolean | To render the country code in the UI | true    | false   |
| defaultCountry  | string  | initial country                      | 'US'    | 'US'    |



