const mockLogin = {
  validInformation: { email: 'user@user.com', password: 'secret_user' },
  invalidEmail: { email: 'vasco@dagama.com', password: 'secret_user' },
  invalidPassword: { email: 'user@user.com', password: 'gigante_da_colina' },
  missingEmail: { password: 'secret_user' },
  missingPassword: { email: 'user@user.com' }
}

export default mockLogin;