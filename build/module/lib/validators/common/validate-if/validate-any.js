export const validateAnyKeyword = {
    keyword: 'validateAny',
    modifying: true,
    schema: true,
    validate(fn, value, _, data) {
        return fn(value, data.parentData, data.rootData, this);
    },
    errors: false,
};
