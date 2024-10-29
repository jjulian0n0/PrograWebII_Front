export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    return emailRegex.test(email);
  };
  
export const validatePassword = (password) => {
    const May = /[A-Z]/.test(password);
    const Min = /[a-z]/.test(password);
    const Num  = /\d/.test(password);
    const Especial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const Long = password.length >= 8;
  
    return (
        May &&
        Min &&
        Num &&
        Especial &&
        Long
    );
  };

  //Validar más cosas
  