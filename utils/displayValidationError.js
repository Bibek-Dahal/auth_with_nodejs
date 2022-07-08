
const displayValidationError = (err)=>{
    let validationErrors = {}
    err.forEach((item) => {
        validationErrors[item.context.key] = item.message
    });
    return {
        errors:{...validationErrors},
        success:false
    }
}

export default displayValidationError

