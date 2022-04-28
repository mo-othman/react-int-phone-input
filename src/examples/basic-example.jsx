import React, {useEffect, useState} from 'react';
import PhoneNumberInput from "./index";

const BasicExample = () => {
    const [value, setValue] = useState();

    return (
        <div>
            <PhoneNumberInput value={value} setValue={setValue} />
            <div><pre>{JSON.stringify(value, null, 2) }</pre></div>
        </div>
    )
}

export default BasicExample;