type LoginData = {
    email: string
    password: string
  }
  
  type LoginResponse = {
    role: "administrator" | "user"
    // Añade aquí otros campos que devuelva tu API
  }
  
  export async function login(data: LoginData): Promise<LoginResponse> {
    const response = await fetch("http://54.210.221.206:3004/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
  
    if (!response.ok) {
      throw new Error("Login failed")
    }
  
    return response.json()
  }
  
  