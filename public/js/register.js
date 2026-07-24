window.addEventListener('load', () => 
{
    const form = document.getElementById('registerForm');

    form.addEventListener('submit', (event) => 
    {
        // array de errores
        let errores = [];

        const email = document
            .getElementById('email')
            .value 
            .trim();

        const password = document
            .getElementById('password')
            .value
            .trim();

        const passwordRepeat = document
            .getElementById('password-repeat')
            .value
            .trim();

        if (email === '') 
        {
            errores.push('- El email es obligatorio');
        }

        //validacion simbolos
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email !== '' && !emailRegex.test(email)) 
        {
            errores.push('- Debes ingresar un email válido');
        }

        if (password === '') 
        {
            errores.push('- La contraseña es obligatoria');
        }

        if (password.length < 8) 
        {
            errores.push('- La contraseña debe tener al menos 8 caracteres');
        }

        // una letra

        if (!/[A-Za-z]/.test(password))
        {
            errores.push('- La contraseña debe contener al menos una letra');
        }

        // un número

        if (!/[0-9]/.test(password))
        {
            errores.push('- La contraseña debe contener al menos un número');
        }

        // carácter especial

        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
        {
            errores.push('- La contraseña debe contener un carácter especial');
        }

        // password igual email

        if (password === email)
        {
            errores.push('- La contraseña no puede ser igual al email');
        }

        // cadenas prohibidas

        const prohibidas = [
            'password',
            '1234',
            'qwerty',
            'ecommerce'
        ];

        prohibidas.forEach(palabra => {
            if (password.toLowerCase().includes(palabra)) 
            {
                errores.push(`- La contraseña no puede contener "${palabra}"`);
            }
        });

        if (password !== passwordRepeat)
        {
            errores.push('- Las contraseñas no coinciden');
        }

        // SI HAY ERRORES
        if (errores.length > 0)
        {
            // CANCELA ENVÍO
            event.preventDefault();

            alert(errores.join('\n'));
        }
    });
});