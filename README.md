# React-Int-Phone-Input
A lightweight React international phone number input with taking UX in consideration
![Alt text](./sample.png?raw=true "Screenshot of an example")


## Installation
```shell-script
npm install react-int-phone-input --save
```


## Usage
```jsx
import React, { useState } from 'react';
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
