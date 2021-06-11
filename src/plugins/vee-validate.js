import { extend } from 'vee-validate'
import { required, email, regex, integer, min_value } from 'vee-validate/dist/rules'
import { messages as messagePt } from 'vee-validate/dist/locale/pt_BR.json'

extend('required', {
    ...required,
    message: messagePt.required
})

extend('email', {
    ...email,
    message: messagePt.email
})

extend('regex', {
    ...regex,
    message: messagePt.regex
})

extend('integer', {
    ...integer,
    message: messagePt.integer
})

extend('min_value', {
    ...min_value,
    message: messagePt.min_value
})
