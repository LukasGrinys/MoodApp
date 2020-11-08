const validator = (values, schema) => {
    let errors = [];
    let validationErrors = [];

    if (!values || typeof values !== 'object') {
        return { error : 'Values provided was not an object' }
    }

    let validatedValues = {}

    Object.keys(values).forEach( valueName => {
        if (!schema[valueName] || typeof schema[valueName] !== 'object') {
            errors.push(`Value '${valueName}' was not provided in schema`)
        } else {
            let validatedValue = values[valueName];

            Object.keys(schema[valueName]).forEach( parameter => {

                switch (parameter) {
                    case 'type':
                        const type = schema[valueName][parameter];
                        if (values[valueName] && typeof values[valueName] !== schema[valueName][parameter]) {
                            validationErrors.push(`Value '${valueName}' was received with incorrect type. Type of ${type} is needed`)
                        }
                        break;
                    case 'required':
                        if (!values[valueName] && typeof values[valueName] !== 'boolean') {
                            validationErrors.push(`Value '${valueName}' is required`)
                        }
                        break;
                    case 'trim' :
                        if (typeof values[valueName] === 'string') {
                            validatedValue.trim();
                        }
                        break;
                    case 'maxlength' :
                        const { maxlength } = schema[valueName];

                        if (typeof values[valueName] === 'string' && values[valueName].length > maxlength) {
                            validationErrors.push(`Value '${valueName}' must contain no more than ${maxlength} letters`)
                        }
                        break;
                    case 'minlength' :
                        const { minlength } = schema[valueName]

                        if (typeof values[valueName] === 'string' && values[valueName].length < minlength) {
                            validationErrors.push(`Value '${valueName}' must contain no less than ${minlength} letters`)
                        }
                        break;
                    case 'default' : 
                        const { default : defaultValue } = schema[valueName]

                        if (values[valueName] === undefined) {
                            validatedValue = defaultValue;
                        };
                        break;
                    default :
                        break;
                }
            });

            validatedValues[valueName] = validatedValue
        }
    });

    if (errors.length > 0) {
        return { error : errors.join(". ")}
    }

    if (validationErrors.length > 0) {
        return { error : validationErrors.join(". ")}
    }

    return {
        data : validatedValues
    }
}

module.exports = { validator };