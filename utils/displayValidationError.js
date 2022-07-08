let validationErrors = {}
const displayValidationError = (err)=>{
    err.forEach((item) => {
        validationErrors[item.context.key] = item.message
    });
    return {
        errors:{...validationErrors},
        success:false
    }
}

export default displayValidationError

