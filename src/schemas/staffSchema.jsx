import * as yup from 'yup';

const staffSchema = yup.object().shape({
    name: yup.string().required(),
    username: yup.string().required(),
    phone: yup.string().required(),
    email: yup.string().email().required(),
    age: yup.number().required(),
    password: yup.string().required(),
    
})

export default staffSchema;