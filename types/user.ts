// NOTA DE SEGURANÇA:
// Em uma aplicação real, a senha NUNCA deve ser armazenada em texto plano.
// Ela deve ser "hasheada" usando um algoritmo forte (como bcrypt) em um servidor backend.
// Esta interface é simplificada para um ambiente de demonstração local usando localStorage.

export interface User {
    username: string;
    password: string;
}
